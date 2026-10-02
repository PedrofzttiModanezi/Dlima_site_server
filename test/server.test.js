import assert from "node:assert/strict";
import { once } from "node:events";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { after, before, test } from "node:test";
import { app } from "../server.js";
import { validarProduto } from "../Dlima/rotas/produtos_rotas.js";

const produtoValido = {
    nome: "Camiseta de teste",
    categoria: "camisetas",
    modelo: "regular",
    descricao: "Produto para validação",
    preco: 180,
    estoque: 2,
    tamanhos: ["P", "M", "G"],
    imagemUrl: "camiseta_1.jpg",
};

let servidor;
let urlBase;
const variaveisAdmin = ["ADMIN_API_TOKEN", "ADMIN_EMAIL", "ADMIN_PASSWORD", "ADMIN_SESSION_SECRET"];
const ambienteOriginal = new Map();
const arquivoAcessos = fileURLToPath(new URL("../Dlima/data/acessos.json", import.meta.url));
const arquivoProdutos = fileURLToPath(new URL("../Dlima/data/produtos.js", import.meta.url));
let arquivoAcessosExistia;
let conteudoAcessosOriginal;
let conteudoProdutosOriginal;
let numeroImportacaoProdutos = 0;

async function lerProdutosPersistidos() {
    const url = new URL("../Dlima/data/produtos.js", import.meta.url);
    url.searchParams.set("teste", String(numeroImportacaoProdutos++));
    return (await import(url.href)).default;
}

