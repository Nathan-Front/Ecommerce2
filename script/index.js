async function fetchNavigation() {
    const body = document.body;
   
    const resMobileNav = await fetch("./header/mobileHeaders.html");
    const mobileNavHTML = await resMobileNav.text();
    body.insertAdjacentHTML("afterbegin", mobileNavHTML);

    const resHeader = await fetch("./header/mainNav.html");
    const headerHTML = await resHeader.text();
    body.insertAdjacentHTML("afterbegin", headerHTML);
    const navContainer = document.querySelector(".title-cart-panel");
    const resCategory = await fetch("./header/categoryPanel.html");
    const categoryHTML = await resCategory.text();
    navContainer.innerHTML += categoryHTML;
}

async function fetchBodyContent(){
    const body = document.body;

    const resUpCarousel = await fetch("./upperCarousel/upperCarousel.html");
    const upCarouselHTML = await resUpCarousel.text();
    body.insertAdjacentHTML("beforeend", upCarouselHTML);

    const resUpItems = await fetch("./product/items.html");
    const itemsHTML = await resUpItems.text();
    body.insertAdjacentHTML("beforeend", itemsHTML);

    const resFooter = await fetch("./footer/footer.html");
    const footerlHTML = await resFooter.text();
    body.insertAdjacentHTML("beforeend", footerlHTML);

    const resAlright = await fetch("./footer/alrightReserve.html");
    const alrightHTML = await resAlright.text();
    body.insertAdjacentHTML("beforeend", alrightHTML);

    const resMobileFooter = await fetch("./footer/mobileFooter.html");
    const mobileFooterHTML = await resMobileFooter.text();
    body.insertAdjacentHTML("beforeend", mobileFooterHTML);
   
    const mobileNews = await fetch("./footer/mobileNews.html");
    const mobileNewsHTML = await mobileNews.text();
    body.insertAdjacentHTML("beforeend", mobileNewsHTML);


}

async function fetchPopupPanels(){
    const body = document.body;
    
    const resMobileCart = await fetch("./cart/cart.html");
    const mobileCartHTML = await resMobileCart.text();
    body.insertAdjacentHTML("beforeend", mobileCartHTML);
    
    const mobileCart = document.getElementById("display-cart");
    const mobileFooter = await fetch("./footer/alrightReserve.html");
    const mobileFooterHTML = await mobileFooter.text();
    if(mobileCart){
        mobileCart.insertAdjacentHTML("beforeend", mobileFooterHTML);
    }

    

    const resMobileForm = await fetch("./loginForm/mobileLoginForm.html");
    const mobileFormHTML = await resMobileForm.text();
    body.insertAdjacentHTML("beforeend", mobileFormHTML);

    const resCreateAccForm = await fetch("./createForm/createAccountForm.html");
    const createAccFormHTML = await resCreateAccForm.text();
    body.insertAdjacentHTML("beforeend", createAccFormHTML);

    const resUserInfo = await fetch("./loginForm/mobileUserInfo.html");
    const userInfoHTML = await resUserInfo.text();
    body.insertAdjacentHTML("beforeend", userInfoHTML);
}

async function initAsync(){
    await fetchNavigation();
    await fetchBodyContent();
    await fetchProducts();
    await fetchPopupPanels();
    restoreLoggedUser();
    categoryToggle();
    animateUpperImages();
    upperPanel();
    returnHome();
    burgerButton();
   
    mobileNewsContent();
    mobileCart();     
    userDisplay(); 

    loginCreateForm();

    createAccount();
    loginAccount();
    uploadProfile();
    signOut();
    
    addItemToCart();
    itemCount();
    await fetchCartContent();
    updateCartCounter();
    deleteItemInCart();
    paymentSummary();
}
document.addEventListener("DOMContentLoaded", initAsync);


//Use to breakdown only at this viewport
let isMobile = window.innerWidth <= 599;
window.addEventListener("resize", () => {
    const nowMobile = window.innerWidth <= 599;
    if (nowMobile !== isMobile) {
        isMobile = nowMobile;
        fetchNavigation(); 
        closeAll();
    }
});

