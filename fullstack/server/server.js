import express from "express";
import authRoutes from "./routes/user.js"
import paymentRoutes from "./routes/payment.js"
import { connectToDatabase } from "./connectToDB.js";
import cors from "cors"
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors("http://localhost:5173/"))
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello from your Express.js server!');
});

app.use("/api", paymentRoutes)
app.use("/auth", authRoutes)


connectToDatabase().then(
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  })
);



