const express = require("express");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

connectDB();
const app = express();

// Allow us to accept JSON data in the body
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;
app.listen(
  port,
  console.log(`Server is running ${process.env.NODE_ENV} mode on ${port} port`)
);
