const searchInput = document.getElementById("search_input");

export function initializeSearch() {
    const searchBtn = document.getElementById("search_btn");

    searchBtn.onclick = function(event) {
        event.preventDefault();
        searchInput.style.display = "block";
        searchBtn.style.display = "none";
    }
}