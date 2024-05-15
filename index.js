// Для index.html

// Увійти на сторінку
document.getElementById("loginBtn").addEventListener("click", function () {
  window.location.href = "login.html";
});

// Зареєструватися
document.getElementById("registerBtn").addEventListener("click", function () {
  window.location.href = "./register.html"; // Перенаправление на страницу регистрации
});
