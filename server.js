import express from "express";
import dotenv from "dotenv";
import dbconnect from "./config/Db.js";
import morgan from "morgan";
import authroute from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryroutes.js";
import cors from "cors";
import path from "path"
import productRoutes from "./routes/productRoutes.js";
import {fileURLToPath} from 'url'

const app = express();

//cors enable
app.use(cors());
const __filename =fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);
//db connection
dbconnect();

//config dotenv
dotenv.config();

//middleares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')))

//Routes
app.use("/api/v1/auth", authroute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

app.use("*",function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//Port
const PORT = process.env.PORT||8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
