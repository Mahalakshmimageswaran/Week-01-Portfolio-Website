// js/dashboard.js

const statTotalEl = document.getElementById("statTotal");
const statProgressEl = document.getElementById("statProgress");
const statTestingEl = document.getElementById("statTesting");
const statDoneEl = document.getElementById("statDone");

function getTickets() {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
}

// Expose for board.js
window.updateDashboardStats = function () {
  const tickets = getTickets();
  const total = tickets.length;
  const progress = tickets.filter((t) => t.status === "In Progress").length;
  const testing = tickets.filter((t) => t.status === "Testing").length;
  const done = tickets.filter((t) => t.status === "Done").length;

  if (statTotalEl) statTotalEl.textContent = total;
  if (statProgressEl) statProgressEl.textContent = progress;
  if (statTestingEl) statTestingEl.textContent = testing;
  if (statDoneEl) statDoneEl.textContent = done;
};

// Chart.js
let statusChartInstance = null;

window.renderStatusChart = function () {
  const ctx = document.getElementById("statusChart");
  if (!ctx) return;

  const tickets = getTickets();

  const counts = [
    tickets.filter((t) => t.status === "To Do").length,
    tickets.filter((t) => t.status === "In Progress").length,
    tickets.filter((t) => t.status === "Testing").length,
    tickets.filter((t) => t.status === "Done").length
  ];

  if (statusChartInstance) {
    statusChartInstance.destroy();
  }

  statusChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["To Do", "In Progress", "Testing", "Done"],
      datasets: [
        {
          data: counts,
          backgroundColor: ["#ef4444", "#3b82f6", "#facc15", "#22c55e"]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: "#e5e7eb",
            font: { size: 11 }
          }
        }
      }
    }
  });
};

// Run once on dashboard load
if (statTotalEl) {
  window.updateDashboardStats();
  window.renderStatusChart();
}
