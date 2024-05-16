// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 3000;
// const DATA_FILE = path.join(__dirname, "users.json");

// app.use(cors());
// app.use(bodyParser.json());

// // Статичні файли
// app.use(express.static(__dirname));

// // Відправка register.html при доступі до кореневого URL
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "register.html"));
// });

// app.post("/register", (req, res) => {
//   const user = req.body;

//   fs.readFile(DATA_FILE, (err, data) => {
//     if (err) {
//       if (err.code === "ENOENT") {
//         // Якщо файл не існує, створюємо новий
//         return fs.writeFile(
//           DATA_FILE,
//           JSON.stringify([user], null, 2),
//           (writeErr) => {
//             if (writeErr) throw writeErr;
//             res.send("User data saved");
//           }
//         );
//       }
//       throw err;
//     }

//     const users = JSON.parse(data);
//     users.push(user);

//     fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (writeErr) => {
//       if (writeErr) throw writeErr;
//       res.send("User data saved");
//     });
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
