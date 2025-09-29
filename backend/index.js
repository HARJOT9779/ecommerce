const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db"); // DB connection file
const userRouter = require("./routes/userRouter"); // your user routes
const memberShipRouter = require("./routes/memberShipRouter"); 
const trainerRouter = require("./routes/trainerRouter");
const cors = require("cors")


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors({
  origin: "http://localhost:5173",
}));
// Middleware
app.use(express.json());


// Routes
app.use("/api/user", userRouter);
app.use("/api/membership", memberShipRouter);//membership router
app.use("/api/trainers", trainerRouter);   // Trainer CRUD

// Connect Database
connectDB();

// Start server
app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
