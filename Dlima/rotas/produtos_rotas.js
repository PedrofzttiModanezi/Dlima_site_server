import express from "express";
import path from "node:path";
import { timingSafeEqual } from "node:crypto";
import { renameSync, unlinkSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import produtos from "../data/produtos.js";

const router = express.Router();
const arquivoProdutos = fileURLToPath(new URL("../data/produtos.js", import.meta.url));
const arquivoTemporario = `${arquivoProdutos}.${process.pid}.tmp`;

const camposTexto = ["nome", "categoria", "modelo", "descricao"];

export function obterTotalProdutos() {
    return produtos.length;
}

function validarTokenAdmin(req, res, next) {
    if (req.adminAuthenticated) return next();

    const tokenConfigurado = process.env.ADMIN_API_TOKEN;
    if (!tokenConfigurado) {
        return res.status(503).json({ erro: "A API administrativa não está configurada." });
    }

    const correspondencia = /^Bearer ([^\s]+)$/i.exec(req.get("authorization") || "");
    if (!correspondencia) {
        return res.status(401).json({ erro: "É necessário informar um token administrativo." });
    }

    const tokenRecebido = Buffer.from(correspondencia[1]);
    const tokenEsperado = Buffer.from(tokenConfigurado);
    if (tokenRecebido.length !== tokenEsperado.length || !timingSafeEqual(tokenRecebido, tokenEsperado)) {
        return res.status(403).json({ erro: "Token administrativo inválido." });
    }

    next();
}

function numeroValido(valor) {
    return (typeof valor === "number" && Number.isFinite(valor)) ||
        (typeof valor === "string" && valor.trim() !== "" && Number.isFinite(Number(valor)));
}

export function validarProduto(dados, parcial = false) {
    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
        return "O corpo da requisição deve ser um objeto.";
    }

    for (const campo of camposTexto) {
        if (parcial && dados[campo] === undefined) continue;
        if (typeof dados[campo] !== "string" || !dados[campo].trim()) {
            return `O campo ${campo} é obrigatório.`;
        }
    }

    if (!parcial || dados.preco !== undefined) {
        if (!numeroValido(dados.preco) || Number(dados.preco) < 0) {
            return "O preço deve ser um número maior ou igual a zero.";
        }
    }

    if (!parcial || dados.estoque !== undefined) {
        if (!numeroValido(dados.estoque) || !Number.isInteger(Number(dados.estoque)) || Number(dados.estoque) < 0) {
            return "O estoque deve ser um número inteiro maior ou igual a zero.";
        }
    }

    if ((!parcial || dados.imagemUrl !== undefined) &&
            (typeof dados.imagemUrl !== "string" || !dados.imagemUrl.trim())) {
        return "O campo imagemUrl é obrigatório.";
    }

    if (dados.tamanhos !== undefined) {
        const tamanhos = Array.isArray(dados.tamanhos)
            ? dados.tamanhos
            : typeof dados.tamanhos === "string" ? dados.tamanhos.split(",") : null;
        if (!tamanhos || tamanhos.length > 20 || tamanhos.some((tamanho) => typeof tamanho !== "string" || !tamanho.trim())) {
            return "Os tamanhos devem ser informados como uma lista de textos.";
        }
    }

    return null;
}

function normalizarTamanhos(tamanhos) {
    const lista = Array.isArray(tamanhos)
        ? tamanhos
        : typeof tamanhos === "string" ? tamanhos.split(",") : [];
    return [...new Set(lista.map((tamanho) => tamanho.trim()).filter(Boolean))];
}

function produtoComImagemPublica(produto) {
    return {
        ...produto,
        imagemUrl: `/images/${path.basename(produto.imagemUrl)}`,
    };
}

function encontrarProduto(id) {
    const idNumerico = Number(id);
    if (!Number.isInteger(idNumerico)) return null;
    return produtos.find((produto) => produto.id === idNumerico) || null;
}

