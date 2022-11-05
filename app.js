require("dotenv").config();
require("express-async-errors");

//Extra Security Features
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // limit ea ch Ip to 100 request per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//router
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

//error handler
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

//extra Packages

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
