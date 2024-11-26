document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const productCount = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");
    const apiUrl = "http://localhost:8080/produto"; // Ajuste conforme o seu servidor
    let products = [];

    // Função para carregar os produtos da API
    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            products = data;  // Salva os produtos em uma variável global
            displayProducts(products);  // Exibe todos os produtos inicialmente
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }

    // Função para exibir os produtos
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = ''; // Limpa os produtos anteriores

        productsToDisplay.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            const imgElement = document.createElement("img");
            imgElement.src = product.imageUrl;
            imgElement.alt = product.name;

            const nameElement = document.createElement("h3");
            nameElement.innerText = product.name;

            const priceElement = document.createElement("p");
            priceElement.innerText = `R$ ${product.price.toFixed(2)}`;

            productElement.appendChild(imgElement);
            productElement.appendChild(nameElement);
            productElement.appendChild(priceElement);

            productsContainer.appendChild(productElement);
        });

        // Atualiza o contador de produtos
        productCount.innerText = `Total de Produtos: ${productsToDisplay.length}`;
    }

    // Função para filtrar os produtos conforme a pesquisa
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);  // Exibe os produtos filtrados
    });

    // Chama a função para carregar os produtos
    fetchProducts();
});
