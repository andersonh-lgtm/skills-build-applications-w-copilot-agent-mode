import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGO_PORT = process.env.MONGO_PORT ? Number(process.env.MONGO_PORT) : 27017;
const MONGO_URI = process.env.MONGO_URI ?? `mongodb://localhost:${MONGO_PORT}/octofit`;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "OctoFit Tracker backend is running" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`OctoFit backend listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
