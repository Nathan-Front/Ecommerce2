
//Mobile viewport nav buttons
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


