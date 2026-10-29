
const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    const isCollapsed = sidebar.classList.contains("collapsed");
    toggleBtn.setAttribute("aria-expanded", String(!isCollapsed));
    toggleBtn.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
});