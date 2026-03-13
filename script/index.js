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

//Deskptop dropdown functions
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

function backToTop(){
  const backToTopBtn = document.querySelector('#back-to-top');
  backToTopBtn.addEventListener('click', () =>{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
}