function categoryToggle() {
    //Function for the news dropdown buttons
    const newsBtn = document.querySelectorAll('.new-item-display-button');
    newsBtn.forEach(function (btnEl) {
        btnEl.addEventListener('click', (e) => {
            //Remove the newsItemActive class name and add it to the next clicked button
            document.querySelector('.newsItemActive').classList.remove('newsItemActive');
            btnEl.classList.add('newsItemActive');
        });
    });
    //USe data- and target the related item with Id name same as the data-target value
    document.querySelectorAll('button[data-target]').forEach(function (el) {
        el.addEventListener('click', () => {
            //Get list of the items to be displayed one by one
            let newsContainer = document.getElementsByClassName('new-item-panel');
            for (let i = 0; i < newsContainer.length; i++) {
                newsContainer[i].style.display = 'none';
            }
            //Target the Id name with the same data-target value of the clicked button
            document.getElementById(el.getAttribute('data-target')).style.display = "flex";
        });
    });

    //For dropdown contents of category container
    const categoryImgBtn = document.querySelectorAll('.category-images');
    categoryImgBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            const clickedBtn = btn.closest('.category-images');
            const displayBtnMssg = clickedBtn.querySelector('.dropdown-buttons').textContent;
            alert('Link to ' + displayBtnMssg + ' page');
        });
    });

    const dailyImgBtn = document.querySelectorAll('.daily-images');
    dailyImgBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            const clickedBtn = btn.closest('.daily-images');
            const displayBtnMssg = clickedBtn.querySelector('.dropdown-buttons').textContent;
            alert('Link to ' + displayBtnMssg + ' page');
        });
    });
}

function animateUpperImages() {
    let images = document.querySelectorAll(".upper-carousel");
    if (images.length === 0) return null;
    let imageIndex = 0;
    images[imageIndex].classList.add("upper-display");

    function imageAnimate() {
        const current = images[imageIndex];
        current.classList.remove("upper-display");
        current.classList.add("upper-hide");
        imageIndex = (imageIndex + 1) % images.length;
        const next = images[imageIndex];
        next.classList.remove("upper-hide");
        next.classList.add("upper-display");
        setTimeout(() => {
            current.classList.remove("upper-hide");
        }, 600);
    }
    setInterval(imageAnimate, 5000);
}
function upperPanel(){
    const upperPanel = document.querySelector(".main-panel-upper");
    upperPanel.addEventListener("click", (e)=>{
    if(!e.target.classList.contains("upper-carousel-button")) return;
        const displayTitle = e.target.textContent;
            alert("Link to " + displayTitle + " page");
    });
}
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
function returnHome(){
    const homeBtn = document.getElementById("mobile-home-button");
    homeBtn.addEventListener("click", ()=>{
        window.location.href = "index.html";
    });
}

function mobileCart(){
    const cartBtn = document.getElementById("cart-button");
    const cartWrap = document.querySelector(".check-out-cart-panel");
    cartBtn.addEventListener("click", ()=>{
         const isOpen = cartWrap.classList.contains("showCart");
        closeAll();
        if(!isOpen){
            cartWrap.classList.add("showCart");
            document.body.classList.add("no-scroll");
        }
    });
    const deskCartBtn = document.getElementById("check-out-cart");
    deskCartBtn.addEventListener("click", ()=>{
        const isOpen = cartWrap.classList.contains("showCart");
        closeAll();
        if(!isOpen){
            cartWrap.classList.add("showCart");
            document.body.classList.add("no-scroll");
            const overlay = document.getElementById("overlay");
            overlay.classList.toggle("cover");
        }
    });
     
    const closeCartBtn = document.getElementById("close-cart");
    closeCartBtn.addEventListener("click", ()=>{
        closeAll();
    });
}
function burgerButton(){
    const burgerOpenBtn = document.getElementById("burger-open-button");
    const displayNews = document.getElementById("toggle-mobile-news");
    burgerOpenBtn.addEventListener("click", ()=>{
        const isOpen = displayNews.classList.contains("display");
        closeAll();
        closeMobileNews();
        if(!isOpen){
            displayNews.classList.add("display");
            document.body.classList.add("no-scroll");
            burgerOpenBtn.src = "./images/logo/icon-close.svg";
        }
    });
}
function mobileNewsContent(){
    const sections = document.querySelectorAll(".mobile-menu-section");
    sections.forEach(section => {
        const btn = section.querySelector("span");
        btn.addEventListener("click", () => {
            const isOpen = section.classList.contains("openContent");
            closeMobileNews();
            if (!isOpen) {
                section.classList.add("openContent");
            }
        });
    });
}
function closeMobileNews(){
    const sections = document.querySelectorAll(".mobile-menu-section");
    sections.forEach(s => s.classList.remove("openContent"));
}

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

