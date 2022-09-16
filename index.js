const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan")
require("dotenv").config();
app.use(morgan("dev"))
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(require("./routes/users.route"));
app.use(require("./routes/movies.route"));
app.use(require("./routes/genres.route"));
app.use(require("./routes/comments.route"));

mongoose
  .connect(
    "mongodb+srv://islam:zloy@cluster0.zuauy.mongodb.net/kinoteatr?retryWrites=true&w=majority"
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(4000, () => {
  console.log("Сервер запущен!");
});