function proximoId() {
    return produtos.reduce((maiorId, produto) => Math.max(maiorId, Number(produto.id) || 0), 0) + 1;
}

function persistirProdutos() {
    const conteudo = `const produtos = ${JSON.stringify(produtos, null, 4)};\n\nexport default produtos;\n`;
    try {
        writeFileSync(arquivoTemporario, conteudo, "utf8");
        renameSync(arquivoTemporario, arquivoProdutos);
        return true;
    } catch (erro) {
        try {
            unlinkSync(arquivoTemporario);
        } catch {}
        console.error("Não foi possível salvar Dlima/data/produtos.js:", erro);
        return false;
    }
}

router.get("/", (req, res) => {
    res.json({
        mensagem: "Lista de produtos carregada com sucesso.",
        total: produtos.length,
        produtos: produtos.map(produtoComImagemPublica),
    });
});

router.get("/:id", (req, res) => {
    const produto = encontrarProduto(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    res.json({
        mensagem: "Produto encontrado com sucesso.",
        produto: produtoComImagemPublica(produto),
    });
});

router.post("/", validarTokenAdmin, (req, res) => {
    const erro = validarProduto(req.body);
    if (erro) return res.status(400).json({ erro });

    const idInformado = req.body.id;
    const id = idInformado === undefined ? proximoId() : Number(idInformado);
    if ((idInformado !== undefined && !numeroValido(idInformado)) || !Number.isInteger(id) || id < 1) {
        return res.status(400).json({ erro: "O ID deve ser um inteiro positivo." });
    }
    if (encontrarProduto(id)) {
        return res.status(409).json({ erro: "Já existe um produto com esse ID." });
    }

    const novoProduto = {
        id,
        nome: req.body.nome.trim(),
        categoria: req.body.categoria.trim(),
        modelo: req.body.modelo.trim(),
        descricao: req.body.descricao.trim(),
        preco: Number(req.body.preco),
        estoque: Number(req.body.estoque),
        imagemUrl: req.body.imagemUrl.trim(),
        tamanhos: normalizarTamanhos(req.body.tamanhos),
    };

    produtos.push(novoProduto);
    if (!persistirProdutos()) {
        produtos.pop();
        return res.status(500).json({ erro: "Não foi possível salvar o produto no arquivo de dados." });
    }

    res.status(201).json({
        mensagem: "Produto adicionado com sucesso.",
        produto: produtoComImagemPublica(novoProduto),
    });
});

router.put("/:id", validarTokenAdmin, (req, res) => {
    const produto = encontrarProduto(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    const erro = validarProduto(req.body, true);
    if (erro) return res.status(400).json({ erro });

    const produtoOriginal = { ...produto };
    for (const campo of camposTexto) {
        if (req.body[campo] !== undefined) produto[campo] = req.body[campo].trim();
    }
    if (req.body.preco !== undefined) produto.preco = Number(req.body.preco);
    if (req.body.estoque !== undefined) produto.estoque = Number(req.body.estoque);
    if (req.body.imagemUrl !== undefined) produto.imagemUrl = req.body.imagemUrl.trim();
    if (req.body.tamanhos !== undefined) produto.tamanhos = normalizarTamanhos(req.body.tamanhos);
    if (!persistirProdutos()) {
        Object.assign(produto, produtoOriginal);
        return res.status(500).json({ erro: "Não foi possível salvar as alterações no arquivo de dados." });
    }

    res.json({
        mensagem: "Produto atualizado com sucesso.",
        produto: produtoComImagemPublica(produto),
    });
});

router.delete("/:id", validarTokenAdmin, (req, res) => {
    const produto = encontrarProduto(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    const indice = produtos.indexOf(produto);
    produtos.splice(indice, 1);
    if (!persistirProdutos()) {
        produtos.splice(indice, 0, produto);
        return res.status(500).json({ erro: "Não foi possível remover o produto do arquivo de dados." });
    }

    res.json({ mensagem: `Produto ${produto.id} removido com sucesso.` });
});

export default router;