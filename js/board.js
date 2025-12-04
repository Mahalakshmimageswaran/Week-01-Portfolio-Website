// js/board.js

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
    // keep column title (first child), remove ticket divs
    while (col.children.length > 1) {
      col.removeChild(col.lastChild);
    }
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
        <span class="text-[10px] bg-black bg-opacity-20 px-1 rounded">
          ${t.type}
        </span>
      </div>
      <div class="ticket-meta mt-1">
        ${t.priority} ${t.assignee ? "• " + t.assignee : ""}
      </div>
    `;

    card.addEventListener("click", () => {
      advanceTicketStatus(t.id);
    });

    const col = columns[t.status] || columns["To Do"];
    col.appendChild(card);
  });
}

function advanceTicketStatus(id) {
  const tickets = boardLoadTickets();
  const updated = tickets.map((t) => {
    if (t.id === id) {
      const currentIndex = STATUS_FLOW.indexOf(t.status);
      const nextIndex = (currentIndex + 1) % STATUS_FLOW.length;
      t.status = STATUS_FLOW[nextIndex];
    }
    return t;
  });

  boardSaveTickets(updated);
  renderBoard();

  // Also update stats & chart if those functions exist
  if (window.updateDashboardStats) {
    window.updateDashboardStats();
  }
  if (window.renderStatusChart) {
    window.renderStatusChart();
  }
}

// run only on dashboard page
if (columns["To Do"]) {
  renderBoard();
}
