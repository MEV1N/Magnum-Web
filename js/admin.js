// Admin Login Functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check credentials (username: Magnum, password: magnum@mbc)
        if (username === 'Magnum' && password === 'magnum@mbc') {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.style.display = 'block';
        }
    });
});

// Sample admin data
const adminArticles = [
    {
        id: 1,
        title: "College Fest 2023 Announced",
        category: "Events",
        status: "published",
        date: "May 15, 2023"
    },
    {
        id: 2,
        title: "New Computer Lab Inaugurated",
        category: "Academic",
        status: "published",
        date: "May 10, 2023"
    },
    {
        id: 3,
        title: "Basketball Team Wins Championship",
        category: "Sports",
        status: "published",
        date: "May 5, 2023"
    },
    {
        id: 4,
        title: "Upcoming Alumni Meet",
        category: "Events",
        status: "draft",
        date: "May 1, 2023"
    }
];

// Dashboard functionality
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Update stats
        updateDashboardStats();
        renderArticlesTable();
        
        // Logout button
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
        
        // Add article button
        const addArticleBtn = document.getElementById('addArticleBtn');
        if (addArticleBtn) {
            addArticleBtn.addEventListener('click', () => {
                window.location.href = 'new-article.html';
            });
        }
    });
}

// New article functionality
if (window.location.pathname.includes('new-article.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const articleForm = document.getElementById('articleForm');
        
        articleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const category = document.getElementById('category').value;
            const content = document.getElementById('content').value;
            const status = document.querySelector('input[name="status"]:checked').value;
            
            if (!title || !category || !content) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create new article
            const newArticle = {
                id: adminArticles.length + 1,
                title,
                category,
                status,
                date: new Date().toLocaleDateString()
            };
            
            // Add to admin articles
            adminArticles.unshift(newArticle);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    });
}

// Function to update dashboard statistics
function updateDashboardStats() {
    const totalArticles = adminArticles.length;
    const publishedArticles = adminArticles.filter(article => article.status === 'published').length;
    const draftArticles = adminArticles.filter(article => article.status === 'draft').length;
    
    document.getElementById('totalArticles').textContent = totalArticles;
    document.getElementById('publishedArticles').textContent = publishedArticles;
    document.getElementById('draftArticles').textContent = draftArticles;
}

// Function to render articles table
function renderArticlesTable() {
    const articlesTable = document.getElementById('articlesTable');
    if (!articlesTable) return;
    
    // Clear existing rows
    articlesTable.innerHTML = '';
    
    // Add header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Title</th>
        <th>Category</th>
        <th>Status</th>
        <th>Date</th>
        <th>Actions</th>
    `;
    articlesTable.appendChild(headerRow);
    
    // Get articles from Firestore
    db.collection("articles").orderBy("createdAt", "desc").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const article = doc.data();
                const row = document.createElement('tr');
                row.dataset.id = doc.id;
                
                row.innerHTML = `
                    <td>${article.title}</td>
                    <td>${article.category}</td>
                    <td><span class="status-${article.status}">${article.status}</span></td>
                    <td>${article.date}</td>
                    <td>
                        <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
                        <button class="action-btn publish-btn" ${article.status === 'published' ? 'disabled' : ''}>
                            <i class="fas fa-upload"></i>
                        </button>
                    </td>
                `;
                articlesTable.appendChild(row);
            });
        })
        .catch((error) => {
            console.log("Error getting articles: ", error);
        });
}

// Initialize Firebase (add your config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_BUCKET.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Modify your article submission:
articleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const article = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        content: document.getElementById('content').value,
        status: document.querySelector('input[name="status"]:checked').value,
        date: new Date().toLocaleDateString(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Save to Firestore
    try {
        await db.collection('articles').add(article);
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Error saving article: ", error);
    }
});