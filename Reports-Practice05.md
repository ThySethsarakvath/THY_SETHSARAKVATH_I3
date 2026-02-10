# Lab Report: Scalability and Performance in Kubernetes
**Name:** Thy Sethasarakvath
**Course:** Software Engineering Architectures  
**Namespace:** `kubernet-lab`

---

## Part A: SLO/SLI Definition and Baseline Measurement

### A1: Service Level Objectives (SLO)
- **SLO:** 95% of requests (P95) must have a latency of < 300ms under a load of 50–200 concurrent users.  
- **SLIs Measured:**  
  - P50 / P95 / P99 latency  
  - Throughput (Requests Per Second)  
  - Error Rate  

### A2 & A3: Baseline Results
Using `kennethreitz/httpbin` and the `wrk` load generator under 50 concurrent users:

| Metric       | Value       |
|--------------|-------------|
| Throughput   | 924.01 RPS  |
| Avg Latency  | 61.74 ms    |
| Max Latency  | 674.57 ms   |
| Replicas     | 2           |

**Analysis:**  
- Average latency is well within the 300ms SLO.  
- Max latency (674ms) suggests tail latency could become problematic as load increases.  

![Alt text](screenshot\A2.png)
![Alt text](screenshot\A3.png)


---

## Part B: Stability – Probes and Graceful Behavior

### Checkpoint B: Explanation of Probes
- **Readiness Probe:** Ensures the pod is fully started and ready before receiving traffic. Prevents `502 Bad Gateway` errors during rollouts.  
- **Liveness Probe:** Monitors application health. If the container freezes or becomes unresponsive, Kubernetes restarts it to maintain availability.  

![Alt text](screenshot\B.png)

---

## Part C: Horizontal Pod Autoscaling (HPA)

### Checkpoint C: Scaling Results
- **Setup:** Enabled `metrics-server` and applied HPA with a 60% CPU target.  
- **Observation:** Under 200 concurrent users, CPU usage spiked to 390%.  
- **Scaling Behavior:**  
  - Initial Replicas: 2  
  - Final Replicas: 10 (max limit reached)  
- **Stress Latency:** 222.31 ms (average)  

**Why HPA helped:**  
HPA distributed load across 10 pods instead of 2, preventing crashes and keeping latency under the 300ms SLO. Without HPA, latency would likely have climbed into seconds.  

![Alt text](screenshot\C1.png)
![Alt text](screenshot\C2.png)

---

## Part D: Load Balancing Behavior

### Checkpoint D: Service Distribution
- Deployed the `whoami` service. Each browser refresh returned a different pod hostname.  
- **Explanation:**  
  - A Kubernetes Service provides a stable entry point (Virtual IP).  
  - Uses round-robin distribution to balance traffic across pods.  
  - Prevents any single pod from being overwhelmed.  

![Alt text](screenshot\D.png)

---

## Part E: Performance Improvement with Caching

### Checkpoint E: Caching Results
Implemented a **Cache-Aside (Lazy Loading)** pattern using Redis.

| Metric              | Baseline (Part A) | Cached API (Part E) |
|---------------------|-------------------|---------------------|
| Throughput          | 924.01 RPS        | 5922.09 RPS         |
| Avg Latency         | 61.74 ms          | 25.37 ms            |
| Resource Efficiency | 10 pods (stressed)| 1 pod (efficient)   |

**Why caching helped:**  
- Reduced expensive work (simulated 500ms delay).  
- Only the first request every 10s (TTL) was slow.  
- Subsequent ~59,000 requests served directly from Redis memory.  
- Result: Drastically higher throughput and lower latency.  

**TTL and Eviction:**  
- TTL set to 10 seconds.  
- Prevents stale data persisting indefinitely.  
- Cache refreshes after expiration, ensuring consistency with source of truth.  

![Alt text](screenshot\E1.png)
![Alt text](screenshot\E2.png)
![Alt text](screenshot\E3.png)

---

## Conclusion
- **Horizontal Scaling (HPA):** Essential for handling high traffic volumes and maintaining availability.  
- **Caching (Redis):** Most effective optimization for request performance, reducing system load and improving efficiency.  
