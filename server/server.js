const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("./config/passport");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

// Routes
app.use("/api/auth/", require("./routes/authRoutes"));
app.use("/api/task/", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));