//Variable outside function is also being used to other functions
const titlePanel = document.querySelector('.title-cart-panel');
const burgerLinks = document.querySelector("#burger-menu");
const burgerOpen = document.getElementById("burger");
const burgerClose = document.getElementById("burger-close");
const menuHomeBtn = document.getElementById('newsHomeBtn');
document.addEventListener("DOMContentLoaded", mobileDesktopInit);
window.addEventListener("resize", mobileDesktopInit);

//Initialize which viewport currently is
function mobileDesktopInit() {
    const isMobile = window.innerWidth <= 430;
    if (isMobile) {
        enableMobile();
    } else {
        enableDesktop();
    }
}

function enableMobile() {
    //Initializer for mobile viewport
    if (window.__mobileEnabled) return; 
    window.__mobileEnabled = true;
    window.__desktopEnabled = false;

    const homeItemBtn = document.createElement('button');
    homeItemBtn.className = 'cpHomeBtn';
    //For adding the elements during mobile viewport        
    if (!titlePanel.querySelector('.cpHomeBtn')) {
      titlePanel.prepend(homeItemBtn);
    }
    //Event for the home button
      homeItemBtn.addEventListener('click', () =>{
      location.href = 'index.html';
    });
    if(menuHomeBtn){
        menuHomeBtn.addEventListener('click', () => {
        location.href = 'index.html';
      });
    }
    burgerOpen.style.display = 'flex';
    titlePanel.append(burgerOpen);
    //Burger open button click event
    burgerOpen.onclick = () => {
      //Allows only one panel/form at a time
      if(cartContentEmpty.classList.contains('navActive') 
        || loginPage.classList.contains('log-in') 
        || mobileLoggedInPanel.classList.contains('mobile-Login-panel')
        || createForm.classList.contains('create-account-slider')){
        cartContentEmpty.classList.remove('navActive');
        loginPage.classList.remove('log-in');
        mobileLoggedInPanel.classList.remove('mobile-Login-panel');
        createForm.classList.remove('create-account-slider');
      }
      burgerOpen.style.display = 'none';  
      burgerLinks.classList.add("burger-links");
      coverPage.style.display = 'block';
      //Always prepend home button again (safe)
      titlePanel.prepend(homeItemBtn);
      //Add close button
      burgerClose.style.display = "flex";
      titlePanel.appendChild(burgerClose);
      //Stop scrolling of the main page even after opening a page on top of it
      document.body.classList.add("no-scroll");
    };
    //Burger close button click event
    if (burgerClose) {
        burgerClose.onclick = () => {
        burgerLinks.classList.remove("burger-links");
        coverPage.style.display = 'none';
        // Remove close button
        if (titlePanel.contains(burgerClose)) {
            titlePanel.removeChild(burgerClose);
        }
        //Always add home button back
        titlePanel.prepend(homeItemBtn);
        //Show burger open button again
        burgerOpen.style.display = "flex";
        document.body.classList.remove("no-scroll");
    };
    }
}

function enableDesktop() {
    if (window.__desktopEnabled) return;
    window.__desktopEnabled = true;
    window.__mobileEnabled = false;

    //Remove mobile classes
    burgerLinks.classList.remove("burger-links");
    document.body.classList.remove("no-scroll");

    //Remove burger buttons if present
    if (titlePanel.contains(burgerOpen)) titlePanel.removeChild(burgerOpen);
    if (titlePanel.contains(burgerClose)) titlePanel.removeChild(burgerClose);

    //Remove home button safely
    const homeBtn = titlePanel.querySelector(".cpHomeBtn");
    if (homeBtn) homeBtn.remove();
}


const loginPage = document.getElementById('login-page');
const closeLoginPage = document.getElementById('close-login-page');
const mobileLoggedInPanel = document.getElementById('mogile-logged-in-panel');
document.addEventListener("DOMContentLoaded", () =>{

        const loginBtn = document.getElementById('login-panel-button');
        const loginBtnMenu = document.getElementById('login-panel-button-menu-header');
        const loginBtnMenuCart = document.getElementById('login-panel-button-menu-header-cart');       
        
        //For diplaying login/create  form page 430px and below
        const userLog = document.getElementById('mobile-user-to-log').textContent;
        loginBtn.addEventListener('click', () =>{
          if(userLog !== 'Guest' || userLog === ""){
            mobileLoggedInPanel.classList.add('mobile-Login-panel');
            document.body.classList.add('no-scroll');
            coverPage.style.display = 'flex';
          }else{
            loginPage.classList.add('log-in');
            document.body.classList.add('no-scroll');
            coverPage.style.display = 'flex';
          }    
        });
        //To close the form displayed by the code above
        const closeUserInfo = document.getElementById('close-user-info-panel');
          closeUserInfo.addEventListener('click', ()=>{
          mobileLoggedInPanel.classList.remove('mobile-Login-panel');
          document.body.classList.remove('no-scroll');
          coverPage.style.display = 'none';
        });
       
        //Second button to display the same login form from the above code. 
        //You can use Data- to make this code more simple and compact
        loginBtnMenu.addEventListener('click', () =>{
          if(userLog !== 'Guest' || userLog === ""){
            loginPage.classList.remove('log-in');
            document.body.classList.add('no-scroll');
            coverPage.style.display = 'flex';
            cartContentEmpty.classList.remove('navActive');
            burgerLinks.classList.remove("burger-links");
            burgerClose.style.display = 'none';
            burgerOpen.style.display = 'flex'; 
            mobileLoggedInPanel.classList.add('mobile-Login-panel');
          }else{
            loginPage.classList.add('log-in');
            document.body.classList.add('no-scroll');
            cartContentEmpty.classList.remove('navActive');
            burgerLinks.classList.remove("burger-links");
            burgerClose.style.display = 'none';
            burgerOpen.style.display = 'flex'; 
          }     
       });
      //Third button to display the same login form from the above code.
      //You can use Data- to make this code more simple and compact
      if(loginBtnMenuCart){
        loginBtnMenuCart.addEventListener('click', () =>{
          if(userLog !== 'Guest' || userLog === ""){
            loginPage.classList.remove('log-in');
            document.body.classList.add('no-scroll');
            coverPage.style.display = 'flex';
            cartContentEmpty.classList.remove('navActive');
            burgerLinks.classList.remove("burger-links");
              mobileLoggedInPanel.classList.add('mobile-Login-panel');
          }else{
              loginPage.classList.add('log-in');
            document.body.classList.add('no-scroll');
            cartContentEmpty.classList.remove('navActive');
            burgerLinks.classList.remove("burger-links");
          }   
        });
      }

      //For closing login page. This is the X of login form
      closeLoginPage.addEventListener('click', () => {
          loginPage.classList.remove('log-in');
          document.body.classList.remove('no-scroll');
          coverPage.style.display = 'none';
      });
        
      //For the carousel at the very top of the page during mobile viewport
      if(window.innerWidth <= 430){
        const newUpperPanel = document.createElement('div');
        newUpperPanel.classList = 'new-upper-panel';
        const firstUpper = document.querySelectorAll('.upper-carousel');
        newUpperPanel.append(...firstUpper);
        const mainPanel = document.getElementById('Main-Panel');
        mainPanel.prepend(newUpperPanel);
        
        const contactContainer = document.querySelector('#contact-div-for-mobile');
        const footerContainer = document.querySelector('.alright-reserve');
        footerContainer.classList.add('temporary-footer-reserve');
        contactContainer.appendChild(footerContainer);
        if(window.innerWidth > 430){
          newUpperPanel.remove(...firstUpper);
          mainPanel.remove(newUpperPanel);
          contactContainer.removeChild(footerContainer);
          return;
        }
      }                
});


