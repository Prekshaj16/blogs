const express = require('express');
const multer = require('multer');
const cors = require("cors");
const cookieParser = require('cookie-parser'); 

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

const allowedOrigins = [
  "https://blogs-jet-two.vercel.app",
  "https://blogs-six-rouge.vercel.app",
  /\.vercel\.app$/,
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === "string" ? o === origin : o.test(origin)
    );
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));
app.use(cookieParser()); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;