
if (localStorage.getItem('isLoggedIn') !== 'true') {
  if (!window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
  }
}

const courses = [
  {courseName: 'Bachelors of Science and Education', campus: 'Nagongera', studyHours: 'Day'},
  {courseName: 'Bachelors of Computer Science', campus: 'Nagongera', studyHours: 'Day'}
];

const coursesSection = document.querySelector('.online-courses-section');
const learningSection = document.getElementById('learning-section');
learningSection.addEventListener('click', () => {
  loadCourses();
});

async function loadCourses() {
  if(!coursesSection) return;
 if(coursesSection.classList.contains('show')) {
  coursesSection.classList.remove('show');

  setTimeout(() => {
    coursesSection.innerHTML = '';
  }, 500);
  return;
 }
  coursesSection.innerHTML = 'loading';
  try {
  const results = await fetch('courses.html');
  if(!results.ok) {
    throw new Error('Error found');
  }

  const coursesDiv = await results.text();
  coursesSection.innerHTML = coursesDiv;

  setTimeout(() => {
    coursesSection.classList.add('show')
  }, 10);

  } catch (err) {
    console.error("Failed to load the page content", err);
    coursesSection.innerHTML = "Failed to load the Courses, Refresh and try again";
  }

}

// 2. Element Selection
const profileButton = document.getElementById('profile-btn');
const lectureBtn = document.getElementById('js-lectureBtn');
const timeTableButton = document.getElementById('js-time-table-btn');
const courseUnitsBtn = document.getElementById('js-course-unit-btn');
const logoutBtn = document.getElementById('js-logout-btn');
const loginButton = document.getElementById('js-login-button');
const academicsLink = document.getElementById('academics');
const aboutLink = document.getElementById('about');
const faqsLink = document.getElementById('faqs');
const blogLink = document.getElementById('blog');


if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Stops the page from refreshing
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) { // Using the variable name we created above
      localStorage.removeItem('isLoggedIn');
      window.location.href = 'login.html';
    }
  });
}


if (lectureBtn) {
  lectureBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('lectures');
  });
}

if (profileButton) {
  profileButton.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('profile');
  });
}

if (timeTableButton) {
  timeTableButton.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('timeTable');
  });
}

if (courseUnitsBtn) {
  courseUnitsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('courseunit');
  });
}

if (loginButton) {
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  });
}

if (academicsLink) {
  academicsLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('academics');
  });
}

if (aboutLink) {
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('about');
  });
}

if (faqsLink) {
  faqsLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('faqs');
  });
}

if (blogLink) {
  blogLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadPage('blog');
  });
}

// 5. Search Logic (Wrapped in an IF to prevent crashing if input is missing)
const searchInput = document.querySelector('.js-search-input');
if (searchInput) {
  let userSearch = searchInput.value;
}

// 6. Login Function 
function handleLogin() {
  const username = document.getElementById("js-username").value;
  const password = document.getElementById('js-password').value;
  const wrongDetailsArea = document.getElementById('wrong-details');

  if (username === 'admin' && password === 'admin1234') {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
  } else {
    wrongDetailsArea.textContent = "Invalid credentials entered!";
  }
}

// 7. Async Load Function 
async function loadPage(pageName) {
  const container = document.getElementById('main-container');
  
  if (!container) return; // Safety check

  container.innerHTML = 'Loading...';

  try {
    const response = await fetch(`${pageName}.html`);
    
    if (!response.ok) {
      throw new Error('File not found'); 
    }

    const html = await response.text();
    container.innerHTML = html;
    
  } catch (err) {
    console.error("Failed to load Page", err);
    container.innerHTML = "Error: Could not load the page content.";
  }
}