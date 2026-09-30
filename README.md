# D'lima Store

Site estático. Abra `Dlima/public/index.html` no navegador ou publique a pasta `Dlima` em uma hospedagem estática.

O catálogo em `Dlima/public/produtos.html` consulta `GET /api/produtos` no mesmo domínio. Configure outra rota no meta `products-api-url` da página, se necessário.

A API também oferece `GET /api/produtos/:id`, `POST /api/produtos`, `PUT /api/produtos/:id` e `DELETE /api/produtos/:id`. O `POST` aceita um ID opcional e gera o próximo quando omitido. Os campos do produto são `nome`, `categoria`, `modelo`, `descricao`, `preco`, `estoque` e `imagemUrl`.

As alterações de POST, PUT e DELETE ficam apenas na memória e são perdidas quando o servidor reinicia. Para persistência, conecte a rota a um banco de dados ou arquivo.

A API deve retornar uma lista JSON ou um objeto com `products`, `produtos` ou `data`. Cada produto precisa ter `id`, `name` e `priceCents` (inteiro em centavos); também aceita `nome`, `precoCentavos` ou `price`/`preco` em reais. Campos opcionais: `description`, `model`, `category` e `imageUrl` (ou os equivalentes `descricao`, `modelo`, `categoria` e `imagemUrl`). O botão de cada produto integra com `window.DlimaCart.addItem`.
# Dlima_site_server
