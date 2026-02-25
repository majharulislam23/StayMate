# StayMate — Production Observability Stack

> **Prometheus + Grafana + Micrometer** monitoring for the StayMate Spring Boot backend.

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        OBSERVABILITY STACK                          │
│                                                                     │
│  ┌──────────────┐         ┌──────────────┐       ┌──────────────┐  │
│  │  Spring Boot  │ scrape  │  Prometheus  │ query │   Grafana    │  │
│  │  + Micrometer ├────────►│  (TSDB)      ├──────►│  (Dashboard) │  │
│  │  :8080        │  /act/  │  :9090       │ PromQL│  :3001       │  │
│  │              │ prometh.│              │       │              │  │
│  └──────┬───────┘         └──────┬───────┘       └──────────────┘  │
│         │                        │                                  │
│    Micrometer                Time-series                            │
│    MeterRegistry             storage (15d)                          │
│         │                        │                                  │
│    ┌────▼────┐                   │                                  │
│    │ Counters │                   │                                  │
│    │ Timers   │                   │                                  │
│    │ Gauges   │                   │                                  │
│    └─────────┘                   │                                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Concepts

| Concept | Explanation |
|---------|-------------|
| **Scraping** | Prometheus **pulls** metrics from your app every 10–15s by hitting `GET /actuator/prometheus`. This is the opposite of "push" — your app doesn't need to know about Prometheus. |
| **Time-series** | Each metric is a named value with labels, stored with a timestamp. Example: `staymate_api_requests_total{type="all"} 42 @1708900000`. |
| **PromQL** | Grafana uses PromQL (Prometheus Query Language) to query time-series data, e.g., `rate(staymate_api_requests_total[1m])` gives requests-per-second. |
| **Micrometer** | A vendor-neutral metrics facade for Java. It's the `SLF4J` of metrics — write once, export to Prometheus, Datadog, CloudWatch, etc. |

---

## 2. Folder Structure

```
monitoring/
├── docker-compose.yml                          # Prometheus + Grafana containers
├── prometheus/
│   └── prometheus.yml                          # Scrape targets & intervals
├── grafana/
│   ├── provisioning/
│   │   ├── datasources/
│   │   │   └── datasource.yml                  # Auto-connect Prometheus
│   │   └── dashboards/
│   │       └── dashboard.yml                   # Dashboard file provider
│   └── dashboards/
│       └── staymate-overview.json              # Pre-built dashboard (7 panels)
└── README.md                                   # This file
```

**Spring Boot changes** (in `server/`):

| File | Change |
|------|--------|
| `pom.xml` | Added `micrometer-registry-prometheus` |
| `application.properties` | Exposed `metrics`, `prometheus` actuator endpoints |
| `SecurityConfig.java` | Whitelisted `/actuator/prometheus` and `/actuator/metrics/**` |
| `MetricsConfig.java` | Custom counters: requests, errors, bookings, properties |
| `MetricsInterceptor.java` | Auto-records request count, errors, and latency per endpoint |
| `WebMvcConfig.java` | Registers the interceptor for `/api/**` paths |

---

## 3. Setup Steps

### Prerequisites

- Docker & Docker Compose installed
- Spring Boot backend running on port **8080** (locally or via Docker)

### Step 1 — Start the Spring Boot Backend

```bash
# Option A: Maven (local development)
cd server
./mvnw spring-boot:run

# Option B: Docker Compose (full stack)
docker-compose up -d server
```

### Step 2 — Verify the Prometheus Endpoint

```bash
curl http://localhost:8080/actuator/prometheus
```

You should see a large text response with metrics like:

```
# HELP jvm_memory_used_bytes The amount of used memory
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="heap",id="G1 Eden Space",} 2.5165824E7
...
# HELP staymate_api_requests_total Total number of API requests received
# TYPE staymate_api_requests_total counter
staymate_api_requests_total{application="staymate",type="all",} 0.0
```

### Step 3 — Start the Monitoring Stack

```bash
cd monitoring
docker-compose up -d
```

### Step 4 — Verify Prometheus Targets