//Use Built-in API hash of the browser *This is for front-end only no server/DB
//Does not show the exact password in the localStorage
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
//Login/Create account form
const loginAccBtn = document.getElementById('sign-in');
const loginAccountPage = document.getElementById('login-accnt-btn');
const closeLoginAccntPage = document.getElementById('login-close-createAccnt-page');
const createAccBtn = document.getElementById('register');
const createBtn = document.getElementById('create-accnt-btn'); //Create account form
const closeCreateAccntPage =document.getElementById('close-createAccnt-page');
const noAccntYetBtn = document.getElementById('link-create-Btn');
//Display login/create form
document.addEventListener('DOMContentLoaded', ()=>{

  loginAccBtn.addEventListener('click', ()=>{
    //Prevents user form opening login form if thet are already logged in
    const existingLoggedUser = JSON.parse(localStorage.getItem('saveLoggedInUser'));
    if(existingLoggedUser){
      alert('Already logged in');
      return;
    }
    //Open login form if they are not logged in
    loginAccountPage.classList.add('login-account-slider');
    coverPage.style.display = 'flex'; 
    document.body.classList.add("no-scroll"); 
  });

  //Close login form
  closeLoginAccntPage.addEventListener('click', ()=>{
    loginAccountPage.classList.remove('login-account-slider');
    coverPage.style.display = 'none'; 
    document.body.classList.remove("no-scroll"); 
  });
  //Redirect to create acount form
  noAccntYetBtn.addEventListener('click', ()=>{
    loginAccountPage.classList.remove('login-account-slider');
    createBtn.classList.add('create-account-slider'); 
    coverPage.style.display = 'flex'; 
    document.body.classList.add("no-scroll"); 
  });
  //Display create account form
  createAccBtn.addEventListener('click', () =>{
    createBtn.classList.add('create-account-slider'); 
    coverPage.style.display = 'flex'; 
    document.body.classList.add("no-scroll"); 
  });
  //Close create account form
  closeCreateAccntPage.addEventListener('click', (e)=>{
    e.preventDefault();
    createBtn.classList.remove('create-account-slider');
    coverPage.style.display = 'none'; 
    document.body.classList.remove("no-scroll"); 
  });
 
  //Create account function
  const createUName = document.getElementById('input-uName');
  const createPass = document.getElementById('input-pass');
  const emailInput = document.getElementById('input-email');
  createBtn.addEventListener('submit', async (e)=>{ //Use form submit for accessibility and use the async to be able to use the hash code from above
    e.preventDefault(); //Prevents the form's default action. Prevents submitting if button is not clicked

    //If all input tags are empty
    if(createUName.value === "" || createPass.value === "" || emailInput.value === ""){
      alert('Input value is needed');
      return;
    }
    
    //this is for warning error if not correct e-mail format
    document.querySelectorAll("small.error").forEach(el => el.textContent = ""); 
    document.querySelectorAll("input").forEach(el => el.classList.remove("error-border"));
    //Check if input is an e-mail
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Enter a valid email");
      return;
    }
    
    //Function to search if such user account is already taken
    const userStorage = JSON.parse(localStorage.getItem('accountStorage')) || [];
    //Duplicate username check 
    if (userStorage.some(u => u.userName === createUName.value)) {
      alert('Username already taken');
      createUName.value = '';
      return;
    }
    //Duplicate password check 
    const hashedPass = await hashPassword(createPass.value.trim()); //This is the async/hash at the top
    if (userStorage.some(u => u.userPass === hashedPass)) {
      alert('Password already taken');
      createPass.value = '';
      return;
    }
    //Duplicate e-mail check 
    if (userStorage.some(u => u.email === emailInput.value)) {
      alert('E-mail address already taken');
      emailInput.value = '';
      return;
    }
    
    const newId = new Date().getTime(); //Use this as user Id
    const storeUser = {
      userId: newId,
      userName: createUName.value,
      userPass: hashedPass, //instead of input.value we use the hashed password
      email: emailInput.value
    };

    //If username,password and e-mail is not yet in the storage we add it to storage
    userStorage.push(storeUser);
    localStorage.setItem('accountStorage', JSON.stringify(userStorage));
    //Clear inputs and panel
    createUName.value = '';
    createPass.value = '';
    emailInput.value = '';
    createBtn.classList.remove('create-account-slider');
    coverPage.style.display = 'none'; 
    document.body.classList.remove("no-scroll"); 
    alert('Account created successfully');
  });
});


