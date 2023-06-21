const [form] = document.forms;
const jwt = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, description, genre, price } = e.target;
    const photoInput = document.getElementById("photoInput");

    const formData = new FormData();

    formData.append("title", name.value);
    formData.append("description", description.value);
    formData.append("genre", genre.value);
    formData.append("price", price.value);
    formData.append("image", photoInput.files[0]);

    fetch("http://localhost:4004/api/books", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `BEARER ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        window.location.replace("http://127.0.0.1:5500/frontend/index.html");
      });
  });
});
