import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import playerRoutes from "./Routes/playerRoutes";
import authRoutes from "./Routes/authRoutes";

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/auth", authRoutes);
app.use("/player", playerRoutes);
// app.use("/uploads", express.static("uploads"));


const PORT: string = process.env.PORT || "3000";

app.listen(3000, () => {
  console.log(`Server listening on port ${PORT}...`);
});
