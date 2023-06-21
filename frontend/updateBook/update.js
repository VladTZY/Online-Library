const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const [form] = document.forms;
const jwt = localStorage.getItem("token");

let curentBook;

console.log(id);

const getBook = async (id) => {
  await fetch(`http://localhost:4004/api/books/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `BEARER ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      curentBook = json;
    });
};

document.addEventListener("DOMContentLoaded", async () => {
  await getBook(id);

  form.name.value = curentBook.title;
  form.description.value = curentBook.description;
  form.genre.value = curentBook.genre;
  form.price.value = curentBook.price;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, description, genre, price } = e.target;

    const updatedBook = {
      title: name.value,
      description: description.value,
      genre: genre.value,
      price: price.value,
    };

    fetch(`http://localhost:4004/api/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBook),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `BEARER ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        window.location.replace("http://127.0.0.1:5500/frontend/index.html");
      });
  });
});
