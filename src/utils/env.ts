import dotenv from "dotenv";

export default function loadEnv() {
  if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: "./.env.development" });
  }
  if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: "./.env.production" });
  }
}
