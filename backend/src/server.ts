import "dotenv/config";
import express from "express";
import cors from "cors";
import notFound from "./middleware/notFound.middleware";
import errorHandler from "./middleware/error.middleware";
import connectDB from "./config/db";
import routes from "./routes";

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;


// Middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended:true
}));


// Health Check
app.get("/", (_req,res)=>{

  res.json({
    success:true,
    message:"AvailNNS Backend Running 🚀",
  });

});


// API
app.use("/api", routes);


// Error handlers
app.use(notFound);

app.use(errorHandler);


app.listen(PORT,()=>{

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});