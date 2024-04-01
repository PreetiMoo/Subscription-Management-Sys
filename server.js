require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const sequelize = new Sequelize({
  dialect: 'mysql',
  storage: 'C:/Program Files/MySQL/MySQL Server 8.0/bin',
  password: 'Preeti',
  username: 'root',
  database: "subsys",
  logging: false
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const port = 8000 || process.env.port;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/accounts", require("./routes/accounts/register"));
app.use("/login", require("./routes/accounts/login"));
app.use("/prodList", require("./routes/accounts/prodList"));
app.use("/subsPlanList", require("./routes/accounts/subsPlanList"));
app.use("/merchCustom", require("./routes/accounts/merchCustomization"));
app.use("/subscriptions", require("./routes/accounts/subs"));
app.use("/payment", require("./routes/PG/payments"));


app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});



app.listen(port, () => console.log(`Server running on port ${port}`));
