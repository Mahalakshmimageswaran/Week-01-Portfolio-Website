const columns = {
  "To Do": document.getElementById("todo"),
  "In Progress": document.getElementById("progress"),
  Testing: document.getElementById("testing"),
  Done: document.getElementById("done")
};

const STATUS_FLOW = ["To Do", "In Progress", "Testing", "Done"];

function boardLoadTickets() {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
}
function boardSaveTickets(tickets) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function clearColumns() {
  Object.values(columns).forEach((col) => {
    while (col.children.length > 1) col.removeChild(col.lastChild);
  });
}

function renderBoard() {
  const tickets = boardLoadTickets();
  clearColumns();

  tickets.forEach((t) => {
    const card = document.createElement("div");
    card.className = "ticket-card";
    card.innerHTML = `
      <div class="flex justify-between items-center">
        <span>${t.title}</span>
        <span class="text-[10px] bg-black bg-opacity-20 px-1 rounded">${t.type}</span>
      </div>
      <div class="ticket-meta mt-1">${t.priority}${t.assignee ? " • " + t.assignee : ""}</div>
    `;

    card.addEventListener("click", () => advanceTicketStatus(t.id));
    (columns[t.status] || columns["To Do"]).appendChild(card);
  });
}

function advanceTicketStatus(id) {
  const tickets = boardLoadTickets();
  const updated = tickets.map((t) => {
    if (t.id === id) {
      const currentIndex = STATUS_FLOW.indexOf(t.status);
      t.status = STATUS_FLOW[(currentIndex + 1) % STATUS_FLOW.length];
    }
    return t;
  });

  boardSaveTickets(updated);
  renderBoard();
  if (window.updateDashboardStats) window.updateDashboardStats();
  if (window.renderStatusChart) window.renderStatusChart();
}

if (columns["To Do"]) renderBoard();
