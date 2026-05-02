const axios = require("axios");

const AUTH_URL = "http://20.207.122.201/evaluation-service/auth";

async function getToken() {
  try {
    const res = await axios.post(AUTH_URL, {
      email: "your-email",
      name: "your-name",
      rollNo: "your-roll-number",
      accessCode: "your-access-code"
    });

    console.log(res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

getToken();