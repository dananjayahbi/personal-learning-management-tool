# Queue Applications

## 🎯 Real-World Applications of Queues

Queues are fundamental data structures used extensively in computer science and real-world systems. Let's explore where and how they're applied.

---

## 🖥️ 1. Operating Systems

### CPU Scheduling

```
Ready Queue: [P1] ← [P2] ← [P3] ← [P4]
CPU executes processes in FIFO order (Round Robin)

Process P1 runs → moves to back if not complete
Next: P2 runs, and so on...
```

**Algorithms:**
- Round Robin Scheduling
- First Come First Served (FCFS)
- Multilevel Queue Scheduling

### Print Queue Management

```python
class PrintQueue:
    def __init__(self):
        self.queue = []
    
    def add_job(self, document):
        self.queue.append(document)
        print(f"Added: {document}")
    
    def process_job(self):
        if self.queue:
            doc = self.queue.pop(0)
            print(f"Printing: {doc}")
            return doc
        print("No jobs in queue")

# Usage
printer = PrintQueue()
printer.add_job("Report.pdf")
printer.add_job("Invoice.docx")
printer.process_job()  # Prints Report.pdf first
```

---

## 🌐 2. Networking

### Packet Buffering

```
Router Queue:
Incoming packets → [P1, P2, P3, P4] → Outgoing link

Packets processed in order received (FIFO)
If buffer full → packet dropped
```

### Request Handling in Web Servers

```python
from collections import deque
import time

class WebServer:
    def __init__(self, max_queue_size=100):
        self.request_queue = deque(maxlen=max_queue_size)
    
    def handle_request(self, request):
        if len(self.request_queue) < self.request_queue.maxlen:
            self.request_queue.append(request)
            print(f"Queued: {request}")
        else:
            print(f"Server busy! Rejected: {request}")
    
    def process_requests(self):
        while self.request_queue:
            request = self.request_queue.popleft()
            print(f"Processing: {request}")
            time.sleep(0.1)  # Simulate processing

# Usage
server = WebServer(max_queue_size=5)
for i in range(7):
    server.handle_request(f"Request-{i}")
server.process_requests()
```

---

## 🔍 3. Breadth-First Search (BFS)

### Graph Traversal

```python
from collections import deque

def bfs(graph, start):
    """Breadth-First Search using queue"""
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# Example Graph
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(bfs(graph, 'A'))
# Output: ['A', 'B', 'C', 'D', 'E', 'F']
```

### Level Order Traversal (Trees)

```python
from collections import deque

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def level_order_traversal(root):
    """Print tree level by level"""
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result

# Example
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

print(level_order_traversal(root))
# Output: [[1], [2, 3], [4, 5]]
```

---

## 💾 4. Caching Mechanisms

### Cache Replacement Policies

```python
from collections import deque

class FIFOCache:
    """First In First Out Cache"""
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.queue = deque()
    
    def get(self, key):
        return self.cache.get(key, -1)
    
    def put(self, key, value):
        if key not in self.cache:
            if len(self.cache) >= self.capacity:
                # Remove oldest entry
                oldest = self.queue.popleft()
                del self.cache[oldest]
            
            self.queue.append(key)
        
        self.cache[key] = value

# Usage
cache = FIFOCache(3)
cache.put(1, "A")
cache.put(2, "B")
cache.put(3, "C")
cache.put(4, "D")  # Removes key 1
print(cache.get(1))  # -1 (evicted)
print(cache.get(2))  # "B"
```

---

## 🎮 5. Gaming Applications

### Event Queue

```python
from collections import deque

class GameEventQueue:
    def __init__(self):
        self.events = deque()
    
    def add_event(self, event_type, data):
        self.events.append({
            'type': event_type,
            'data': data
        })
    
    def process_events(self):
        while self.events:
            event = self.events.popleft()
            self.handle_event(event)
    
    def handle_event(self, event):
        print(f"Processing {event['type']}: {event['data']}")

# Usage
game = GameEventQueue()
game.add_event("PLAYER_MOVE", {"x": 100, "y": 200})
game.add_event("ENEMY_SPAWN", {"type": "zombie"})
game.add_event("COLLECT_ITEM", {"item": "health_pack"})
game.process_events()
```

---

## 🏪 6. Customer Service Systems

### Call Center Queue

```python
from collections import deque
import time

class CallCenter:
    def __init__(self, num_agents):
        self.call_queue = deque()
        self.agents_available = num_agents
    
    def incoming_call(self, caller_id):
        self.call_queue.append({
            'caller_id': caller_id,
            'wait_time': time.time()
        })
        print(f"Call from {caller_id} added to queue")
    
    def answer_call(self):
        if self.call_queue and self.agents_available > 0:
            call = self.call_queue.popleft()
            wait = time.time() - call['wait_time']
            self.agents_available -= 1
            print(f"Answering call from {call['caller_id']}")
            print(f"Wait time: {wait:.2f} seconds")
            return call
        else:
            print("All agents busy or no calls")
    
    def end_call(self):
        self.agents_available += 1

# Usage
center = CallCenter(num_agents=2)
center.incoming_call("Customer-1")
center.incoming_call("Customer-2")
center.incoming_call("Customer-3")
time.sleep(1)
center.answer_call()
center.answer_call()
```

