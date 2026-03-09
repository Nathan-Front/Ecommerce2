async function fetchNavigation() {
    const body = document.body;

    if(window.innerWidth <= 599){
        const resMobileNav = await fetch("./header/mobileHeaders.html");
        const mobileNavHTML = await resMobileNav.text();
        body.insertAdjacentHTML("afterbegin", mobileNavHTML);
    }else{
        const resHeader = await fetch("./nav/mainNav.html");
        const headerHTML = await resHeader.text();
        body.insertAdjacentHTML("afterbegin", headerHTML);
        const navContainer = document.querySelector(".title-cart-panel");

        const resCategory = await fetch("./header/categoryPanel.html");
        const categoryHTML = await resCategory.text();
        navContainer.innerHTML += categoryHTML;
    }

 
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
async function initAsync(){
    await fetchNavigation();
    await fetchBodyContent();
    await fetchProducts();

    categoryToggle();
    animateUpperImages();
    burgerButton();
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


function burgerButton() {
    const burgerOpenBtn = document.getElementById("burger-open-button");
    const displayNews = document.getElementById("toggle-mobile-news");
    burgerOpenBtn.addEventListener("click", ()=>{
        displayNews.classList.toggle("display");
        document.body.classList.toggle("no-scroll");
        burgerOpenBtn.src = burgerOpenBtn.src.includes("icon-hamburger.svg")
        ? "../images/logo/icon-close.svg"
        : "../images/logo/icon-hamburger.svg";
    });
}