//This is the e-mail validator
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email)
}


//This is the error message when incorrect e-mail format was input
function showError(input, message) {
  const small = input.parentElement.querySelector("small");
  small.textContent = message;
  input.classList.add("error-border");
}


//Login form  desktop/tablet
function loginUserForm(){
  const loginBtn = document.getElementById('login-to-main-button');
  const loginUserName = document.getElementById('input-login-uName');
  const loginUserPass = document.getElementById('input-login-pass');
  if(!loginBtn) return;
  //If remember me checkbox is checked
  const rememberMeCheckbox = document.getElementById('remember-me');
  const rememberMe = JSON.parse(localStorage.getItem('rememberUserName'));
  if(rememberMe){
    loginUserName.value = rememberMe;
    rememberMeCheckbox.checked = true;
  }

  loginBtn.addEventListener("click", async () => { //Async for the password hash
  const username = loginUserName.value.trim(); //Trim() is to remove whitespaces at both end
  const password = loginUserPass.value.trim();
  const userStorage = JSON.parse(localStorage.getItem('accountStorage')) || [];
  const hashedInput = await hashPassword(password);
  const user = userStorage.find(u => //Search username and password in the localstorage for match
      u.userName === username && u.userPass === hashedInput
  );

  const loggedInUser = document.getElementById('user-to-log');
  if(user){ //If user exist
    loggedInUser.textContent = user.userName; //Display username
    localStorage.setItem('saveLoggedInUser',JSON.stringify(user)); //Save that logged in user to different localStorage 
    if (rememberMeCheckbox.checked){
      localStorage.setItem("rememberUserName", JSON.stringify(username)); //Save as remember me to another localStorage
    }else{
      localStorage.removeItem("rememberUserName"); //Do not save as remember me
    }
    //Do this after saving to localStorage    
    loginUserPass.value = ''; 
    loginAccountPage.classList.remove('login-account-slider');
    coverPage.style.display = 'none'; 
    document.body.classList.remove("no-scroll");
    alert('Login successful.');
  }else{
    alert("Invalid username or password");
  }
  });
}loginUserForm();


//Login form  mobile
//Code is a bit different from above to see which is easier to understand
const createForm = document.getElementById('create-accnt-btn');

function mobileLoginUserForm(){
  const mobileLoginUserName = document.getElementById('input-user-name');
  const mobileLoginUserPass = document.getElementById('input-user-pass');
  const form = document.getElementById('mobile-form-submit'); //We put id to form instead of the button
  const mobileRememberMeCheckbox = document.getElementById('mobile-remember-me');
  const mobileRememberMe = JSON.parse(localStorage.getItem('rememberUserName'));
  const mobileLoginPanel = document.getElementById('login-page');
  if(mobileRememberMe){
    mobileLoginUserName.value = mobileRememberMe;
    mobileRememberMeCheckbox.checked = true;
  }
  if(form.dataset.bound) return; //This prevents from doing submit/events when button/input field etc. is clicked or toggled
  form.dataset.bound = "true";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mobileUsername = mobileLoginUserName.value.trim();
    const mobilePassword = mobileLoginUserPass.value.trim();

    //If user/password input field is empty
    if (!mobileUsername || !mobilePassword) {
      alert("Please enter username and password");
      return;
    }

    const userStorage = JSON.parse(localStorage.getItem('accountStorage')) || [];
    const hashedInput = await hashPassword(mobilePassword);
    const user = userStorage.find(
      u => u.userName === mobileUsername && u.userPass === hashedInput
    );
    if (!user) {
      alert("Invalid username or password");
      return;
    }
    document.getElementById('mobile-user-to-log').textContent = user.userName; //Diplay logged in user
    localStorage.setItem('saveLoggedInUser', JSON.stringify(user)); //Save the logged in user to localSotrage
    if (mobileRememberMeCheckbox.checked) {
      localStorage.setItem('rememberUserName', JSON.stringify(mobileUsername));
    } else {
      localStorage.removeItem('rememberUserName');
    }
    //Do this after saving the logged in user
    mobileLoginUserPass.value = '';
    mobileLoginPanel.style.display = 'none';
    coverPage.style.display = 'none';
    document.body.classList.remove("no-scroll");
    alert('Login successful.');
    location.reload();
  });

  //Cancel button in form. Erase only the input values. This is not the same as the X in the login form
  const cancelFormPanel = document.getElementById('mobile-cancel-form');
  cancelFormPanel.addEventListener('click', (e)=>{
    e.preventDefault();
    mobileLoginUserName.value = '';
    mobileLoginUserPass.value = '';
  });

  //Redirect to create account form
  const redirectToCreateForm = document.getElementById('mobile-redirect-to-create-form');
  redirectToCreateForm.addEventListener('click', ()=>{
    loginPage.classList.remove('log-in') 
    coverPage.style.display = 'flex';
    document.body.classList.add("no-scroll");
    createForm.classList.add('create-account-slider');
  });
} mobileLoginUserForm();