---

## 📱 7. Message Queue Systems

### Producer-Consumer Pattern

```python
from collections import deque
import threading
import time
import random

class MessageQueue:
    def __init__(self, max_size=10):
        self.queue = deque(maxlen=max_size)
        self.lock = threading.Lock()
    
    def produce(self, message):
        with self.lock:
            self.queue.append(message)
            print(f"Produced: {message}")
    
    def consume(self):
        with self.lock:
            if self.queue:
                message = self.queue.popleft()
                print(f"Consumed: {message}")
                return message
        return None

# Producer thread
def producer(mq, n):
    for i in range(n):
        mq.produce(f"Message-{i}")
        time.sleep(random.uniform(0.1, 0.5))

# Consumer thread
def consumer(mq, n):
    for _ in range(n):
        mq.consume()
        time.sleep(random.uniform(0.2, 0.6))

# Usage
mq = MessageQueue()
t1 = threading.Thread(target=producer, args=(mq, 5))
t2 = threading.Thread(target=consumer, args=(mq, 5))
t1.start()
t2.start()
t1.join()
t2.join()
```

---

## 🚦 8. Traffic Management

### Traffic Light System

```python
from collections import deque

class TrafficLightSystem:
    def __init__(self):
        self.lanes = {
            'North': deque(),
            'South': deque(),
            'East': deque(),
            'West': deque()
        }
        self.green_light = 'North'
    
    def car_arrives(self, lane, car_id):
        self.lanes[lane].append(car_id)
        print(f"Car {car_id} waiting at {lane}")
    
    def change_light(self, lane):
        self.green_light = lane
        print(f"\nGreen light: {lane}")
        self.let_cars_pass()
    
    def let_cars_pass(self):
        lane = self.lanes[self.green_light]
        passed = 0
        while lane and passed < 3:  # Let 3 cars pass
            car = lane.popleft()
            print(f"  Car {car} passed")
            passed += 1

# Usage
traffic = TrafficLightSystem()
traffic.car_arrives('North', 'N1')
traffic.car_arrives('North', 'N2')
traffic.car_arrives('East', 'E1')
traffic.car_arrives('North', 'N3')

traffic.change_light('North')
traffic.change_light('East')
```

---

## 🎵 9. Media Streaming

### Audio/Video Buffer

```python
from collections import deque

class StreamBuffer:
    def __init__(self, buffer_size=10):
        self.buffer = deque(maxlen=buffer_size)
        self.is_buffering = True
    
    def add_chunk(self, chunk):
        self.buffer.append(chunk)
        if len(self.buffer) >= self.buffer.maxlen * 0.8:
            self.is_buffering = False
    
    def play_chunk(self):
        if not self.buffer:
            self.is_buffering = True
            print("Buffering...")
            return None
        
        chunk = self.buffer.popleft()
        print(f"Playing: {chunk}")
        return chunk
    
    def status(self):
        fill = (len(self.buffer) / self.buffer.maxlen) * 100
        print(f"Buffer: {fill:.0f}% full")

# Usage
player = StreamBuffer(buffer_size=5)
for i in range(7):
    player.add_chunk(f"Chunk-{i}")
player.status()
for _ in range(3):
    player.play_chunk()
player.status()
```

---

## 🏥 10. Simulation Systems

### Hospital Emergency Queue

```python
from collections import deque

class EmergencyRoom:
    def __init__(self):
        self.critical = deque()
        self.urgent = deque()
        self.normal = deque()
    
    def admit_patient(self, name, priority):
        patient = {'name': name, 'priority': priority}
        
        if priority == 'critical':
            self.critical.append(patient)
        elif priority == 'urgent':
            self.urgent.append(patient)
        else:
            self.normal.append(patient)
        
        print(f"Admitted: {name} ({priority})")
    
    def treat_next(self):
        if self.critical:
            patient = self.critical.popleft()
        elif self.urgent:
            patient = self.urgent.popleft()
        elif self.normal:
            patient = self.normal.popleft()
        else:
            print("No patients waiting")
            return
        
        print(f"Treating: {patient['name']} ({patient['priority']})")

# Usage
er = EmergencyRoom()
er.admit_patient("John", "normal")
er.admit_patient("Alice", "critical")
er.admit_patient("Bob", "urgent")
er.admit_patient("Eve", "critical")

er.treat_next()  # Alice (critical)
er.treat_next()  # Eve (critical)
er.treat_next()  # Bob (urgent)
```

---

## 🎯 Key Takeaways

✅ **Queues model real-world waiting scenarios**  
✅ **FIFO ensures fairness in processing**  
✅ **Essential for BFS algorithms**  
✅ **Used in OS, networking, and gaming**  
✅ **Foundation for many system designs**

---

## 🚀 Next Steps

1. **[Practice Problems →](./08-Practice-Problems.md)**
2. **Implement your own queue application**
3. **Study BFS in depth**
4. **Explore message queue systems**

---

**Key Takeaway:** Queues are everywhere in computer science - from OS scheduling to web servers to game engines! 🌟

[← Back: Priority Queue](./06-Priority-Queue-Introduction.md) | [Back to Chapter](./README.md) | [Next: Practice Problems →](./08-Practice-Problems.md)
