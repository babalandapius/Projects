const overlay = document.getElementById('register-overlay');
const newAccountBtn = document.getElementById('js-new-account');

newAccountBtn.addEventListener('click', () => {
  overlay.classList.replace('overlay-hidden','overlay-show');
});

function closeRegister() {
  overlay.classList.replace('overlay-show','overlay-hidden');
}

function registerUser() {
    const user = document.getElementById('js-username').value;
    const mail = document.getElementById('js-email').value;
    const pass = document.getElementById('js-password').value;


  if(user === '' || mail === '' || pass === '') {
    alert("All Input fields should be filled");
  } else {
      const userData = {
      username: user,
      password: pass
    };
    localStorage.setItem('regpsteredUser', JSON.stringify(userData));

    alert('Registration Success! you can Login In');
    closeRegister();
  }
}