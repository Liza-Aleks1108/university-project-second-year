document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  // Функція для оновлення даних в локальному сховищі
  const updateUserInLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Функція для оновлення об'єкта user
  const updateUserObject = () => {
    const user = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      patronymic: document.getElementById("patronymic").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
      taxNumber: document.getElementById("taxNumber").value,
      password: document.getElementById("password").value,
    };

    updateUserInLocalStorage(user); // Оновлення даних в локальному сховищі
  };

  // Обробник події введення для кожного поля форми
  registrationForm.addEventListener("input", updateUserObject);

  // Обробник події відправки форми
  registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      // Відправка даних на сервер
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("User data sent successfully");
        // Переходимо на сторінку personalpage.html
        window.location.href = "personalpage.html";
      } else {
        console.error("Error sending user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
