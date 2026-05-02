import { useEffect, useState } from "react";
import { fetchNotifications } from "./api";
import { Log } from "./logger";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  Box
} from "@mui/material";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    Log("frontend", "info", "page", "App loaded");
    loadData();
  }, []);

  const loadData = async () => {
    Log("frontend", "info", "api", "Fetching notifications");

    const res = await fetchNotifications();

    Log("frontend", "info", "api", "Notifications fetched");

    setData(res);
  };

  // Sort by priority + timestamp
  const sorted = [...data].sort((a, b) => {
    if (priorityMap[b.Type] !== priorityMap[a.Type]) {
      return priorityMap[b.Type] - priorityMap[a.Type];
    }
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  // Filter
  const filtered = filter ? sorted.filter(n => n.Type === filter) : sorted;

  // Pagination
  const itemsPerPage = 5;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="md">

      {/* Priority Section */}
      <Typography variant="h4" gutterBottom>
        Priority Notifications
      </Typography>

      {sorted.slice(0, 5).map((n, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{n.Type}</Typography>
            <Typography>{n.Message}</Typography>
            <Typography variant="caption">{n.Timestamp}</Typography>
          </CardContent>
        </Card>
      ))}

      {/* All Notifications */}
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          All Notifications
        </Typography>

        <Select
          value={filter}
          onChange={(e) => {
            Log("frontend", "info", "state", "Filter changed");
            setFilter(e.target.value);
            setPage(1);
          }}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>

        {paginated.map((n, i) => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{n.Type}</Typography>
              <Typography>{n.Message}</Typography>
              <Typography variant="caption">{n.Timestamp}</Typography>
            </CardContent>
          </Card>
        ))}

        {/* Pagination */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={() => {
              Log("frontend", "info", "state", "Previous page clicked");
              setPage(page - 1);
            }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              Log("frontend", "info", "state", "Next page clicked");
              setPage(page + 1);
            }}
          >
            Next
          </Button>
        </Box>
      </Box>

    </Container>
  );
}

export default App;