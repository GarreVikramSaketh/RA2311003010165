import axios from "axios";

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

export async function Log(stack, level, pkg, message) {
  try {
    await axios.post(LOG_API, {
      stack,
      level,
      package: pkg,
      message
    });
  } catch {
    console.log("Log failed (frontend)");
  }
}