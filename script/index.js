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

    const resMobileCart = await fetch("./cart/cart.html");
    const mobileCartHTML = await resMobileCart.text();
    body.insertAdjacentHTML("beforeend", mobileCartHTML);
}
async function initAsync(){
    await fetchNavigation();
    await fetchBodyContent();
    await fetchProducts();

    categoryToggle();
    animateUpperImages();
    returnHome();
    burgerButton();
   
    mobileNewsContent();
    mobileCart();      
}
document.addEventListener("DOMContentLoaded", initAsync);


let isMobile = window.innerWidth <= 599;
window.addEventListener("resize", () => {
    const nowMobile = window.innerWidth <= 599;
    if (nowMobile !== isMobile) {
        isMobile = nowMobile;
        fetchNavigation(); 
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
}
function mobileNewsContent(){
    const sections = document.querySelectorAll(".mobile-menu-section");
    sections.forEach(section => {
        const btn = section.querySelector("span");
        btn.addEventListener("click", () => {
            const isOpen = section.classList.contains("openContent");
            closeAll();
            if (!isOpen) {
                section.classList.add("openContent");
            }
        });
    });
}
function closeAll(){
    document.querySelector(".check-out-cart-panel").classList.remove("showCart");
    document.querySelectorAll(".mobile-menu-section").forEach(s => s.classList.remove("openContent"));
    const displayNews = document.getElementById("toggle-mobile-news");
    const burgerOpenBtn = document.getElementById("burger-open-button");
    if(displayNews) displayNews.classList.remove("display");
    if(burgerOpenBtn){
        burgerOpenBtn.src = "../images/logo/icon-hamburger.svg";
    }
    document.body.classList.remove("no-scroll");
}