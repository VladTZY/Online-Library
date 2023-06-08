const [form] = document.forms;
const jwt = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  //form.name.addEventListener("input", handleInput);
  //form.description.addEventListener("input", handleInput);
  //form.genre.addEventListener("input", handleInput);
  //form.name.addEventListener("input", handleInput);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, description, genre } = e.target;

    const newBook = {
      title: name.value,
      description: description.value,
      genre: genre.value,
    };

    fetch("http://localhost:4004/api/books", {
      method: "POST",
      body: JSON.stringify(newBook),
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
