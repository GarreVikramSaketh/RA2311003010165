const axios = require("axios");
const Log = require("./logger");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function main() {
  console.log("Program started");

  try {
    await Log("backend", "info", "service", "fetching notifications");

    const response = await axios.get(API_URL);
    const notifications = response.data.notifications;

    await Log("backend", "info", "service", "notifications fetched");

    notifications.sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    await Log("backend", "info", "utils", "notifications sorted");

    const top10 = notifications.slice(0, 10);

    console.log("\nTop 10 Notifications:\n");

    top10.forEach((n, i) => {
      console.log(`${i + 1}. [${n.Type}] ${n.Message}`);
    });

  } catch (error) {
    await Log("backend", "error", "handler", "API failed, using fallback");

    console.log("API failed → using fallback data");

    const notifications = [
      { Type: "Placement", Message: "CSX Corporation hiring", Timestamp: "2026-04-22 17:51:18" },
      { Type: "Placement", Message: "Advanced Micro Devices Inc. hiring", Timestamp: "2026-04-22 17:49:42" },

      { Type: "Result", Message: "mid-sem", Timestamp: "2026-04-22 17:51:30" },
      { Type: "Result", Message: "mid-sem", Timestamp: "2026-04-22 17:50:54" },
      { Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:50:42" },
      { Type: "Result", Message: "external", Timestamp: "2026-04-22 17:50:30" },
      { Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:50:18" },
      { Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:49:54" },
      { Type: "Event", Message: "farewell", Timestamp: "2026-04-22 17:51:06" },
      { Type: "Event", Message: "tech-fest", Timestamp: "2026-04-22 17:50:06" }
    ];

    notifications.sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    console.log("\nTop Notifications (Fallback):\n");

    notifications.forEach((n, i) => {
      console.log(`${i + 1}. [${n.Type}] ${n.Message} (${n.Timestamp})`);
    });
  }
}

main();