before(async () => {
    arquivoAcessosExistia = existsSync(arquivoAcessos);
    if (arquivoAcessosExistia) conteudoAcessosOriginal = readFileSync(arquivoAcessos);
    conteudoProdutosOriginal = readFileSync(arquivoProdutos);
    for (const variavel of variaveisAdmin) {
        ambienteOriginal.set(variavel, process.env[variavel]);
        delete process.env[variavel];
    }
    servidor = app.listen(0);
    await once(servidor, "listening");
    urlBase = `http://127.0.0.1:${servidor.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        servidor.close((erro) => erro ? reject(erro) : resolve());
    });
    for (const [variavel, valor] of ambienteOriginal) {
        if (valor === undefined) delete process.env[variavel];
        else process.env[variavel] = valor;
    }
    if (arquivoAcessosExistia) writeFileSync(arquivoAcessos, conteudoAcessosOriginal);
    else if (existsSync(arquivoAcessos)) rmSync(arquivoAcessos);
    writeFileSync(arquivoProdutos, conteudoProdutosOriginal);
});

test("valida campos e rejeita valores numéricos vazios ou nulos", () => {
    assert.equal(validarProduto(produtoValido), null);
    assert.equal(validarProduto({ ...produtoValido, preco: "  " }), "O preço deve ser um número maior ou igual a zero.");
    assert.equal(validarProduto({ ...produtoValido, preco: null }), "O preço deve ser um número maior ou igual a zero.");
    assert.equal(validarProduto({ ...produtoValido, estoque: "" }), "O estoque deve ser um número inteiro maior ou igual a zero.");
    assert.equal(validarProduto({ ...produtoValido, estoque: null }), "O estoque deve ser um número inteiro maior ou igual a zero.");
    assert.equal(validarProduto(null), "O corpo da requisição deve ser um objeto.");
    assert.equal(validarProduto({ estoque: " " }, true), "O estoque deve ser um número inteiro maior ou igual a zero.");
});

test("bloqueia alterações sem configuração ou token administrativo válido", async () => {
    const semConfiguracao = await fetch(`${urlBase}/api/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoValido),
    });
    assert.equal(semConfiguracao.status, 503);

    process.env.ADMIN_API_TOKEN = "token-de-teste";
    const catalogoAntes = await fetch(`${urlBase}/api/produtos`).then((resposta) => resposta.json());

    for (const [metodo, rota] of [
        ["POST", "/api/produtos"],
        ["PUT", "/api/produtos/1"],
        ["DELETE", "/api/produtos/1"],
    ]) {
        const resposta = await fetch(`${urlBase}${rota}`, { method: metodo });
        assert.equal(resposta.status, 401, `${metodo} ${rota} deve exigir autenticação`);
    }

    const tokenInvalido = await fetch(`${urlBase}/api/produtos`, {
        method: "POST",
        headers: { Authorization: "Bearer token-incorreto" },
    });
    assert.equal(tokenInvalido.status, 403);

    const cabecalhosAdmin = {
        Authorization: "Bearer token-de-teste",
        "Content-Type": "application/json",
    };
    const criado = await fetch(`${urlBase}/api/produtos`, {
        method: "POST",
        headers: cabecalhosAdmin,
        body: JSON.stringify(produtoValido),
    });
    assert.equal(criado.status, 201);
    const produtoCriado = await criado.json();
    assert.equal((await lerProdutosPersistidos()).find((produto) => produto.id === produtoCriado.produto.id)?.nome, produtoValido.nome);
    assert.deepEqual((await lerProdutosPersistidos()).find((produto) => produto.id === produtoCriado.produto.id)?.tamanhos, produtoValido.tamanhos);

    const atualizado = await fetch(`${urlBase}/api/produtos/${produtoCriado.produto.id}`, {
        method: "PUT",
        headers: cabecalhosAdmin,
        body: JSON.stringify({ estoque: 3 }),
    });
    assert.equal(atualizado.status, 200);
    assert.equal((await lerProdutosPersistidos()).find((produto) => produto.id === produtoCriado.produto.id)?.estoque, 3);

    const removido = await fetch(`${urlBase}/api/produtos/${produtoCriado.produto.id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer token-de-teste" },
    });
    assert.equal(removido.status, 200);
    assert.equal((await lerProdutosPersistidos()).some((produto) => produto.id === produtoCriado.produto.id), false);

    const catalogoDepois = await fetch(`${urlBase}/api/produtos`).then((resposta) => resposta.json());
    assert.equal(catalogoDepois.total, catalogoAntes.total);
});

test("protege métricas e CRUD com login de administrador por e-mail", async () => {
    const semSessao = await fetch(`${urlBase}/api/admin/metrics`);
    assert.equal(semSessao.status, 401);

    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "senha-forte-de-teste";
    process.env.ADMIN_SESSION_SECRET = "s".repeat(48);

    const loginInvalido = await fetch(`${urlBase}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@example.com", password: "incorreta" }),
    });
    assert.equal(loginInvalido.status, 401);

    const login = await fetch(`${urlBase}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "ADMIN@example.com", password: "senha-forte-de-teste" }),
    });
    assert.equal(login.status, 200);
    const cookie = login.headers.get("set-cookie").split(";")[0];
    const adminHeaders = { Cookie: cookie, "Content-Type": "application/json" };

    const metrics = await fetch(`${urlBase}/api/admin/metrics`, { headers: { Cookie: cookie } });
    assert.equal(metrics.status, 200);
    const metricasIniciais = await metrics.json();
    const catalogoInicial = await fetch(`${urlBase}/api/produtos`).then((resposta) => resposta.json());
    assert.equal(metricasIniciais.produtos, catalogoInicial.total);
    assert.ok(Number.isSafeInteger(metricasIniciais.acessos));

    const visita = await fetch(`${urlBase}/`, { headers: { Accept: "text/html" } });
    assert.equal(visita.status, 200);
    await visita.text();
    const metricasAposVisita = await fetch(`${urlBase}/api/admin/metrics`, { headers: { Cookie: cookie } }).then((resposta) => resposta.json());
    assert.equal(metricasAposVisita.acessos, metricasIniciais.acessos + 1);
    assert.equal(JSON.parse(readFileSync(arquivoAcessos, "utf8")).total, metricasAposVisita.acessos);

    const criado = await fetch(`${urlBase}/api/produtos`, {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify(produtoValido),
    });
    assert.equal(criado.status, 201);
    const produtoCriado = await criado.json();

    const atualizado = await fetch(`${urlBase}/api/produtos/${produtoCriado.produto.id}`, {
        method: "PUT",
        headers: adminHeaders,
        body: JSON.stringify({ estoque: 3 }),
    });
    assert.equal(atualizado.status, 200);

    const removido = await fetch(`${urlBase}/api/produtos/${produtoCriado.produto.id}`, {
        method: "DELETE",
        headers: { Cookie: cookie },
    });
    assert.equal(removido.status, 200);

    const logout = await fetch(`${urlBase}/api/admin/logout`, { method: "POST", headers: { Cookie: cookie } });
    assert.match(logout.headers.get("set-cookie"), /Max-Age=0/);
    const aposLogout = await fetch(`${urlBase}/api/admin/metrics`);
    assert.equal(aposLogout.status, 401);
});