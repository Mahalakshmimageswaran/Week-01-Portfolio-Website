var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fetch and display a motivational/developer quote
function fetchDevQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        const quoteEl = document.getElementById("quote");
        if (!quoteEl)
            return;
        try {
            quoteEl.textContent = "Loading quote...";
            // API to fetch random quote
            const response = yield fetch("https://dummyjson.com/quotes/random");
            const data = yield response.json();
            // Some APIs have different field names so we support all
            const quote = data.quote || data.text || data.content || "Stay motivated, keep coding!";
            const author = data.author || "Unknown";
            quoteEl.textContent = `"${quote}" — ${author}`;
        }
        catch (error) {
            quoteEl.textContent = "Could not load quote. Please try again.";
        }
    });
}
// Handle button click to refresh quote
function setupQuoteRefreshButton() {
    const btn = document.getElementById("refreshQuoteBtn");
    if (!btn)
        return;
    btn.addEventListener("click", () => {
        fetchDevQuote();
    });
}
// Run automatically when Dashboard loads
fetchDevQuote();
setupQuoteRefreshButton();