Open [http://localhost:9090/targets](http://localhost:9090/targets)

The `staymate-backend` target should show status **UP** (green).

### Step 5 — Open Grafana Dashboard

1. Open [http://localhost:3001](http://localhost:3001)
2. Login: **admin / admin** (skip password change)
3. Navigate to **Dashboards** → **StayMate Overview**
4. The dashboard auto-loads with live panels

---

## 4. Dashboard Panels

| Panel | PromQL Query | Description |
|-------|-------------|-------------|
| Requests Per Second | `rate(staymate_api_requests_total[1m])` | Overall API throughput |
| HTTP Latency | `histogram_quantile(0.95, rate(staymate_api_latency_seconds_bucket[5m]))` | p50/p95/p99 response times |
| Error Rate | `rate(staymate_api_errors_total[1m])` | 4xx/5xx errors per second |
| JVM Heap Memory | `jvm_memory_used_bytes{area="heap"}` | Heap usage by memory pool |
| CPU Usage | `process_cpu_usage` | Process CPU utilization gauge |
| Properties Created | `staymate_property_created_total` | Business metric counter |
| Bookings Created | `staymate_booking_created_total` | Business metric counter |

---

## 5. Adding Custom Metrics

To add a new business metric (e.g., "user registrations"), inject the `MeterRegistry` and create a counter:

```java
@Service
@RequiredArgsConstructor
public class AuthService {

    private final MeterRegistry meterRegistry;

    public AuthResponse register(RegisterRequest request) {
        // ... registration logic ...

        // Increment the custom counter
        meterRegistry.counter("staymate_user_registrations_total").increment();

        return response;
    }
}
```

The counter appears instantly at `/actuator/prometheus` and becomes queryable in Grafana.

---

## 6. Production Best Practices

| Practice | Implementation |
|----------|----------------|
| **Restrict actuator endpoints** | In production, remove `/actuator/prometheus` from `permitAll()` and use network-level restrictions (VPC, internal load balancer) |
| **Use environment-specific configs** | `application-prod.yml` should set `management.endpoint.health.show-details=never` |
| **Label conventions** | Use lowercase with underscores (`staymate_api_requests_total`), prefix with app name |
| **Avoid high cardinality** | Never use raw user IDs or session IDs as metric labels. The `MetricsInterceptor` collapses `/api/properties/42` → `/api/properties/{id}` |
| **Retention tuning** | Default is 15 days. Adjust `--storage.tsdb.retention.time` in `docker-compose.yml` |
| **Alerting** | Use Prometheus Alertmanager for SLA-based alerts (see Bonus section) |

---

## 7. Troubleshooting

| Problem | Solution |
|---------|----------|
| Prometheus target shows **DOWN** | Ensure Spring Boot is running on port 8080 and `curl localhost:8080/actuator/prometheus` returns data |
| `connection refused` in Prometheus | On macOS, Docker needs `host.docker.internal`. On Linux, use `--network=host` or the container's IP |
| Grafana shows "No data" | Check the datasource is correctly provisioned at Grafana → Settings → Data Sources → Prometheus |
| Custom metrics missing | Ensure the counter was `.register(registry)` and the endpoint was hit at least once |
| `401 Unauthorized` on `/actuator/prometheus` | Verify `SecurityConfig.java` includes `/actuator/prometheus` in the `permitAll()` matchers |

---

## 8. Bonus — Extending the Stack

### Alertmanager (Slack Alerts)

```yaml
# Add to monitoring/docker-compose.yml
alertmanager:
  image: prom/alertmanager:v0.27.0
  ports:
    - "9093:9093"
  volumes:
    - ./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml
```

```yaml
# monitoring/alertmanager/alertmanager.yml
route:
  receiver: "slack"
receivers:
  - name: "slack"
    slack_configs:
      - api_url: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
        channel: "#alerts"
        title: "StayMate Alert"
```

### Kubernetes Deployment

Use the [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) Helm chart:

```bash
helm install monitoring prometheus-community/kube-prometheus-stack \
  --set grafana.adminPassword=admin
```

Add a `ServiceMonitor` to auto-discover the Spring Boot pod's `/actuator/prometheus`.

### OpenTelemetry Tracing

Add distributed tracing alongside metrics:

```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-tracing-bridge-otel</artifactId>
</dependency>
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-exporter-otlp</artifactId>
</dependency>
```

Export traces to Jaeger or Tempo for full request tracing across services.

---

## Quick Reference

```bash
# Start everything
docker-compose up -d                     # StayMate app stack
cd monitoring && docker-compose up -d    # Monitoring stack

# Endpoints
curl localhost:8080/actuator/prometheus   # Raw metrics
open http://localhost:9090/targets        # Prometheus targets
open http://localhost:3001                # Grafana (admin/admin)

# Stop monitoring
cd monitoring && docker-compose down
```
