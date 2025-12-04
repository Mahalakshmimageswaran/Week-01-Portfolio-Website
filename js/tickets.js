// js/tickets.js

const ticketForm = document.getElementById("ticketForm");
const recentTicketsContainer = document.getElementById("recentTickets");

function loadTickets() {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
}

function saveTickets(tickets) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function renderRecentTickets() {
  const tickets = loadTickets();
  recentTicketsContainer.innerHTML = "";

  if (tickets.length === 0) {
    recentTicketsContainer.innerHTML =
      '<p class="text-gray-400 text-sm">No tickets created yet.</p>';
    return;
  }

  const latest = tickets.slice(-5).reverse();

  latest.forEach((t) => {
    const div = document.createElement("div");
    div.className = "border-b pb-1 mb-1 flex justify-between items-center";
    div.innerHTML = `
      <div>
        <p class="font-medium text-gray-800">${t.title}</p>
        <p class="text-xs text-gray-500">
          ${t.type} • ${t.priority} • ${t.status}
        </p>
      </div>
      <span class="text-[10px] px-2 py-1 rounded bg-blue-100 text-blue-700">
        #${t.id.toString().slice(-4)}
      </span>
    `;
    recentTicketsContainer.appendChild(div);
  });
}

if (ticketForm) {
  ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const type = document.getElementById("type").value;
    const priority = document.getElementById("priority").value;
    const assignee = document.getElementById("assignee").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title) {
      alert("Title is required.");
      return;
    }

    const tickets = loadTickets();

    const newTicket = {
      id: Date.now(),
      title,
      type,
      priority,
      assignee,
      description,
      status: "To Do",
      createdAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    saveTickets(tickets);

    ticketForm.reset();
    alert("Ticket created successfully!");
    renderRecentTickets();
  });
}

if (recentTicketsContainer) {
  renderRecentTickets();
}
