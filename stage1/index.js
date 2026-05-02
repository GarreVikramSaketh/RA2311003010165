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

    // Sort by priority + latest timestamp
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
      { Type: "Placement", Message: "Afford Medical hiring", Timestamp: "2026-04-22 17:51:18" },
      { Type: "Result", Message: "Mid-sem results", Timestamp: "2026-04-22 17:51:30" },
      { Type: "Event", Message: "Farewell event", Timestamp: "2026-04-22 17:51:06" }
    ];

    // Same sorting logic
    notifications.sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    console.log("\nTop Notifications (Fallback):\n");

    notifications.forEach((n, i) => {
      console.log(`${i + 1}. [${n.Type}] ${n.Message}`);
    });
  }
}

main();