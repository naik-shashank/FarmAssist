const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

dotenv.config({ path: "./conf.env" });

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("DB connected...");
  })
  .catch((err) => {
    console.log("DB not connected..");
    console.log(err);
  });

const app = express();
// Allow all origins (for development)
app.use(cors());

// If you want to allow only your frontend:
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend URL in production
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const upload = multer({ storage: multer.memoryStorage() });

const PlantDisease_router = require("./router/PlantDisease_router");
const user_router = require("./router/user_router");
const paymentRoutes = require("./router/payment_router");

app.use(express.json());
app.use(upload.single("image"));

app.use("/api/predict", PlantDisease_router);
app.use("/api/user", user_router);
app.use("/api/payment", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log("listnng.....");
});
