const [form] = document.forms;
const [nameFeedback, passwordFeedback, confirmPasswordFeedback] =
  document.querySelectorAll(".feedback");

const isNameValid = (name) => {
  return name.length > 3 && name.length <= 20 && /^[A-Za-z0-9_ ]*$/g.test(name);
};

const isPasswordValid = (password) => {
  return /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/gm.test(
    password
  );
};

const isPasswordMatch = (password, confirmPassword) => {
  return !!confirmPassword && password === confirmPassword;
};

const validation = (name, password, confirmPassword) => {
  return (
    isNameValid(name) &&
    isPasswordValid(password) &&
    isPasswordMatch(password, confirmPassword)
  );
};

const toggleShowPassword = (toggler, elements) => {
  toggler.addEventListener("change", (e) => {
    elements.forEach((element) => {
      element.setAttribute("type", e.target.checked ? "text" : "password");
    });
  });
};

const getElement = (name, e) => {
  return {
    name(e) {
      e.target.classList.toggle("border-danger", !isNameValid(e.target.value));
      nameFeedback.textContent = isNameValid(e.target.value)
        ? null
        : "Name must be at least 3 to 20 characters long and contain only alphabet, number, underscore and white space";
    },
    password(e) {
      e.target.classList.toggle(
        "border-danger",
        !isPasswordValid(e.target.value)
      );
      passwordFeedback.textContent = isPasswordValid(e.target.value)
        ? null
        : "Password must be at least 7 characters long and contain 1 capital letter and 1 symbol or number";

      form.confirmPassword.classList.toggle(
        "border-danger",
        !isPasswordMatch(e.target.value, form.confirmPassword.value)
      );
      confirmPasswordFeedback.textContent = isPasswordMatch(
        e.target.value,
        form.confirmPassword.value
      )
        ? null
        : "Password do not match";
    },
    confirmPassword(e) {
      e.target.classList.toggle(
        "border-danger",
        !isPasswordMatch(form.password.value, e.target.value)
      );
      confirmPasswordFeedback.textContent = isPasswordMatch(
        form.password.value,
        e.target.value
      )
        ? null
        : "Password do not match";
    },
  }[name](e);
};

const handleInput = (e) => {
  const { name: formName, password, confirmPassword, btn } = form;
  const { name } = e.target;

  getElement(name, e);

  btn.disabled = !validation(
    formName.value,
    password.value,
    confirmPassword.value
  );
};

document.addEventListener("DOMContentLoaded", () => {
  toggleShowPassword(form.showPassword, [form.password, form.confirmPassword]);

  form.name.addEventListener("input", handleInput);

  form.password.addEventListener("input", handleInput);

  form.confirmPassword.addEventListener("input", handleInput);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, password, confirmPassword } = e.target;
    const submittedValue = {
      name: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    // Check console to see the result
    fetch("http://localhost:4004/api/user/signup", {
      method: "POST",
      body: JSON.stringify({
        username: submittedValue.name,
        password: submittedValue.password,
        role: "ADMIN",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        localStorage.setItem("username", json.username);
        localStorage.setItem("role", json.role);
        window.location.replace("http://127.0.0.1:5500/frontend/index.html");
      });
  });
});
