const statTotalEl = document.getElementById("statTotal");
const statProgressEl = document.getElementById("statProgress");
const statTestingEl = document.getElementById("statTesting");
const statDoneEl = document.getElementById("statDone");

function getTickets() {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
}

window.updateDashboardStats = function () {
  const tickets = getTickets();
  statTotalEl.textContent = tickets.length;
  statProgressEl.textContent = tickets.filter((t) => t.status === "In Progress").length;
  statTestingEl.textContent = tickets.filter((t) => t.status === "Testing").length;
  statDoneEl.textContent = tickets.filter((t) => t.status === "Done").length;
};

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

  if (statusChartInstance) statusChartInstance.destroy();
  statusChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["To Do", "In Progress", "Testing", "Done"],
      datasets: [{ data: counts, backgroundColor: ["#ef4444", "#3b82f6", "#facc15", "#22c55e"] }]
    },
    options: { responsive: true }
  });
};

if (statTotalEl) {
  updateDashboardStats();
  renderStatusChart();
}