//Show password eye button function
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const eye = e.target.closest(".toggle-password"); //Shared className of the eye
    if(!eye) return; //Not toggled

    const passwordField = document.getElementById(eye.dataset.target); //Use data- to target the id of the input field of the toggled eye
    if (!passwordField) return;

    const isPassword = passwordField.type === "password"; //Does the input field type equal to password
    passwordField.type = isPassword ? "text" : "password"; //If password then change to text other wise as is

    eye.classList.toggle("fa-eye"); //For initial existance of the eye
    eye.classList.toggle("fa-eye-slash");
  });
});


//When hovering a long logged in user
const userNameHover = document.querySelector('.user-name-logged');
userNameHover.addEventListener('mouseenter', () => {
  if (userNameHover.scrollWidth > userNameHover.clientWidth) { //if the logged in user name is longer than the displayed
    userNameHover.title = userNameHover.textContent; //Display the full user name
  } else {
    userNameHover.removeAttribute('title');
  }
});


//Signout function
function logoutUser(){
  const signOut = document.getElementById('sign-out');
  signOut.addEventListener('click', () =>{
    localStorage.removeItem('saveLoggedInUser');
    loggedInUser.textContent = 'Guest';
    alert('Signed out.');
  });
  const mobileSignoutUser = document.getElementById('mobile-signout-user');
  mobileSignoutUser.addEventListener('click', ()=>{
    localStorage.removeItem('saveLoggedInUser');
    profilePic.src = '';
    mobileLoggedInUser.textContent = 'Guest';
    alert('Signed out.');
    location.reload();
  });
}logoutUser();


//Forgot password
function forgotPassword(){
  const forgotPass = document.getElementById('forgot-password');
  forgotPass.addEventListener('click', ()=>{
    alert('Redirect to retrieve new password page.');
  });
  const mobileForgotPass = document.getElementById('mobile-forgot-password');
  mobileForgotPass.addEventListener('click', ()=>{
    alert('Redirect to retrieve new password page.');
  });
}forgotPassword();


//For uploading profile picture
const uploadBtn = document.getElementById('upload-pic-Btn');
const fileInput = document.getElementById('profile-pic-upload');
const profilePic = document.getElementById('profile-picture');
function uploadProfilePic(){
  uploadBtn.addEventListener('click', () => {
    fileInput.click(); //Open folder
  });

  fileInput.addEventListener('change', ()=>{
    const file = fileInput.files[0]; //Get only one picture
    if(!file) return;

    if(!file.type.startsWith('image/')){ //Check if the selected file's MIME type is not an image
    alert('Select only an image file');
    return;
  }

  const reader = new FileReader(); //Create reader fo the file being selected
  reader.onload = () =>{ //When the reder finished reading the file
    const imageData = reader.result;
    profilePic.src = imageData; //Selected picture source
    const users = JSON.parse(localStorage.getItem('accountStorage')) || [];
    const loggedUser = JSON.parse(localStorage.getItem('saveLoggedInUser'));
    if (!loggedUser) return;
    const userIndex = users.findIndex(u => u.userId === loggedUser.userId); //Search for the logged in user
    if (userIndex === -1) return;
    users[userIndex].profileImage = imageData; //Add the picture to that searched user
    localStorage.setItem('accountStorage', JSON.stringify(users)); //Save it to user localstorage
    localStorage.setItem('saveLoggedInUser',JSON.stringify(users[userIndex]));
  };
   reader.readAsDataURL(file);//This open the file (image/picture) and covert it to string
  });
}uploadProfilePic();


//reload remain user display just like in the cart and counter
const loggedInUser = document.getElementById('user-to-log');
const mobileLoggedInUser = document.getElementById('mobile-user-to-log');
const savedUser = JSON.parse(localStorage.getItem('saveLoggedInUser'));
if (savedUser) {
  if(loggedInUser){
    loggedInUser.textContent = savedUser.userName;
  }
  if(mobileLoggedInUser){
    mobileLoggedInUser.textContent = savedUser.userName;
  }
  if (savedUser?.profileImage) {
    profilePic.src = savedUser.profileImage;
}
}


