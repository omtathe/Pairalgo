import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";

const app = express();

// __dirname equivalent for ES modules
const __dirname = path.resolve();

// API Routes
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is running" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "This is the books endpoint" });
});

// Serve React frontend in production
if (ENV.NODE_ENV === "production") {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all route to send index.html
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));