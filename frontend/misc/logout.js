const logUserOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.replace("http://127.0.0.1:5500/frontend/login/login.html");
};
