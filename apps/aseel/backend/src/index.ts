import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { customerAuthRoutes } from "./routes/auth.routes";
import dns from "node:dns/promises";

dotenv.config();

const app = express();
dns.setServers(["1.1.1.1"]);

app.use(cors());
app.use(express.json());

// جميع مسارات الـ API
app.use("/api/customer-system/customer", customerAuthRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/event-planner-aseel";

async function main() {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`✅ Backend Server running on http://localhost:${PORT}`);
    console.log(
      `📡 API Base: http://localhost:${PORT}/api/customer-system/customer`,
    );
  });
}

main().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