//Carousel of the upper panel items on mobile viewport
//This function is different from when on desktop viewport
window.__mobileUpperSliderActive = false;
window.__mobileMainSliderActive = false;
function mobileUpperPanelSlider(){
    if (window.innerWidth > 430) {
        window.__mobileUpperSliderActive = false;
        // Clean dots when switching to desktop
        const dots = document.querySelector('.mobile-slider-dots');
        if (dots) dots.innerHTML = "";
        return;
    }
    if (window.__mobileUpperSliderActive) return;
    window.__mobileUpperSliderActive = true;
    const slider = document.querySelector('.new-upper-panel');
    if(!slider) return;
    const upperPanelContent = document.querySelectorAll('.upper-carousel');
    const dotsContainer = document.querySelector('.mobile-slider-dots');

    let index = 0;
    let startX = 0;
    let isDragging = false;
    dotsContainer.innerHTML = '';
    upperPanelContent.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'mobile-dot' + (i === 0 ? ' mobile-active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
        
    const dots = document.querySelectorAll('.mobile-dot');
    function updateSlider(){
      upperPanelContent.forEach((s, i) => {
        s.style.transform =  `translateX(${-index * 100}%)`; //each slide move to left by %
      });
      dots.forEach((d, i) => {
        d.classList.toggle('mobile-active', i === index); //Show which dot is acurrently active
      });
    }
    //Index indicator for carousel    
    function goToSlide(i) {
      index = i;
      updateSlider();
    }

    function nextSlide() {
      index = (index + 1) % upperPanelContent.length;
      updateSlider();
    }
    //Starting position of touch
    slider.addEventListener('touchstart', e => {startX = e.touches[0].clientX;
      isDragging = true;}, //Marks dragging as active
      { passive: true } //Makes touchevent performance better
    );
    //For dragging is active
    slider.addEventListener('touchmove', e => {
      if (!isDragging) return;
    }, { passive: true });
    //When touch stop
    slider.addEventListener('touchend', e => {
      if (!isDragging) return;
        const endX = e.changedTouches[0].clientX; //Get position where finger was lifter
        const diff = endX - startX; //Calculate how far the finger moved. This will move the slider right/left depending on calculation
      //Go previous/next slide based on the calculated above. Basis is 50px below
      if (diff > 50) {
        index = index === 0 ? upperPanelContent.length - 1 : index - 1;
      } else if (diff < -50) {
        index = (index + 1) % upperPanelContent.length;
      }
      updateSlider(); //Do the slide movement (traslateX above)
        isDragging = false; //Stops dragging after lifting finger
      });
      updateSlider();      
}
//call mobile carousel function
document.addEventListener('DOMContentLoaded', mobileUpperPanelSlider);
window.addEventListener("resize", () => {
    mobileUpperPanelSlider();
});


//Remove mobile carousel function when switching to desktop viewport
function mobileMainPanelSlider(){
  if (window.innerWidth > 430) {
    if (window.__mobileMainSliderActive) {
        window.__mobileMainSliderActive = false;
        document.querySelectorAll(
            ".mobile-main-panel-carousel-dots, .mobile-main-panel-slider-dots"
        ).forEach(el => el.remove());
    }
    return;
  }

  const wrapper = document.querySelector('.owl-carousel-container');
  const list = document.querySelector('.owl-carousel');
  const items = Array.from(document.querySelectorAll('.carousel-item'));  

  let index = 0;
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0;
  let animating = false;
  
  //Create DOT container
  let dotsContainer = document.querySelector('.mobile-main-panel-slider-dots');
  if (!dotsContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'mobile-main-panel-carousel-dots';
    wrapper.appendChild(dotsContainer);
  }

  //Create the DOTs
  dotsContainer.innerHTML = '';
  const dots = items.map((_, i) => { //The underscore just means to just ignore this _ parameter
    const dot = document.createElement('button');
    dot.className = 'mobile-main-panel-dots';
    if (i === 0) dot.classList.add('mobile-main-panel-active');
    dotsContainer.appendChild(dot);
    return dot;
  });

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('mobile-main-panel-active', i === index);
    });
  }

  // calculate widths including margins
  function getSlideMetrics() {
    const item = items[0];
    const itemRect = item.getBoundingClientRect(); //Return the item's width
    const style = getComputedStyle(item); //Reads all the css of the item. This time its the width (margin, padding, gap etc)
    const marginLeft = parseFloat(style.marginLeft) || 0; //Converts to number
    const marginRight = parseFloat(style.marginRight) || 0; //Converts to number
    const slideWidth = itemRect.width; //Doesn't include margins in here. It needs to be calculated see below
    const listStyle = getComputedStyle(list); //Reads all the css of the item. This time its the width (margin, padding, gap etc)
    let gap = parseFloat(listStyle.gap) || 0;//Get also the gap style from the carousel container
    // If gap is percentage, convert it to px:
    if (listStyle.gap.includes('%')) {
      const wrapperWidth = wrapper.getBoundingClientRect().width; //Gets actual pixel width wrapper of the element
      gap = wrapperWidth * (parseFloat(listStyle.gap) / 100); //Converts % to px
    }
    const fullSlideWidth = slideWidth + marginLeft + marginRight + gap; //Calculation of total width
    const wrapperWidth = wrapper.getBoundingClientRect().width; //Gets the width of the area that contains the slides
    return { slideWidth, fullSlideWidth, wrapperWidth };
  }

  function updateTransform(translateX, withTransition = true) {
    list.style.transition = withTransition ? 'transform 300ms ease' : 'none'; //If statement to add animation if withTransition is true
    list.style.transform = `translateX(${translateX}px)`; //Move slider x-axis
  }

  function goToIndex(i) {
    const { slideWidth, fullSlideWidth, wrapperWidth } = getSlideMetrics();
    //Wrap around slider logic
    if (i < 0) {
        index = items.length - 1; // go to last slide
    } else if (i >= items.length) {
        index = 0; // go to first slide
    } else {
        index = i; //Stay to current slide
    }
    // center offset so the active slide sits in the middle of wrapper
    const centerOffset = (wrapperWidth - slideWidth) / 2; //This calculate where to center the slider
    const translateX = -(index * fullSlideWidth) + centerOffset; //This calculate where to move slide for the next slide so that it will be centered
    currentTranslate = translateX; //Save current slide position
    updateTransform(translateX, true); //Move slider x-axis
    updateDots();
  }

  //Touch handlers (basic swipe)
  list.addEventListener('touchstart', (e) => {
    if (animating) return;
    const t = e.touches[0];
    startX = t.clientX;
    isDragging = true;
    list.style.transition = 'none'; //disable transition while dragging
  }, {passive: true});

  list.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const t = e.touches[0];
    const { fullSlideWidth } = getSlideMetrics();
    const delta = t.clientX - startX;
    //show follow-drag feedback by applying delta to currentTranslate
    updateTransform(currentTranslate + delta, false);
  }, {passive: true});

  list.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    isDragging = false;

    //threshold
    const THRESH = 50;
    if (diff > THRESH) {
      goToIndex(index - 1);
    } else if (diff < -THRESH) {
      goToIndex(index + 1);
    } else {
      // snap back to same slide
      goToIndex(index);
    }
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToIndex(i));
  });
  // initialize
  goToIndex(0);  
}
document.addEventListener('DOMContentLoaded', mobileMainPanelSlider);
window.addEventListener("resize", mobileMainPanelSlider);


