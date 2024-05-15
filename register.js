document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registrationForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      // Отримуємо значення з полів форми
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const patronymic = document.getElementById("patronymic").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const email = document.getElementById("email").value;
      const taxNumber = document.getElementById("taxNumber").value;
      const password = document.getElementById("password").value;

      // Створюємо об'єкт для зберігання даних користувача
      const user = {
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic,
        phoneNumber: phoneNumber,
        email: email,
        taxNumber: taxNumber,
        password: password,
      };

      // Зберігаємо дані користувача у локальному сховищі браузера
      localStorage.setItem("user", JSON.stringify(user));

      // Збереження в базі даних IndexedDB
      await saveUserToIndexedDB(user);

      // Переходимо на сторінку personalpage.html
      window.location.href = "personalpage.html";
    });
});

async function saveUserToIndexedDB(user) {
  try {
    const db = await openDB("users-database", 1, {
      upgrade(db) {
        db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
      },
    });

    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    await store.add(user);
    await tx.done;

    console.log("User saved to IndexedDB");
  } catch (error) {
    console.error("Error saving user to IndexedDB:", error);
  }
}
