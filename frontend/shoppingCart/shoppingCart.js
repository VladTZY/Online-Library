const jwt = localStorage.getItem("token");

const emptyCart = async () => {
  await fetch("http://localhost:4004/api/cart/empty", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `BEARER ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.replace("http://127.0.0.1:5500/frontend/index.html");
    });
};

const orderCart = async () => {
  alert("Order placed");
  await emptyCart();
};

const redirectCart = () => {
  alert("Your cart is empty, add something your cart");
  window.location.replace("http://127.0.0.1:5500/frontend/index.html");
};

const removeFromCart = async (bookId) => {
  await fetch(`http://localhost:4004/api/cart/remove/${bookId}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `BEARER ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.replace(
        "http://127.0.0.1:5500/frontend/shoppingCart/shoppingCart.html"
      );
    });
};

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("http://localhost:4004/api/cart", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `BEARER ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      totalPrice = data.totalPrice;
      books = data.books;
    });

  document.getElementById("total-price").innerHTML = `${totalPrice} RON`;

  if (books.length == 0) {
    redirectCart();
  }

  const bookContainer = document.getElementById("books");

  books.forEach((book) => {
    let newBook = `<div class="book container row justify-content-center ml-0 mr-0">
    <div class="card shadow my-5">
    <div class="image">
      <img src="http://localhost:4004/uploads/${book.coverFile}" />
    </div> 
    <div class="book-content">
      <h3>${book.title}</h3>
      <h2>${book.price} RON</h2>
      <button onclick="removeFromCart(${book.id})" class="btn btn-success mb-2">Remove from cart</button>
    </div>
    </div>
  </div>`;
    bookContainer.innerHTML += newBook;
  });
});
