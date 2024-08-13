import dotenv from "dotenv";

dotenv.config();

const config = {
  app_name: process.env["APP_NAME"],
  port: process.env["PORT"] ?? 5000,
  db_uri: process.env["DB_URI"] ?? "mongodb://localhost:27017/fdj-sports",
  db_options: {
    user: process.env["MONGO_INITDB_ROOT_USERNAME"] ?? "root",
    pass: process.env["MONGO_INITDB_ROOT_PASSWORD"] ?? "example",
  },
};

export default config;
