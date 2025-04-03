// In main.js, replace the empty newsData with:
const newsData = [
    {
        title: "College Fest 2023 Announced",
        category: "Events",
        date: "May 15, 2023",
        excerpt: "Annual college festival scheduled for next month",
        image: "images/sample-news1.jpg"
    },
    // Add more sample articles as needed
];

function renderNewsCards() {
    const container = document.getElementById('news-container');
    
    if (newsData.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <img src="images/empty-news.svg" alt="No news">
                <h3>No News Articles Yet</h3>
                <p>Stay tuned for the latest updates</p>
            </div>`;
        return;
    }

    container.innerHTML = newsData.map(article => `
        <div class="news-card">
            <div class="news-img">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="news-content">
                <span class="news-category">${article.category}</span>
                <h3 class="news-title">${article.title}</h3>
                <p class="news-excerpt">${article.excerpt}</p>
                <div class="news-meta">
                    <span>${article.date}</span>
                    <span>Read More</span>
                </div>
            </div>
        </div>
    `).join('');
}
// Render empty state
function renderNewsCards() {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `
        <div class="empty-state">
            <img src="images/empty-news.svg" alt="No news">
            <h3>No News Articles Yet</h3>
            <p>Stay tuned for the latest updates from our college community.</p>
            <a href="admin/index.html" class="btn">Admin Login</a>
        </div>
    `;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderNewsCards();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderNewsCards();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
});


// Initialize Firebase (same config as admin.js)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function renderNews(news) {
  const container = document.getElementById("newsContainer");
  container.innerHTML = news
    .map(
      (item) => `
      <div class="news-item">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <small>${new Date(item.timestamp?.toDate()).toLocaleString()}</small>
      </div>
    `
    )
    .join("");
}

// Fetch news in real-time
db.collection("news")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    const news = [];
    snapshot.forEach((doc) => news.push({ id: doc.id, ...doc.data() }));
    renderNews(news);
  });