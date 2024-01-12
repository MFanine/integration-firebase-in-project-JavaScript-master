const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });
const dbConnection = require("./config/database");
const productRoute = require("./routes/productRoute");

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

app.use("/api/v1/products", productRoute);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
