
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

  //Get the  stored user from the local storage using JOIN.Parse() method of arrays.
  const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

  const isAdmin = (username === 'admin' && password === 'admin1234');
  const isRegisteredUser = (storedUser && username === storedUser.name);

  if (isAdmin || isRegisteredUser) {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
  } else {
    if (wrongDetailsArea) {
      wrongDetailsArea.textContent = "Wrong username or password. Please try again.";
    }
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



// 1. My image array
const sliderImages = [
  'images/pexels-fauxels-3184460.jpg',
    'images/pankaj-patel-u2Ru4QBXA5Q-unsplash.jpg',
    'images/pexels-technobulka-8022861.jpg',
    'images/pexels-pixabay-356056.jpg',
    'images/pexels-arina-krasnikova-5712529.jpg'
];

let currentIndex = 0;
const wrapper = document.getElementById('slider-wrapper');

// 2. Function to build the slider HTML
function initSlider() {
    if (!wrapper) return;
    
    // Inject images from the array
    wrapper.innerHTML = sliderImages.map(img => `<img src="${img}" alt="Campus">`).join('');
}

// 3. Function to move the slider
function moveSlider() {
    // We move the wrapper to the left by 100% multiplied by the index
    const offset = -currentIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
}

// 4. Event Listeners for buttons
document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentIndex++;
    // Loop back to start if at the end
    if (currentIndex >= sliderImages.length) {
        currentIndex = 0;
    }
    moveSlider();
});

document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentIndex--;
    // Go to end if at the start
    if (currentIndex < 0) {
        currentIndex = sliderImages.length - 1;
    }
    moveSlider();
});

setInterval(() => {
    document.getElementById('nextBtn').click();
}, 5000);

// Initialize on load
initSlider();



const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const icon = hamburger.querySelector('i'); // Get the <i> tag inside

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // 1. Slide the menu
        navLinks.classList.toggle('active');
        
        // 2. Change the icon
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });
}