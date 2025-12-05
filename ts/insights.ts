async function fetchDevQuote() {
  const quoteEl = document.getElementById("quote");
  if (!quoteEl) return;
  try {
    quoteEl.textContent = "Loading quote...";
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    const quote = data.quote || data.text || data.content || "Stay motivated, keep coding!";
    const author = data.author || "Unknown";
    quoteEl.textContent = `"${quote}" — ${author}`;
  } catch {
    quoteEl.textContent = "Could not load quote. Please try again.";
  }
}
function setupQuoteRefreshButton() {
  const btn = document.getElementById("refreshQuoteBtn");
  if (!btn) return;
  btn.addEventListener("click", fetchDevQuote);
}
fetchDevQuote();
setupQuoteRefreshButton();
