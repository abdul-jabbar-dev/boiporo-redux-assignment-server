import { connect } from "mongoose";
import app from "./app";
import env from "./config/env";

async function getConnect() {
  try {
    await connect(env.DB_STRING);
    console.log("Db is connect");
  } catch (error) {
    throw error;
  }
}
getConnect().catch((err) => console.log(err));

app.listen(env.PORT, () => {
  console.log("server is running by " + env.PORT);
});
