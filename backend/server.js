const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const complaintRoutes = require("./routes/complaintRoutes");
app.use("/complaints", complaintRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
