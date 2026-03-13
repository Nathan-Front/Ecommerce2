
//Displaying login/create Form
function loginCreateForm(){
    const signInBtn = document.getElementById("sign-in");
    const formWrap = document.querySelector(".mobile-form");
    signInBtn.addEventListener("click", ()=>{
        const guest = document.getElementById("user-to-log");
        if(guest.textContent !== "Guest"){
            alert("Already logged in"); 
            return;
        }
        const isOpen = formWrap.classList.contains("showLoginDesk");
        closeAll();
        const inputUser = document.getElementById("input-user-name");
        const rememberMe = JSON.parse(localStorage.getItem("rememberUserName"));
        if(!isOpen){
            formWrap.classList.add("showLoginDesk");
            document.body.classList.add("no-scroll");
            inputUser.value = rememberMe;
            const overlay = document.getElementById("overlay");
            overlay.classList.toggle("cover");
        }
    });

    const registerBtn = document.getElementById("register");
    const registerForm = document.querySelector(".create-accnt-page");
    const toCreateForm = document.getElementById("redirect-to-create-form");
    toCreateForm.addEventListener("click", ()=>{
        closeAll();
        const isOpen = registerForm.classList.contains("showCreateAccForm");
        if(!isOpen){
            registerForm.classList.add("showCreateAccForm");
            document.body.classList.add("no-scroll");
            const overlay = document.getElementById("overlay");
            overlay.classList.toggle("cover");
        }
        
    });

    registerBtn.addEventListener("click", ()=>{
        const isOpen = registerForm.classList.contains("showCreateAccForm");
        closeAll();
        if(!isOpen){
            registerForm.classList.add("showCreateAccForm");
            document.body.classList.add("no-scroll");
            const overlay = document.getElementById("overlay");
            overlay.classList.toggle("cover");
        }
    });
    closeForm();
}

function closeForm(){
    const closeFormBtn = document.querySelectorAll(".close-form-button");
    closeFormBtn.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            closeAll();
            mobileUserIndicator();
        });
    });
    toggleEye();
}
function mobileUserIndicator(){
    const mobileLoginBtn = document.getElementById("mobile-login-button");
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(savedUser){
        mobileLoginBtn.src = savedUser.indicator;
    }else{
        mobileLoginBtn.src = "./images/logo/profile-user-svgrepo-com-gray.svg";
    }
}
function toggleEye(){
  document.addEventListener("click", (e) => {
    const eye = e.target.closest(".toggle-password"); //Shared className of the eye
    if(!eye) return;
    const passwordField = document.getElementById(eye.dataset.target); //Use data- to target the id of the input field of the toggled eye
    if(!passwordField) return;
    const isPassword = passwordField.type === "password"; //Does the input field type equal to password
    passwordField.type = isPassword ? "text" : "password"; //If password then change to text other wise as is
    eye.classList.toggle("fa-eye"); //For initial existance of the eye
    eye.classList.toggle("fa-eye-slash");
  });
}

//At mobile viewport
function userDisplay(){
    const mobileLoginBtn = document.getElementById("mobile-login-button");
    const formWrap = document.querySelector(".mobile-form");
    const userInfo = document.querySelector(".logged-in-user-info-panel");
    mobileLoginBtn.addEventListener("click", ()=>{
            const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
            const isUserInfoOpen = userInfo.classList.contains("showUserInfo");
            const isOpen = formWrap.classList.contains("showLogin");
             closeMobileNews();
            if (!isUserInfoOpen && savedUser) { 
                closeAll();
                userInfo.classList.add("showUserInfo");
                document.body.classList.add("no-scroll");
                mobileLoginBtn.src = savedUser.indicator;
            }
            else if (!savedUser && !isOpen) {
                closeAll();
                formWrap.classList.add("showLogin");
                document.body.classList.add("no-scroll");
            } 
    });  
}
//Close form when other button is clicked mobile viewport
function closeAll(){
    const formWrap = document.querySelector(".mobile-form");
    const overlay = document.getElementById("overlay");
    const registerForm = document.querySelector(".create-accnt-page");
    const cart = document.querySelector(".check-out-cart-panel");
    const displayNews = document.getElementById("toggle-mobile-news");
    const burgerOpenBtn = document.getElementById("burger-open-button");
    const userInfo = document.querySelector(".logged-in-user-info-panel");
    if(formWrap){
        formWrap.classList.remove("showLoginDesk");
        formWrap.classList.remove("showLogin");
        userInfo.classList.remove("showUserInfo");
    }
    if(registerForm){
        registerForm.classList.remove("showCreateAccForm");
    }
    if(overlay){
        overlay.classList.remove("cover");
    }
    if(cart){
        cart.classList.remove("showCart");
    }
    if(displayNews){
        displayNews.classList.remove("display");
    }
    if(burgerOpenBtn){
        burgerOpenBtn.src = "./images/logo/icon-hamburger.svg";
    }
    document.body.classList.remove("no-scroll");
}