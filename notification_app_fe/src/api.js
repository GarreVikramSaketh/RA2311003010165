import axios from "axios";

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

export const fetchNotifications = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.notifications;
  } catch {
    // fallback (same as Stage 1 data)
    return [
      { Type: "Placement", Message: "CSX Corporation hiring", Timestamp: "2026-04-22 17:51:18" },
      { Type: "Placement", Message: "Advanced Micro Devices Inc. hiring", Timestamp: "2026-04-22 17:49:42" },
      { Type: "Result", Message: "mid-sem", Timestamp: "2026-04-22 17:51:30" },
      { Type: "Result", Message: "project-review", Timestamp: "2026-04-22 17:50:42" },
      { Type: "Event", Message: "farewell", Timestamp: "2026-04-22 17:51:06" }
    ];
  }
};