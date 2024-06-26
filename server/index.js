// Importy
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import UserRoute from "./routes/UserRoute.js";
import session from "express-session";
import PostRoute from "./routes/PostRoute.js";
import CommentRoute from "./routes/CommentRoute.js";
import NotificationRoute from "./routes/NotificationRoute.js";

// Middlewary
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Middleware CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Origin"],
  })
);
// Middleware sesji
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
// Routy
app.use("/user", UserRoute);
app.use("/comment", CommentRoute);
app.use("/post", PostRoute);
app.use("/notifications", NotificationRoute);
// Konfiguracja bazy danych
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("SERVER IS RUNNING ON PORT:", PORT));
  })
  .catch((err) => console.log(err));
