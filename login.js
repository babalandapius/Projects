    const overlay = document.getElementById('register-overlay');
    const newAccountBtn = document.getElementById('js-new-account');

    newAccountBtn.addEventListener('click', () => {
      overlay.classList.replace('overlay-hidden','overlay-show');
    });

    function closeRegister() {
      overlay.classList.replace('overlay-show','overlay-hidden');
    }

    function registerUser() {


      closeRegister();
    }