document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Перешкоджаємо відправленню форми

    // Отримання введених даних користувачем
    // var name = document.getElementById("name").value;
    // var surname = document.getElementById("surname").value;
    // var patronymic = document.getElementById("patronymic").value;
    var ipn = document.getElementById("ipn").value;
    var password = document.getElementById("password").value;

    // Отримання даних з файлу users.json (вам потрібно буде використати асинхронний запит)
    fetch("./users.json")
      .then((response) => response.json())
      .then((data) => {
        // Перевірка, чи введені дані співпадають з даними в файлі users.json
        var user = data.find(
          (user) =>
            // user.firstName === name &&
            // user.lastName === surname &&
            // user.patronymic === patronymic &&
            user.taxNumber === ipn && user.password === password
        );

        if (user) {
          // Якщо знайдено відповідного користувача, перенаправте на сторінку personalpage.html
          window.location.href = "personalpage.html";
        } else {
          // Якщо користувача не знайдено, виведіть повідомлення про помилку або візуалізуйте її
          alert("Невірні дані. Спробуйте ще раз.");
        }
      })
      .catch((error) => {
        console.error("Помилка отримання даних з файлу users.json:", error);
      });
  });
