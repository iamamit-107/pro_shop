const express = require("express");
const dotenv = require("dotenv").config();
const products = require("./data/products");

const app = express();

app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 6000;

app.listen(
  port,
  console.log(`Server is running ${process.env.NODE_ENV} mode on ${port} port`)
);
