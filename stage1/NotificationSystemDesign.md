# Stage 1 - Notification Priority System

## Approach
- Fetch notifications from the given API
- Assign priority:
  - Placement > Result > Event
- Sort notifications based on:
  1. Priority (higher first)
  2. Timestamp (latest first)
- Select top 10 notifications

## Time Complexity
- Sorting takes O(N log N)

## Optimization
- Use a Min Heap of size 10 to maintain top notifications efficiently
- Reduces complexity to O(N log K)

## Scalability
- Can handle large data using pagination
- Real-time systems can use streaming (e.g., Kafka)

## Logging
- Implemented reusable logging middleware
- Logs API calls, sorting steps, and errors