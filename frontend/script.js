const jwt = localStorage.getItem("token");
const username = localStorage.getItem("username");
const role = localStorage.getItem("role");
const container = document.getElementById("books-wrapper");
const searchInput = document.getElementById("search-input");
let searchValue = "";
let books = [];

searchInput.addEventListener("change", (event) => {
  searchValue = event.target.value;
  container.innerHTML = "";
  main();
});

const getBooks = async () => {
  await fetch("http://localhost:4004/api/books", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `BEARER ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      books = json;
    });
};

const addBookToCart = async (bookId) => {
  await fetch(`http://localhost:4004/api/books/${bookId}/addToCart`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `BEARER ${jwt}`,
    },
  }).then((res) => {
    alert("Book added to cart");
  });
};

const deleteBook = async (id) => {
  await fetch(`http://localhost:4004/api/books/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `BEARER ${jwt}`,
    },
  }).then((res) => location.reload());
};

const main = async () => {
  await getBooks();

  if (role == "ADMIN") {
    const addBookDiv = document.getElementById("addBookDiv");
    addBookDiv.innerHTML = `<a class="pointer-cursor" href="./addBook/addBook.html">
        Add book
      </a>`;

    books.forEach((book) => {
      if (book.title.includes(searchValue)) {
        let newBook = `<div class="swiper-slide box book" style="margin-left: 10px;
            margin-right: 10px;">
            <div class="icons">
              <a onClick="deleteBook(${book.id})" class="fas fa-trash-can"></a>
              <a href="./updateBook/update.html?id=${book.id}" class="fas fa-pen-to-square"></a>
              <a onClick="addBookToCart(${book.id})" class="fas fa-cart-plus"> </a>
            </div>
            <div class="image">
              <img src="http://localhost:4004/uploads/${book.coverFile}" alt="" />
            </div> 
            <div class="content">
              <h1>${book.title}</h1>
              <p>${book.description}</p>
              <p>Genre: ${book.genre}</p>
              <h3>${book.price} RON</h3>
            </div>
          </div>`;
        container.innerHTML += newBook;
      }
    });
  } else {
    books.forEach((book) => {
      if (book.title.includes(searchValue)) {
        let newBook = `<div class="swiper-slide box book" style="margin-left: 10px;
    margin-right: 10px;">
    <div class="icons">
      <a class="fas fa-cart-plus"> </a>
    </div>
    <div class="image">
      <img src="http://localhost:4004/uploads/${book.coverFile}" alt="" />
    </div> 
    <div class="content">
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      <p>Genre: ${book.genre}</p>
      <h2>${book.price} RON</h2>
    </div>
  </div>`;
        container.innerHTML += newBook;
      }
    });
  }
};

const usernameField = document.getElementById("username-field");
usernameField.innerHTML = username;
main();
