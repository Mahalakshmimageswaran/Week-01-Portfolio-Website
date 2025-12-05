var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchDevQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        const quoteEl = document.getElementById("quote");
        if (!quoteEl)
            return;
        try {
            quoteEl.textContent = "Loading quote...";
            const res = yield fetch("https://dummyjson.com/quotes/random");
            const data = yield res.json();
            const quote = data.quote || data.text || data.content || "Stay motivated, keep coding!";
            const author = data.author || "Unknown";
            quoteEl.textContent = `"${quote}" — ${author}`;
        }
        catch (_a) {
            quoteEl.textContent = "Could not load quote. Please try again.";
        }
    });
}
function setupQuoteRefreshButton() {
    const btn = document.getElementById("refreshQuoteBtn");
    if (!btn)
        return;
    btn.addEventListener("click", fetchDevQuote);
}
fetchDevQuote();
setupQuoteRefreshButton();
