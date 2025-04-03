// Import Firebase services (add these to your HTML before admin.js)
// <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore-compat.js"></script>

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC84Fku9yGNXNi8G6uabDn4eukfb7LLQqo",
    authDomain: "magnum-news-1d34e.firebaseapp.com",
    projectId: "magnum-news-1d34e",
    storageBucket: "magnum-news-1d34e.appspot.com",
    messagingSenderId: "731391931325",
    appId: "1:731391931325:web:668465a5d2b25fcdee18d4",
    measurementId: "G-QKG7D7JFDC"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Login Functionality
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginStatus = document.getElementById('loginStatus');
        
        // Simple hardcoded credentials check
        if (username === "Magnum" && password === "magnum@mbc") {
          loginStatus.textContent = "Login successful! Redirecting...";
          loginStatus.style.color = "green";
          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 1500);
        } else {
          loginStatus.textContent = "Invalid username or password.";
          loginStatus.style.color = "red";
        }
      });
    }
  });
  
  // Rest of your existing code for dashboard, articles, etc...