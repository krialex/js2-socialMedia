export function initializeSearch() {
    const searchInput = document.getElementById("search_input");
    const searchBtn = document.getElementById("search_btn");

    searchBtn.onclick = function(event) {
        event.preventDefault();
        searchInput.style.display = "block";
        searchBtn.style.display = "none";
    }
}