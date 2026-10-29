const posts = [
    {
        id: 1,
        title: "Learn JavaScript Step by Step",
        category: "Tech",
        date: "2026-01-10",
        description: "A simple roadmap to start learning JavaScript from zero.",
        image: "image/javascript.jpg"
    },
    {
        id: 2,
        title: "A Trip to Dahab",
        category: "Travel",
        date: "2026-01-18",
        description: "My unforgettable weekend by the Red Sea.",
        image: "image/dahab.jpg"
    },
    {
        id: 3,
        title: "Best Pasta in Cairo",
        category: "Food",
        date: "2026-01-25",
        description: "Where to find the most delicious pasta in town.",
        image: "image/pasta.jpg"
    },
    {
        id: 4,
        title: "Why I Love CSS Grid",
        category: "Tech",
        date: "2026-02-02",
        description: "How Grid changed the way I build layouts.",
        image: "image/css-grid.jpg"
    },
    {
        id: 5,
        title: "Exploring Alexandria",
        category: "Travel",
        date: "2026-02-10",
        description: "A day walking along the Mediterranean coast.",
        image: "image/alexandria.jpg"
    },
    {
        id: 6,
        title: "Homemade Pizza Recipe",
        category: "Food",
        date: "2026-02-18",
        description: "An easy pizza recipe you can make in your kitchen.",
        image: "image/pizza.jpg"
    },
    {
        id: 7,
        title: "Git and GitHub for Beginners",
        category: "Tech",
        date: "2026-02-26",
        description: "Everything you need to publish your first project.",
        image: "image/github.jpg"
    },
    {
        id: 8,
        title: "Sunrise at Mount Sinai",
        category: "Travel",
        date: "2026-03-05",
        description: "The hike that I will never forget.",
        image: "image/sinai.jpg"
    },
    {
        id: 9,
        title: "Street Food Favorites",
        category: "Food",
        date: "2026-03-12",
        description: "My top picks for cheap and tasty street food.",
        image: "image/street-food.jpg"
    },
    {
        id: 10,
        title: "5 VS Code Tips You Should Know",
        category: "Tech",
        date: "2026-03-20",
        description: "Small tricks that make coding faster and easier.",
        image: "image/vscode.jpg"
    }
];


const postsGrid = document.getElementById("posts-grid");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");


let currentCategory = "All";
let currentPage = 1;
let searchTerm = "";
const postsPerPage = 6;


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


function renderPosts(postsToShow) {
    postsGrid.innerHTML = "";

    
    if (postsToShow.length === 0) {
        postsGrid.innerHTML = `<p class="no-results">No posts found.</p>`;
        return;
    }

    postsToShow.forEach((post) => {
        postsGrid.innerHTML += `
            <article class="post-card">
                <img src="${post.image}" alt="${post.title}"
                     onerror="this.onerror=null; this.src='https://picsum.photos/seed/post${post.id}/400/250'">
                <div class="post-body">
                    <span class="post-category">${post.category}</span>
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                    <span class="post-date">${formatDate(post.date)}</span>
                </div>
            </article>
        `;
    });
}


function getFilteredPosts() {
    return posts.filter((post) => {
        const matchesCategory =
            currentCategory === "All" || post.category === currentCategory;

        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });
}


function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    pagination.innerHTML = "";

    
    if (totalPages <= 1) {
        return;
    }

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement("button");
        button.textContent = page;
        button.classList.add("page-btn");

        if (page === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            currentPage = page;
            updatePage();
        });

        pagination.appendChild(button);
    }
}


function updatePage() {
    const filteredPosts = getFilteredPosts();

    
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsOnThisPage = filteredPosts.slice(start, end);

    renderPosts(postsOnThisPage);
    renderPagination(filteredPosts.length);
}


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
       
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        
        currentCategory = button.dataset.category;
        currentPage = 1;
        updatePage();
    });
});


searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim();
    currentPage = 1;
    updatePage();
});


updatePage();