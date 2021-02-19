const express = require("express");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const productRouter = require("./routes/productRoutes");

connectDB();
const app = express();

app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;
app.listen(
  port,
  console.log(`Server is running ${process.env.NODE_ENV} mode on ${port} port`)
);
