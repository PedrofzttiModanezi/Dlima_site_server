# D'lima Store

## Executar

Instale as dependências com `npm install` e inicie o servidor com `npm start`. O site fica disponível em `http://localhost:3000`; defina `PORT` para usar outra porta.

As rotas de leitura do catálogo são públicas. Para habilitar alterações, configure `ADMIN_API_TOKEN` no ambiente do servidor antes de iniciá-lo. No PowerShell:

```powershell
$env:ADMIN_API_TOKEN = (node -p "require('node:crypto').randomBytes(32).toString('hex')")
npm start
```

Envie o token nas requisições administrativas pelo cabeçalho `Authorization: Bearer <token>`. Nunca coloque esse token no JavaScript público do site. Sem a configuração, as rotas de alteração respondem `503`; sem um token válido, respondem `401` ou `403`.

## Dashboard `/adm`

Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` no ambiente para habilitar o login do dashboard. O segredo precisa ter pelo menos 32 bytes. No PowerShell:

O comando `npm start` carrega automaticamente essas variáveis do arquivo local `.env`, quando ele existir. Mantenha esse arquivo fora do controle de versão.

```powershell
$env:ADMIN_EMAIL = "admin@seudominio.com"
$env:ADMIN_PASSWORD = "use-uma-senha-forte"
$env:ADMIN_SESSION_SECRET = (node -p "require('node:crypto').randomBytes(32).toString('hex')")
npm start
```

A sessão usa cookie `HttpOnly`, expira em oito horas e o servidor valida o e-mail e a senha; os acessos contam visualizações bem-sucedidas de páginas HTML públicas e ficam em `Dlima/data/acessos.json`.

## API

- `GET /api/produtos` lista os produtos.
- `GET /api/produtos/:id` consulta um produto.
- `POST /api/produtos` adiciona um produto; o `id` é opcional e gerado automaticamente.
- `PUT /api/produtos/:id` atualiza os campos enviados.
- `DELETE /api/produtos/:id` remove um produto.

Os campos são `nome`, `categoria`, `modelo`, `descricao`, `preco`, `estoque`, `imagemUrl` e `tamanhos`. No admin, informe os tamanhos separados por vírgulas (por exemplo, `P, M, G, GG`). Os cards da loja abrem um modal com detalhes e tamanhos cadastrados; quando o produto não tem tamanhos informados, o modal exibe esse aviso. O catálogo consulta `GET /api/produtos` no mesmo domínio. Para usar outro endereço, configure o meta `products-api-url` em `Dlima/public/produtos.html`.

Ao usar outra API de produtos, a página aceita uma lista JSON ou um objeto com `products`, `produtos` ou `data`. Cada produto precisa de `id`, `name` e `priceCents` (inteiro em centavos); também aceita `nome`, `precoCentavos` ou `price`/`preco` em reais. Os campos opcionais são `description`, `model`, `category` e `imageUrl`, ou seus equivalentes em português. O botão de cada produto integra com `window.DlimaCart.addItem`.

As operações de criar, editar e excluir persistem diretamente em `Dlima/data/produtos.js`, portanto o processo precisa ter permissão de escrita nessa pasta. Em hospedagens com sistema de arquivos somente leitura ou efêmero, use um banco de dados persistente.

Execute `npm test` para rodar os testes automatizados.