function mobileMainPanelSlider2(){
    if (window.innerWidth > 430) {
    if (window.__mobileMainSliderActive) {
        window.__mobileMainSliderActive = false;

        document.querySelectorAll(
            ".mobile-main-panel-carousel-dots, .mobile-main-panel-slider-dots-2"
        ).forEach(el => el.remove());
    }
    return;
}

  const wrapper2 = document.querySelector('.owl-carousel-container-shoes');
  const list2 = document.querySelector('.owl-carousel-shoes');
  const items2 = Array.from(document.querySelectorAll('.carousel-item-shoes'));

  let index2 = 0;
  let startX2 = 0;
  let isDragging2 = false;
  let currentTranslate2 = 0;
  let animating2 = false;
  
  //Create DOT container
  let dotsContainer2 = document.querySelector('.mobile-main-panel-slider-dots-2');
  if (!dotsContainer2) {
    dotsContainer2 = document.createElement('div');
    dotsContainer2.className = 'mobile-main-panel-carousel-dots';
    wrapper2.appendChild(dotsContainer2);
  }

  //Create DOTs
  dotsContainer2.innerHTML = '';
  const dots2 = items2.map((_, i) => {
    const dot2 = document.createElement('button');
    dot2.className = 'mobile-main-panel-dots-2';
    if (i === 0) dot2.classList.add('mobile-main-panel-active-2');
    dotsContainer2.appendChild(dot2);
    return dot2;
  });

  function updateDots2() {
    dots2.forEach((dot2, i) => {
      dot2.classList.toggle('mobile-main-panel-active-2', i === index2);
    });
  }
  // calculate widths including margins
  function getSlideMetrics2() {
    const item2 = items2[0];
    const itemRect2 = item2.getBoundingClientRect();
    const style2 = getComputedStyle(item2);
    const marginLeft2 = parseFloat(style2.marginLeft) || 0;
    const marginRight2 = parseFloat(style2.marginRight) || 0;
    const slideWidth2 = itemRect2.width; 
    const listStyle2 = getComputedStyle(list2);
    let gap2 = parseFloat(listStyle2.gap) || 0;
    // If gap is percentage, convert it to px:
  if (listStyle2.gap.includes('%')) {
        const wrapperWidth2 = wrapper2.getBoundingClientRect().width;
         gap2 = wrapperWidth2 * (parseFloat(listStyle2.gap) / 100);
        }
    const fullSlideWidth2 = slideWidth2 + marginLeft2 + marginRight2 + gap2;
    const wrapperWidth2 = wrapper2.getBoundingClientRect().width;

    return { slideWidth2, fullSlideWidth2, wrapperWidth2 };
  }

  function updateTransform2(translateX, withTransition = true) {
    list2.style.transition = withTransition ? 'transform 300ms ease' : 'none';
    list2.style.transform = `translateX(${translateX}px)`;
  }

  function goToIndex2(i) {
    const { slideWidth2, fullSlideWidth2, wrapperWidth2 } = getSlideMetrics2();
    //Wrap slide logic
    if (i < 0) {
        index2 = items2.length - 1; // go to last slide
    } else if (i >= items2.length) {
        index2 = 0; // go to first slide
    } else {
        index2 = i;
    }
    // center offset so the active slide sits in the middle of wrapper
    const centerOffset = (wrapperWidth2 - slideWidth2) / 2;
    const translateX = -(index2 * fullSlideWidth2) + centerOffset;
    currentTranslate2 = translateX;
    updateTransform2(translateX, true);
    updateDots2();
  }

  // Touch handlers (basic swipe)
  list2.addEventListener('touchstart', (e) => {
    if (animating2) return;
    const t = e.touches[0];
    startX2 = t.clientX;
    isDragging2 = true;
    list2.style.transition = 'none'; 
  }, {passive: true});

  list2.addEventListener('touchmove', (e) => {
    if (!isDragging2) return;
    const t = e.touches[0];
    const { fullSlideWidth } = getSlideMetrics2();
    const delta = t.clientX - startX2;
 
    updateTransform2(currentTranslate2 + delta, false);
  }, {passive: true});

  list2.addEventListener('touchend', (e) => {
    if (!isDragging2) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX2;
    isDragging2 = false;

    //threshold of 50px
    const THRESH = 50;
    if (diff > THRESH) {
      goToIndex2(index2 - 1);
    } else if (diff < -THRESH) {
      goToIndex2(index2 + 1);
    } else {
      //snap back to same slide
      goToIndex2(index2);
    }
  });
  dots2.forEach((dot2, i) => {
    dot2.addEventListener('click', () => goToIndex2(i));
  });
  // inititilization
  goToIndex2(0);    
}
document.addEventListener('DOMContentLoaded', mobileMainPanelSlider2);
window.addEventListener('resize', mobileMainPanelSlider2);
const mq = window.matchMedia("(max-width: 430px)");
mq.addEventListener("change", e => {
    if (!e.matches) {
        // Desktop now → remove ALL dots
        document.querySelectorAll(
          ".mobile-main-panel-carousel-dots, .mobile-main-panel-slider-dots, .mobile-main-panel-slider-dots-2"
        ).forEach(el => el.remove());

        // Unlock slider initialization if user goes back to mobile
        window.__mobileMainSliderActive = false;
    } 
});


