document.addEventListener("DOMContentLoaded", function () {
  // Отримати дані користувача з локального сховища
  const userData = JSON.parse(localStorage.getItem("user"));

  // Відображення даних користувача на сторінці
  document.getElementById("userName").textContent = userData.firstName;
  document.getElementById("userLastName").textContent = userData.lastName;
  document.getElementById("userPatronymic").textContent = userData.patronymic;
  document.getElementById("userPhone").textContent = userData.phoneNumber;
  document.getElementById("userEmail").textContent = userData.email;
  document.getElementById("userTaxNumber").textContent = userData.taxNumber;

  // Обробник події для форми розрахунку використаної кількості води та суми до оплати
  document
    .getElementById("waterMeterForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Отримання значень з полів форми
      const previousReading = parseFloat(
        document.getElementById("previousReading").value
      );
      const currentReading = parseFloat(
        document.getElementById("currentReading").value
      );

      // Перевірка, чи сплачено за воду
      const previousPaid = document.getElementById("previousPaid").checked;
      const currentPaid = document.getElementById("currentPaid").checked;

      let unpaidWaterUsage = 0;

      // Розрахунок використаної кількості води (неоплаченої)
      if (!previousPaid) {
        unpaidWaterUsage += previousReading;
      }
      if (!currentPaid) {
        unpaidWaterUsage += currentReading;
      }

      // Відображення використаної кількості води (неоплачено)
      document.getElementById("waterUsage").value = unpaidWaterUsage;

      // Обчислення загальної суми до оплати
      const ratePerCubicMeter = 32; // Тариф за 1 м³ на 15.05.2024 становить 32 грн
      const totalCost = unpaidWaterUsage * ratePerCubicMeter;

      // Відображення загальної суми до оплати
      document.getElementById("totalCost").value = totalCost.toFixed(2); // Округлення до двох знаків після коми
    });

  // Обробник події для створення звіту
  document
    .getElementById("generateReport")
    .addEventListener("click", function () {
      // Отримати дані з форми
      const previousReading = parseFloat(
        document.getElementById("previousReading").value
      );
      const previousPaid = document.getElementById("previousPaid").checked;
      const currentReading = parseFloat(
        document.getElementById("currentReading").value
      );
      const currentPaid = document.getElementById("currentPaid").checked;
      const waterUsage = parseFloat(
        document.getElementById("waterUsage").value
      );
      const totalCost = parseFloat(document.getElementById("totalCost").value);

      // Відображення даних у модальному вікні
      const reportContent = `
            <p><strong>Ім'я:</strong> ${userData.firstName}</p>
            <p><strong>Прізвище:</strong> ${userData.lastName}</p>
            <p><strong>По батькові:</strong> ${userData.patronymic}</p>
            <p><strong>Номер телефону:</strong> ${userData.phoneNumber}</p>
            <p><strong>Електронна адреса:</strong> ${userData.email}</p>
            <p><strong>РНОКПП (ІПН):</strong> ${userData.taxNumber}</p>
            <h2>Показники водоміру</h2>
            <table>
                <tr>
                    <th>Параметр</th>
                    <th>Значення</th>
                </tr>
                <tr>
                    <td>Попередні показники м³:</td>
                    <td>${previousReading}</td>
                </tr>
                <tr>
                    <td>Попередні показники сплачено:</td>
                    <td>${previousPaid ? "Так" : "Ні"}</td>
                </tr>
                <tr>
                    <td>Поточні показники м³:</td>
                    <td>${currentReading}</td>
                </tr>
                <tr>
                    <td>Поточні показники сплачено:</td>
                    <td>${currentPaid ? "Так" : "Ні"}</td>
                </tr>
                <tr>
                    <td>Використана кількість води м³ (неоплачено):</td>
                    <td>${waterUsage}</td>
                </tr>
                <tr>
                    <td>Тариф за 1 м³:</td>
                    <td>32 грн</td>
                </tr>
                <tr>
                    <td>Загальна сума до оплати (грн):</td>
                    <td>${totalCost.toFixed(2)}</td>
                </tr>
            </table>
        `;

      document.getElementById("reportContent").innerHTML = reportContent;

      // Показати модальне вікно
      document.getElementById("modal").style.display = "block";
    });

  // Закриття модального вікна
  document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });

  // Закриття модального вікна при кліку поза його межами
  window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("modal")) {
      document.getElementById("modal").style.display = "none";
    }
  });
});
