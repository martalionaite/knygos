document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {
            name: 'Mokslinė fantastika',
            books: [
                { title: 'Dune', ISBN: '978-0-441-17271-9', year: 2024, pages: 412, quantity: 5, price: 25.99 },
                { title: 'Ender\'s Game', ISBN: '978-0-812-55029-2', year: 1985, pages: 324, quantity: 7, price: 19.99 }
            ]
        },
        {
            name: 'Detektyvai',
            books: [
                { title: 'Sherlock Holmes', ISBN: '978-0-141-03435-2', year: 1892, pages: 307, quantity: 3, price: 15.99 },
                { title: 'Gone Girl', ISBN: '987-0-307-58836-4', year: 2014, pages: 432, quantity: 6, price: 14.99 }
            ]
        }
    ];

    const categoriesContainer = document.getElementById("categoriesContainer");
    const categorySelect = document.getElementById("categorySelect");
    const titleInput = document.getElementById("titleInput");
    const pagesInput = document.getElementById("pagesInput");
    const filterButton = document.getElementById("filterButton");
    const cheapestBookButton = document.getElementById("cheapestBookButton");
    const mostExpensiveBookButton = document.getElementById("mostExpensiveBookButton");


    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });


    function displayBooks(filteredCategories) {
        categoriesContainer.innerHTML = '';  

        filteredCategories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.name;
            categoryDiv.appendChild(categoryTitle);

            const bookList = document.createElement('ul');
            bookList.className = 'book';

            category.books.forEach(book => {
                const bookItem = document.createElement('li');
                bookItem.innerHTML = `
                    <strong>Pavadinimas:</strong> ${book.title} <br>
                    <strong>ISBN:</strong> ${book.ISBN} <br>
                    <strong>Leidybos metai:</strong> ${book.year} ${isBookNew(book.year) ? '<span class="new">Nauja knyga</span>' : ''} <br>
                    <strong>Puslapių skaičius:</strong> ${book.pages} <br>
                    <strong>Kiekis:</strong> ${book.quantity} <br>
                    <strong>Kaina:</strong> $${book.price.toFixed(2)}
                `;
                bookList.appendChild(bookItem);
            });

            categoryDiv.appendChild(bookList);
            categoriesContainer.appendChild(categoryDiv);
        });
    }


    function filterBooks() {
        const selectedCategory = categorySelect.value;
        const searchTitle = titleInput.value.trim().toLowerCase();
        const maxPages = parseInt(pagesInput.value);

        const filteredCategories = categories.map(category => {
            const filteredBooks = category.books.filter(book => {
                const matchesCategory = selectedCategory === '' || category.name === selectedCategory;
                const matchesTitle = searchTitle === '' || book.title.toLowerCase().includes(searchTitle);
                const matchesPages = isNaN(maxPages) || book.pages <= maxPages;
                return matchesCategory && matchesTitle && matchesPages;
            });

            return { ...category, books: filteredBooks };
        }).filter(category => category.books.length > 0);

        displayBooks(filteredCategories);
    }


    function findCheapestBook() {
        let cheapestBook = null;

        categories.forEach(category => {
            category.books.forEach(book => {
                if (!cheapestBook || book.price < cheapestBook.price) {
                    cheapestBook = book;
                }
            });
        });

        displayBooks([{ name: "Pigiausia knyga", books: [cheapestBook] }]);
    }


    function findMostExpensiveBook() {
        let mostExpensiveBook = null;

        categories.forEach(category => {
            category.books.forEach(book => {
                if (!mostExpensiveBook || book.price > mostExpensiveBook.price) {
                    mostExpensiveBook = book;
                }
            });
        });

        displayBooks([{ name: "Brangiausia knyga", books: [mostExpensiveBook] }]);
    }

    filterButton.addEventListener('click', filterBooks);
    cheapestBookButton.addEventListener('click', findCheapestBook);
    mostExpensiveBookButton.addEventListener('click', findMostExpensiveBook);


    displayBooks(categories);


    function isBookNew(year) {
        const currentYear = new Date().getFullYear();
        return year === currentYear;
    }
});