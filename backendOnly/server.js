import express from "express";
import path from "path"
import authRoutes from "./routes/user.js"
import paymentRoutes from "./routes/payment.js"
import { connectToDatabase } from "./connectToDB.js";
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello from your Express.js server!');
});
const staticFilesDirectory = path.join(path.resolve(), 'public');
app.use(express.static(path.resolve(staticFilesDirectory)))
app.get("/api/payment", (req, res) => {
  res.sendFile(path.join(staticFilesDirectory, 'index.html'));
})
app.use("/api", paymentRoutes)
app.use("/auth", authRoutes)


connectToDatabase().then(
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  })
);



