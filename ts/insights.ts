// Fetch and display a motivational/developer quote
async function fetchDevQuote(): Promise<void> {
  const quoteEl = document.getElementById("quote") as HTMLElement | null;
  if (!quoteEl) return;

  try {
    quoteEl.textContent = "Loading quote...";

    // API to fetch random quote
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();

    // Some APIs have different field names so we support all
    const quote =
      data.quote || data.text || data.content || "Stay motivated, keep coding!";
    const author = data.author || "Unknown";

    quoteEl.textContent = `"${quote}" — ${author}`;
  } catch (error) {
    quoteEl.textContent = "Could not load quote. Please try again.";
  }
}

// Handle button click to refresh quote
function setupQuoteRefreshButton(): void {
  const btn = document.getElementById("refreshQuoteBtn") as HTMLElement | null;
  if (!btn) return;

  btn.addEventListener("click", () => {
    fetchDevQuote();
  });
}

// Run automatically when Dashboard loads
fetchDevQuote();
setupQuoteRefreshButton();
