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

    const resMobileForm = await fetch("./loginForm/mobileLoginForm.html");
    const mobileFormHTML = await resMobileForm.text();
    body.insertAdjacentHTML("beforeend", mobileFormHTML);

    const resCreateAccForm = await fetch("./createForm/createAccountForm.html");
    const createAccFormHTML = await resCreateAccForm.text();
    body.insertAdjacentHTML("beforeend", createAccFormHTML);
}

async function initAsync(){
    await fetchNavigation();
    await fetchBodyContent();
    await fetchProducts();
    await fetchPopupPanels();
    await restoreLoggedUser();
    categoryToggle();
    animateUpperImages();
    returnHome();
    burgerButton();
   
    mobileNewsContent();
    mobileCart();     
    loginPage(); 

    signInUser();

    createAccount();
    loginAccount();
    signOut();
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
    setInterval(imageAnimate, 7000);
}

function loginPage(){
    const mobileLoginBtn = document.getElementById("mobile-login-button");
    const formWrap = document.querySelector(".mobile-form");
    mobileLoginBtn.addEventListener("click", ()=>{
         const isOpen = formWrap.classList.contains("showLogin");
         closeAll();
        if (!isOpen) {
                formWrap.classList.add("showLogin");
                document.body.classList.add("no-scroll");
                mobileLoginBtn.src = "../images/logo/profile-user-svgrepo-com-blue.svg"
            }
    });
}
function returnHome(){
    const homeBtn = document.getElementById("mobile-home-button");
    homeBtn.addEventListener("click", ()=>{
        window.location.href = "index.html";
        location.reload();
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
        if(!isOpen){
            displayNews.classList.add("display");
            document.body.classList.add("no-scroll");
            burgerOpenBtn.src = "../images/logo/icon-close.svg";
        }
    });
}
function mobileNewsContent(){
    const sections = document.querySelectorAll(".mobile-menu-section");
    sections.forEach(section => {
        const btn = section.querySelector("span");
        btn.addEventListener("click", () => {
            const isOpen = section.classList.contains("openContent");
            sections.forEach(s => s.classList.remove("openContent"));
            if (!isOpen) {
                section.classList.add("openContent");
            }
        });
    });
}

function closeAll(){
    const formWrap = document.querySelector(".mobile-form");
    const overlay = document.getElementById("overlay");
    const mobileLoginBtn = document.getElementById("mobile-login-button");
    const registerForm = document.querySelector(".create-accnt-page");
    const cart = document.querySelector(".check-out-cart-panel");
    const displayNews = document.getElementById("toggle-mobile-news");
    const burgerOpenBtn = document.getElementById("burger-open-button");
    if(formWrap){
        formWrap.classList.remove("showLoginDesk");
        formWrap.classList.remove("showLogin");
        mobileLoginBtn.src = "../images/logo/profile-user-svgrepo-com-gray.svg";
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
        burgerOpenBtn.src = "../images/logo/icon-hamburger.svg";
    }
    document.body.classList.remove("no-scroll");
}



//login form for desktop
function signInUser(){
    const signInBtn = document.getElementById("sign-in");
    const formWrap = document.querySelector(".mobile-form");
    signInBtn.addEventListener("click", ()=>{
        const isOpen = formWrap.classList.contains("showLoginDesk");
        closeAll();
        if(!isOpen){
            formWrap.classList.add("showLoginDesk");
            document.body.classList.add("no-scroll");
            const overlay = document.getElementById("overlay");
            overlay.classList.toggle("cover");
        }
    });

    const registerBtn = document.getElementById("register");
    const registerForm = document.querySelector(".create-accnt-page");
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

    const closeFormBtn = document.querySelectorAll(".close-form-button");
    closeFormBtn.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            closeAll();
        });
    });
}