let lowerSliderInitialized = false;
function mobileLowerPanelSlider(){
  if (window.innerWidth > 430) return;
  const lowerWrapper = document.querySelector('.outdoor-panel-wrapper');
  const lowerList = document.querySelector('.outdoor-panel-mobile-container');
  const lowerItems = Array.from(document.querySelectorAll('.outdoor-panel-item'));  

  //Remove all event listeners of mobile viewport when switching to desktop/tablet viewport
  if (window.innerWidth > 430) {
    if (lowerSliderInitialized) {
      // Remove transform animations
      lowerList.style.transform = "";
      lowerList.style.transition = "";
      // Remove all touch eventlisteners by cloning. *Cloning removes eventListeners
      const clone = lowerList.cloneNode(true);
      lowerList.parentNode.replaceChild(clone, lowerList);
      lowerSliderInitialized = false; //Update flag telling slide is no longer active
    }
    return;
  }

  if (lowerSliderInitialized) return;
  lowerSliderInitialized = true; //If slide is active
  let index3 = 0;
  let startX3 = 0;
  let isDragging3 = false;
  let currentTranslate3 = 0;
  let animating3 = false; 

  // calculate widths including margins
  function getSlideMetrics3() {
    const item3 = lowerItems[0];
    const itemRect3 = item3.getBoundingClientRect();
    const style3 = getComputedStyle(item3);
    const marginLeft3 = parseFloat(style3.marginLeft) || 0;
    const marginRight3 = parseFloat(style3.marginRight) || 0;
    const slideWidth3 = itemRect3.width;
    const listStyle3 = getComputedStyle(lowerList);
    let gap = parseFloat(listStyle3.gap) || 0;
    // If gap is percentage, convert it to px:
  if (listStyle3.gap.includes('%')) {
        const wrapperWidth3 = lowerWrapper.getBoundingClientRect().width;
         gap = wrapperWidth3 * (parseFloat(listStyle3.gap) / 100);
        }
    const fullSlideWidth3 = slideWidth3 + marginLeft3 + marginRight3 + gap;
    const wrapperWidth3 = lowerWrapper.getBoundingClientRect().width;

    return { slideWidth3, fullSlideWidth3, wrapperWidth3 };
  }

  function updateTransform3(translateX, withTransition = true) {
    lowerList.style.transition = withTransition ? 'transform 300ms ease' : 'none';
    lowerList.style.transform = `translateX(${translateX}px)`;
  }

  function goToIndex3(i) {
    const { slideWidth3, fullSlideWidth3, wrapperWidth3 } = getSlideMetrics3();
    //Wrap slide logic
    if (i < 0) {
        index3 = lowerItems.length - 1; // go to last slide
    } else if (i >= lowerItems.length) {
        index3 = 0;  // go to first slide
    } else {
        index3 = i;
    }
    // center offset so the active slide sits in the middle of wrapper
    const centerOffset = (wrapperWidth3 - slideWidth3) / 2;
    const translateX = -(index3 * fullSlideWidth3) + centerOffset;
    currentTranslate3 = translateX;
    updateTransform3(translateX, true);
  }

  // Touch handlers (basic swipe)
  lowerList.addEventListener('touchstart', (e) => {
    if (animating3) return;
    const t = e.touches[0];
    startX3 = t.clientX;
    isDragging3 = true;
    lowerList.style.transition = 'none'; // disable transition while dragging
  }, {passive: true});

  lowerList.addEventListener('touchmove', (e) => {
    if (!isDragging3) return;
    const t = e.touches[0];
    const { fullSlideWidth } = getSlideMetrics3();
    const delta = t.clientX - startX3;
    // show follow-drag feedback by applying delta to currentTranslate
    updateTransform3(currentTranslate3 + delta, false);
  }, {passive: true});

  lowerList.addEventListener('touchend', (e) => {
    if (!isDragging3) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX3;
    isDragging3 = false;

    // threshold
    const THRESH = 50;
    if (diff > THRESH) {
      goToIndex3(index3 - 1);
    } else if (diff < -THRESH) {
      goToIndex3(index3 + 1);
    } else {
      // snap back to same slide
      goToIndex3(index3);
    }
  });
 // Recenter on resize (recompute metrics)
  window.addEventListener('resize', () => {
    // re-center currently active slide
    goToIndex3(index3);
  });

  // init
  goToIndex3(0);  
}
document.addEventListener('DOMContentLoaded', mobileLowerPanelSlider);
window.addEventListener('resize', mobileLowerPanelSlider);

