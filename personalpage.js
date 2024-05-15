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
});
