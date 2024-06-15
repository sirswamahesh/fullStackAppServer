require("dotenv").config();
const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const connectDB = require("./config/db");

// mongodb connection
connectDB();
//Dotenv

//Res object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to full stack app",
  });
});

app.use("/api/v1/auth", require("./routes/userRoutes"));

//Port
const PORT = process.env.PORT || 8080;

//Listen

app.listen(PORT, () => {
  console.log(`server running  ${PORT}`);
});