//Back to top button function
function backToTop(){
  const backToTopBtn = document.querySelector('#back-to-top');
  backToTopBtn.addEventListener('click', () =>{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
}backToTop();

 function mostAskedQuestions(){
  const newsMenuBtn1 = document.getElementById('newsMenuBtn1');
  const newsMenuBtn2 = document.getElementById('newsMenuBtn2');
  const newsMenuBtn3 = document.getElementById('newsMenuBtn3');
  //let newsMenuArray = [newsMenuBtn1, newsMenuBtn2,newsMenuBtn3];
  let newsMenuArray = document.querySelectorAll('.menu-buttons');
  const menuDiv = document.createElement('div');
  menuDiv.className = 'menu-div-pop';

  const upperHeaderContainer = document.querySelector('.mobile-header');
  upperHeaderContainer.classList.add('mobile-header-menu');
  burgerLinks.prepend(upperHeaderContainer);
       
  burgerLinks.append(menuDiv);
  const burgerLinkFooter = document.querySelector('.burger-links-hidden-footer');
  burgerLinkFooter.classList.add('alright-reserve-burgerlinks-footer');
  burgerLinks.appendChild(burgerLinkFooter);
  //Content for when burgerOpen button was clicked
  //Works intandem with the code at the bottom
  menuDiv.addEventListener('click', (e) => {
    const dropQuestionsBtn = e.target.closest('#drop-questions');
    if(dropQuestionsBtn){
            const dropAnswers = menuDiv.querySelector('#questions');
            if (dropAnswers) {
                    dropAnswers.style.display = 
                    dropAnswers.style.display === 'none' ? 'flex' : 'none';
            }
     }  
    const policyBtn = e.target.closest('#policy');
    if(policyBtn){
            const policyContent = menuDiv.querySelector('#policies');
            if(policyContent){
                   policyContent.style.display = 
                   policyContent.style.display === 'none' ? 'flex' : 'none'; 
            }
    }
    const communityBtn = e.target.closest('#community');
    if(communityBtn){
            const communityContent = menuDiv.querySelector('#communities');
            if(communityContent){
                    communityContent.style.display =
                    communityContent.style.display === 'none' ? 'flex' : 'none';
            }
    }
  });
        
  //Display content when burgerOpen button is clicked 
  for(let i = 0; i < newsMenuArray.length; i++){
    newsMenuArray[i].addEventListener('click', () => {  
      if(newsMenuArray[i].textContent === 'News'){ 
                      
      menuDiv.innerHTML =`
      <span class="news-menu-cp-head">News</span>
      <div class="news-menu-cp">
              <span class="news-menu-cp-title">Title 1</span> 
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum dolorem praesentium at alias velit cum. Eius optio maiores delectus unde ipsam labore a numquam quod aperiam temporibus, corporis qui accusamus!</p>
              <img src="images/category/communication-social-media-icons.jpg" alt="Trend icon">
      </div>
      <div class="news-menu-cp">
              <span class="news-menu-cp-title">Title 2</span> 
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum dolorem praesentium at alias velit cum. Eius optio maiores delectus unde ipsam labore a numquam quod aperiam temporibus, corporis qui accusamus!</p>
              <img src="images/category/couple-backpacks-rocks-sunset.jpg" alt="New release">
      </div>
      <div class="news-menu-cp">
              <span class="news-menu-cp-title">Title 3</span> 
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum dolorem praesentium at alias velit cum. Eius optio maiores delectus unde ipsam labore a numquam quod aperiam temporibus, corporis qui accusamus!</p>
              <img src="images/category/denim-sneakers-street-style.jpg" alt="Most ordered">
      </div>
      <div class="news-menu-cp">
              <span class="news-menu-cp-title">Title 4</span> 
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum dolorem praesentium at alias velit cum. Eius optio maiores delectus unde ipsam labore a numquam quod aperiam temporibus, corporis qui accusamus!</p>
              <img src="images/upper-panel/vecteezy_antique-table-holds-old-literature-rustic-elegance_24642428.jpg" alt="Creative styles">
      </div>
      `;          
      }else if(newsMenuArray[i].textContent ==='About us'){
      menuDiv.innerHTML = `
      <span class="news-menu-cp-head">About us</span>
      <div class="about-us-menu-cp">
              <div class="about-us-menu-cp-img">
                      <img src="images/logo/agency.jpg" alt=""> 
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>    
              </div>
              <p class="menu-contact">Contact #: 000-0000-0000</p>
              <p>Email: oOo@testmail.com</p>
              <p>Address: somewhere down d street Ave.</p>
              <div class="social-media">
                      <img src="images/logo/facebook-svgrepo-com.svg" alt="facebook">
                      <img src="images/logo/instagram-rounded-border-svgrepo-com.svg" alt="instagram">
                      <img src="images/logo/linkedin-boerder-svgrepo-com.svg" alt="instagram">
              </div>
      </div>
      `;
      }else if(newsMenuArray[i].textContent === 'FAQs'){
      menuDiv.innerHTML = `
      <div class="drop-question-container">
              <span class="news-menu-cp-head" id="drop-questions">Most asked questions</span>
              <div class="question-hidden" id="questions">   
                      <h2>Question 1</h2>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      <h2>Question 2</h2>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      <h2>Question 3</h2>
                      <p>Some text here</p>
              </div>
      </div>
      <div>
              <span class="news-menu-cp-head" id="policy">Policies</span>
              <div class="question-hidden" id="policies">   
                      <h2>Scam</h2>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      <h2>Selling items on our site</h2>
                      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      <h2>Return policy</h2>
                      <p>Some text here</p>
              </div>
      </div>
      <div>
              <span class="news-menu-cp-head" id="community">Community</span>
              <div class="question-hidden" id="communities">   
                      <h2>Our sponsors</h2>
                      <p><span>Sponsor 1</span></br>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      <p><span>Sponsor 2</span></br>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      <h2>Local community</h2>
                      <p>Some text here</p>
                      <h2>Foundations we are supporting</h2>
                      <p><span>Foundation 1</span></br>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      <p><span>Foundation 2</span></br>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias temporibus quae corporis minima sapiente dolorum autem, exercitationem quod porro enim error ipsam sit ullam saepe distinctio perferendis incidunt deleniti accusamus!</p>
                      
              </div>
      </div>
      `;  
      menuDiv.style.display = 'flex';
              // simulate a click on #drop-questions so toggle runs immediately. 
              //Use this since the click is not directly in the button but to the menuDiv container itself
              //This works intandem with the click eventListener above. Cannot function alone
              const dropBtn = menuDiv.querySelector('#drop-questions');
              if (dropBtn) { //Only run the code if the element really exist
              // Use a real click event so delegation handler sees it. Fake click event *Again the eventListenere is in menuDiv
              dropBtn.dispatchEvent(new MouseEvent('click', { bubbles: true })); //Bubbles simulate real click event
              }
              const policyDropBtn = menuDiv.querySelector('#policy');
              if(policyDropBtn){
              policyDropBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
              }
              const communityDropBtn = menuDiv.querySelector('#community');
              if(communityDropBtn){
                      communityDropBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
              }
      }else{return;}                 
    }); 
  }
}mostAskedQuestions();
