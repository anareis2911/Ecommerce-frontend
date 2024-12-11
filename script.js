document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const productsContainer = document.getElementById("productsContainer");
    const productCount = document.getElementById("productCount");
    const filterSelect = document.getElementById("filterSelect");

    const apiUrl = "http://localhost:8080/produto"; // Endpoint da API
    let products = [];

    // Função para buscar os produtos
    async function fetchProducts(order = "nome", filter = "") {
        try {
            const url = new URL(apiUrl);
            // Adicionando parâmetros de filtro e ordenação na URL
            if (order) url.searchParams.append("order", order);
            if (filter) url.searchParams.append("filter", filter);

            const response = await fetch(url);
            const data = await response.json();
            products = data;  // Resposta direta, já que o JSON é um array de produtos
            updateProducts(products);
            updateProductCount(products);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    // Função para atualizar a exibição dos produtos
    function updateProducts(products) {
        if (!productsContainer) {
            console.error('Elemento "productsContainer" não encontrado!');
            return;
        }

        productsContainer.innerHTML = ""; // Limpa o conteúdo anterior

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            // Adicionando imagem do produto
            const imgElement = document.createElement("img");
            imgElement.src = product.imageUrl;
            imgElement.alt = product.nome;

            // Nome do produto
            const nameElement = document.createElement("h3");
            nameElement.innerText = product.nome;

            // Descrição do produto
            const descElement = document.createElement("p");
            descElement.innerText = product.descricao;

            // Preço do produto
            const priceElement = document.createElement("p");
            priceElement.innerText = `R$ ${product.preco.toFixed(2)}`;

            // Adicionando todos os elementos no produto
            productElement.appendChild(imgElement);
            productElement.appendChild(nameElement);
            productElement.appendChild(descElement);
            productElement.appendChild(priceElement);

            // Adicionando o produto no container
            productsContainer.appendChild(productElement);
        });
    }

    // Função para atualizar o contador de produtos
    function updateProductCount(products) {
        if (productCount) {
            productCount.innerText = `Total de Produtos: ${products.length}`;
        }
    }

    // Função que reage à seleção do filtro de ordenação
    function handleFilterChange() {
        const selectedOrder = filterSelect.value;
        const filterText = searchInput.value; // O texto de pesquisa também será usado como filtro
        fetchProducts(selectedOrder, filterText);
    }

    // Função de filtro que reage ao input no campo de busca
    function handleSearchInput() {
        const filterText = searchInput.value;
        const selectedOrder = filterSelect.value; // O filtro de ordenação também será aplicado
        fetchProducts(selectedOrder, filterText);
    }

    // Adiciona eventos para buscar os produtos ao carregar a página, e filtrar e ordenar conforme necessário
    searchInput.addEventListener("input", handleSearchInput);
    filterSelect.addEventListener("change", handleFilterChange);

    // Inicializa a página com os produtos
    fetchProducts("nome", ""); // Inicializa com a ordenação por nome
});
