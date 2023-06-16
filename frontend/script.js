const jwt = localStorage.getItem("token");
const username = localStorage.getItem("username");
const container = document.getElementById("books-wrapper");
let books = [];

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

  books.forEach((book) => {
    let newBook = `<div class="swiper-slide box book" style="margin-left: 10px;
    margin-right: 10px;">
    <div class="icons">
      <a onClick="deleteBook(${book.id})" class="fas fa-trash-can"></a>
      <a href="./updateBook/update.html?id=${book.id}" class="fas fa-pen-to-square"></a>
    </div>
    <div class="image">
      <img src="http://localhost:4004/uploads/${book.coverFile}" alt="" />
    </div> 
    <div class="content">
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      <p>Genre: ${book.genre}</p>
    </div>
  </div>`;
    container.innerHTML += newBook;
  });
};

const usernameField = document.getElementById("username-field");
usernameField.innerHTML = username;
main();
