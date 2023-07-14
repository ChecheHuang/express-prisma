import dotenv from "dotenv";
import moduleAlias from "module-alias";
export default function loadEnv() {
  moduleAlias.addAliases({
    "@": "dist",
  });
  if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: "./.env.development" });
  }
  if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: "./.env.production" });
  }
}
