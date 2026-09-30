import express from "express";
import path from "node:path";
import produtos from "../data/produtos.js";

const router = express.Router();

const camposTexto = ["nome", "categoria", "modelo", "descricao"];

function validarProduto(dados, parcial = false) {
    for (const campo of camposTexto) {
        if (parcial && dados[campo] === undefined) continue;
        if (typeof dados[campo] !== "string" || !dados[campo].trim()) {
            return `O campo ${campo} é obrigatório.`;
        }
    }

    if (!parcial || dados.preco !== undefined) {
        if (dados.preco === "" || !Number.isFinite(Number(dados.preco)) || Number(dados.preco) < 0) {
            return "O preço deve ser um número maior ou igual a zero.";
        }
    }

    if (!parcial || dados.estoque !== undefined) {
        if (!Number.isInteger(Number(dados.estoque)) || Number(dados.estoque) < 0) {
            return "O estoque deve ser um número inteiro maior ou igual a zero.";
        }
    }

    if ((!parcial || dados.imagemUrl !== undefined) &&
            (typeof dados.imagemUrl !== "string" || !dados.imagemUrl.trim())) {
        return "O campo imagemUrl é obrigatório.";
    }

    return null;
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

router.post("/", (req, res) => {
    const erro = validarProduto(req.body);
    if (erro) return res.status(400).json({ erro });

    const id = req.body.id === undefined ? proximoId() : Number(req.body.id);
    if (!Number.isInteger(id) || id < 1) {
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
    };

    produtos.push(novoProduto);
    res.status(201).json({
        mensagem: "Produto adicionado com sucesso.",
        produto: produtoComImagemPublica(novoProduto),
    });
});

router.put("/:id", (req, res) => {
    const produto = encontrarProduto(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    const erro = validarProduto(req.body, true);
    if (erro) return res.status(400).json({ erro });

    for (const campo of camposTexto) {
        if (req.body[campo] !== undefined) produto[campo] = req.body[campo].trim();
    }
    if (req.body.preco !== undefined) produto.preco = Number(req.body.preco);
    if (req.body.estoque !== undefined) produto.estoque = Number(req.body.estoque);
    if (req.body.imagemUrl !== undefined) produto.imagemUrl = req.body.imagemUrl.trim();

    res.json({
        mensagem: "Produto atualizado com sucesso.",
        produto: produtoComImagemPublica(produto),
    });
});

router.delete("/:id", (req, res) => {
    const produto = encontrarProduto(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });

    produtos.splice(produtos.indexOf(produto), 1);
    res.json({ mensagem: `Produto ${produto.id} removido com sucesso.` });
});

export default router;