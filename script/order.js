//For the header hide/display on scroll
var lastScrollTop = 0;
const header = document.getElementById('display-on-scroll');
//Allow only one update per animation frame (~16ms).
//This prevents the expensive logic from running repeatedly.
let ticking = false;
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 430) return;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (scrollTop > lastScrollTop) {
                header.style.top = '-10%'; //scroll down → hide
            } else {
                header.style.top = '0%';   //scroll up → show
            }
            lastScrollTop = scrollTop; //Show the header
            //Update header position. Allow the next update
            ticking = false;
        });
        //Ignore the event. Prevents overload.
        //From scroll handler took 249ms → only one update per animation frame (~16ms).
        ticking = true;
    }
});


let CartItem = [];
let counterForCart = 0;
let counterForItemQty = 0;
const cartItemCounter = document.getElementById("added-to-cart");
const cartElement = document.getElementById('checked-out-item');
//For adding item into the cart
function addingToCart(name, productsToId) {
    //Get the data from sessionStorage for comparison
    let getIdAndSize = JSON.parse(sessionStorage.getItem('itemFromCart')) || [];
    //Check the name passed from onclick 1st parameter 
    let index = getIdAndSize.findIndex(item => item.name === name);
    //Check if the there is such item. Index should start 0. Also acts to warn if item is already added
    if (index !== -1) { 
        alert("Item already in the cart");
    } else {
    //Get the click event with its 2nd parameter to be used and get the container where that button belong to                    
    const productItemId = productsToId.closest('.list-of-items');
    //get the data-product-id equivalent from the container selected above
    const selectItemId = productItemId.dataset.productId;
    //For selected size of speficic item
    const selectedSizeInput = document.querySelector(`input[name="select-size-${selectItemId}"]:checked`);
    //For the image source of selected item. Get the data-image-src from the selected container above
    const imageSource = productItemId.dataset.imageSrc;
    //console.log("Url",imageSource);

    if (selectedSizeInput) {
        //Get all data from each element to be saved in an array
        const itemSelectedQty = document.querySelector(`span[class="item-count itemTotal-${selectItemId}"]`).textContent;
        console.log(itemSelectedQty);
        const selectedSize = selectedSizeInput.value;
        const productName = document.querySelector(`span[class="product-name-${selectItemId}"]`).textContent;
        let iPrice = parseFloat(document.querySelector(`span[id="item-price-${selectItemId}"]`).textContent);
        let itemCount = parseFloat(itemSelectedQty);
        //For counter of quantity for the selected item/product
        if(itemCount <= 0){
            alert("Select quantity");
            return;          
        }else{
            let tPrice = Number((itemCount * iPrice).toFixed(2)); //Number remove the adding of 0 before each whole number and toFixed is to display 2 decimals only
            //Use the current date/time as an ID for sessionStorage of each item
            const newItem = new Date().getTime();
            const item = {
                StoredId: newItem,
                name: productName,
                price: iPrice,
                image: imageSource,
                size: selectedSize,
                quantity: itemCount,
                total: tPrice
                }; 
            CartItem.push(item); 
            //Increase the cart counter to be saved in sessionStorage  
            let counterFromStorage = JSON.parse(sessionStorage.getItem('cartCounter'));          
            counterFromStorage++;
            sessionStorage.setItem("cartCounter", counterFromStorage);
            //Pass and update the display of cart counter
            updateCounter();
            //Save the content of array item to sessionStorage
            let cartToId = JSON.parse(sessionStorage.getItem('itemFromCart'))||[];
            cartToId.push(item);
            sessionStorage.setItem('itemFromCart', JSON.stringify(cartToId));
            //console.log("Id to be store in storage",item.StoredId);      
        }        
   // }   
     }else{
        alert("Error detected, refresh website and try again!");
     }  
    }
    //Pass the data to show/update the cart display        
    updateCartContent();
    }


//To checkout payment
document.addEventListener('DOMContentLoaded', () =>{
const payment = document.getElementById('to-payment');
if(!payment) return;
    payment.addEventListener('click', function(){
        let tPrice = 0;
        const itemCount = document.getElementById("added-to-cart");
        let totalCheckoutPrice = JSON.parse(sessionStorage.getItem('itemFromCart'));
        //Check if there is item in the cart
        if(totalCheckoutPrice === null || "" || totalCheckoutPrice.length === 0){
            alert('No item in the cart'); 
            return;
        }
        //Check if user is logged in before displaying total payment
        if(loggedInUser.textContent === 'Guest' || loggedInUser.textContent === "" || loggedInUser.textContent === null){
            alert('Yoou need to login');
            if(window.innerWidth > 430){return;}
            cartContentEmpty.classList.remove('navActive');
            loginPage.classList.add('log-in');
            coverPage.style.display = 'flex'; 
            document.body.classList.add("no-scroll"); 
        }else{
        totalCheckoutPrice.forEach(item =>{
            if(itemCount !== 0 || itemCount !== ""){
                tPrice += item.total;
            }
        });
            alert(`Total price: $${tPrice}`);  
        }
     });
 });

function updateCartContent(itemId){
    let cartStore = JSON.parse(sessionStorage.getItem('itemFromCart'))||[];
    //To udate cart display
    if(cartStore.length === 0){   
        sessionStorage.removeItem('itemFromCart');
        cartElement.innerHTML = "";
    //This is needed or else item diplayed in the cart will be doubled when reloading/refreshing  
    }else{
        cartElement.innerHTML = "";
    }
    //Loop the array of sessionStorage     
    cartStore.forEach((item, index) =>{
        //const itemQty = document.getElementsByClassName(".item-count");
        const li = document.createElement('li');
        li.className = 'cart-content-item';
      //  li.setAttribute('data-item-id', `${item.StoredId}`);
        li.id = 'for-update-cart';
        li.innerHTML = `
         <div class="item-descript-cart">
            <p>Item name:<span> ${item.name}</span></p>
            <p>Item price:<span id="item-price">$ ${item.price}</span></p>
            <p>seller:<span>ABC comp.</span></p>
            <img src="${item.image}" alt="Product image">
            <p>Size:<span class="selected-size">${item.size}</span></p>
            <p>Quantity:<span> ${item.quantity}</span></p>
            <p>Total:<span>$ ${item.total}</span></p>                       
         </div>
         <div class="item-cart-button-cart" id="cart-delete-button">
            <button onclick="deleteItemFromSession(${item.StoredId})" data-item-id='${item.StoredId}' class="delete-item-from-cart">Delete</button>
         </div>
        `;
        //Newly added item to be always at the top
        cartElement.prepend(li);
        //cartElement.appendChild(li);//Use this if the checkout button has a fixed position
    });  
}


function attachCounterHandler(containerId){ //Get the string being passed
    const container = document.getElementById(containerId); //Get the data being passed
    if(!container){return;} //If no such Id do nothing

    container.addEventListener('click', (event) => {
        const btn = event.target; //Actual element clicked
        if(!btn.classList.contains('counter-add') && !btn.classList.contains('counter-minus')){return;}  //If these element not clicked, do nothing
        const itemCON = btn.closest('.list-of-items'); //Search DOM of parent having this class nearest to it
        if(!itemCON){return;}  //If none do nothing
        const counterElm = itemCON.querySelector('.item-count'); //Counter selected item
        let cnt = parseInt(counterElm.textContent, 10) || 0; //Read current count *Base-10 number system
        if(btn.classList.contains('counter-add')) { //If plus clicked, increment
            cnt++;
        }else if (btn.classList.contains('counter-minus') && cnt > 0) { //If minus is clicked, decrement
            cnt--;
        }

        counterElm.textContent = cnt; //Display current item selected counter
    });
}
attachCounterHandler('clothing-container'); //String equivalent to the Id of the container of clothing carousel
attachCounterHandler('clothing-container-shoes'); //String equivalent to the Id for the container of shoes carousel


function updateCounter() {
    const storedCounter = sessionStorage.getItem('cartCounter');
    if(storedCounter === null){return;}
    const counter = JSON.parse(storedCounter) ?? 0; //Replace null or undefined with zero
    cartItemCounter.textContent = counter;
    sessionStorage.setItem('cartCounter', JSON.stringify(counter));
    updateCartContent();
}
document.addEventListener('DOMContentLoaded', updateCounter); //This is needed here unlike the code of updateCartContent
      

//For deleting item
function deleteItemFromSession(itemId){
    let counterFromStorage = JSON.parse(sessionStorage.getItem('cartCounter'));    
    if (counterFromStorage > 0) {
        //Search specific ID of item to be filtered out
        let cart = JSON.parse(sessionStorage.getItem('itemFromCart')||'[]');
        //Filter that specific ID out while the rest will be stored back to the sessionStorage
        cart = cart.filter(item => item.StoredId !== itemId);
        sessionStorage.setItem('itemFromCart', JSON.stringify(cart));
        //Decrease the counter in the sessionStorage and update it
        counterFromStorage--;
        sessionStorage.setItem("cartCounter", counterFromStorage);  
    } else {
        return;
    }
    //Pass the updated sessionStorage to remove item from the cart if delete button was clicked
    updateCounter();
    updateCartContent();
} 


//Declare globally. These are also being used in responsive.js file
const upperHeaderCart = document.querySelector('.mobile-header-cart');
const checkoutMenuPanel = document.querySelector('.check-out-cart-panel');
const upperHeaderCartTab = document.querySelector('.mobile-header-cart-tab');
//Get the Id of container aside. This is for cart display
const cartContentEmpty = document.getElementById('display-cart');
//This will cover the page when cart is being dispayed. Prevent access to the main page
const coverPage = document.getElementById('overlay');
document.addEventListener('DOMContentLoaded', () =>{
    
    //For the cart content
    //Get the cart button when clicked
    const checkoutCartContent = document.getElementById('check-out-cart');
    checkoutCartContent.addEventListener('click', function(){
    //Display the cart    
    if(cartContentEmpty.style.display !== 'none'){
        //Add this class name to the container as if it's in display:none
        cartContentEmpty.classList.add('navActive');
        //This prevents access to the main page while cart is on display when on desktop
        coverPage.style.display = 'flex';
        document.body.classList.add("no-scroll");
        if(window.innerWidth <= 430){
            upperHeaderCart.classList.add('mobile-header-menu-cart');
            checkoutMenuPanel.prepend(upperHeaderCart);
        }
        if(window.innerWidth > 430 && window.innerWidth <= 540){
            document.querySelector('#login-button-menu-header-cart-tab')?.remove();
            upperHeaderCartTab.classList.add('mobile-header-menu-cart-tab');
            checkoutMenuPanel.prepend(upperHeaderCartTab);
        }
        if(window.innerWidth <= 540){
            cartContentEmpty.style.zIndex = '99';
        }
        //Allows only one panel/form at a time
        if(burgerLinks.classList.contains('burger-links') 
            || loginPage.classList.contains('log-in')
            || mobileLoggedInPanel.classList.contains('mobile-Login-panel')
            || createForm.classList.contains('create-account-slider')){
            burgerLinks.classList.remove('burger-links');
            burgerClose.style.display = 'none'; 
            burgerOpen.style.display = 'flex'; 
            loginPage.classList.remove('log-in');
            mobileLoggedInPanel.classList.remove('mobile-Login-panel');
            createForm.classList.remove('create-account-slider');
        }       
    }else{
        cartContentEmpty.classList.remove('navActive');
        coverPage.style.display = 'none';
    }
    });
    //When close cart button was clicked same with else condition above
    const closeCart = document.getElementById('close-cart');
    closeCart.addEventListener('click', function(){
    if(closeCart){
        cartContentEmpty.classList.remove('navActive');
        coverPage.style.display = 'none';
        document.body.classList.remove("no-scroll");  
        //let cartCounter = JSON.parse(sessionStorage.getItem('cartCounter'))||[];
        //if(cartCounter <= 0){
           // cartItemCounter.textContent = '0';
        //}
    }
    });  
});


document.addEventListener('DOMContentLoaded', ()=>{
    //Function for the news dropdown buttons
    const newsBtn = document.querySelectorAll('.new-item-display-button');
    newsBtn.forEach(function (btnEl){
        btnEl.addEventListener('click', (e) => {
        //Remove the newsItemActive class name and add it to the next clicked button
        document.querySelector('.newsItemActive').classList.remove('newsItemActive');
        btnEl.classList.add('newsItemActive');
        });
    });
    //USe data- and target the related item with Id name same as the data-target value
    document.querySelectorAll('button[data-target]').forEach(function (el){
        el.addEventListener('click', () =>{
            //Get list of the items to be displayed one by one
            let newsContainer = document.getElementsByClassName('new-item-panel');
            for(let i = 0; i < newsContainer.length; i++){
                newsContainer[i].style.display = 'none';
            }
            //Target the Id name with the same data-target value of the clicked button
            document.getElementById(el.getAttribute('data-target')).style.display = "flex";
        });
    });

    //For dropdown contents of category container
    const categoryImgBtn = document.querySelectorAll('.category-images');
    categoryImgBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            const clickedBtn = btn.closest('.category-images');
            const displayBtnMssg = clickedBtn.querySelector('.dropdown-buttons').textContent;
            alert('Link to ' + displayBtnMssg + ' page');
        });
    });

    const dailyImgBtn = document.querySelectorAll('.daily-images');
    dailyImgBtn.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            const clickedBtn = btn.closest('.daily-images');
            const displayBtnMssg = clickedBtn.querySelector('.dropdown-buttons').textContent;
            alert('Link to ' + displayBtnMssg + ' page');
        });
    }); 
});


//Start of display index
let upperCarouselIndex = 0;
//All container with this class name
const upperSlides = document.querySelectorAll('.upper-carousel');
//For auto animation slide
let intervalId = null;
//For the animation of the upperpanel slider
function initialSlide(){
    if(upperSlides.length > 0){
        //Add this class name to the current container on display
        upperSlides[upperCarouselIndex].classList.add('upper-display');
        //Automatically go to next slide after 7 seconds
        if(window.innerWidth > 430){
            intervalId = setInterval(nextSlide, 7000);
        }      
    }
}
//Call the function 
document.addEventListener('DOMContentLoaded', initialSlide); 


//just popups for upperpanel slider
function upperSlideContentsBtn(){
    //during Desktop/tablet viewport
    const upperPanelBtns = document.querySelectorAll('.upper-carousel-button');
    //during mobile viewport
    const mobileUpperPanelBtns = document.querySelectorAll('.upper-carousel');
    document.addEventListener('DOMContentLoaded', () =>{
        if(window.innerWidth <= 430){
            //For mobile viewport
            mobileUpperPanelBtns.forEach((btn) =>{
                btn.addEventListener('click', ()=>{
                    const panel = btn.closest('.upper-carousel');
                    const upperPanelTitle = panel.querySelector('.main-panel-upper-h2').textContent;            
                    alert('Link to ' + upperPanelTitle + ' page');
                });
            });
        }else{
        //For desktop/tablet viewport
          upperPanelBtns.forEach((btn) =>{
                btn.addEventListener('click', ()=>{
                    const panel = btn.closest('.upper-carousel');
                    const upperPanelTitle = panel.querySelector('.main-panel-upper-h2').textContent;            
                    alert('Link to ' + upperPanelTitle + ' page');
                });
            });
        }    
    });
}upperSlideContentsBtn();


//Upper panel carousel
function showSlide(index){
    //If next button clicked and reached the last slide, return to 1st slide
    if(index >= upperSlides.length){
        upperCarouselIndex = 0;
    //If previsou button clicked and pass 1st slide, display last slide    
    }else if(index < 0){
        upperCarouselIndex = upperSlides.length - 1;
    }
    //Remove this class name from the slide to diplay the next slide with this class name added into it
    upperSlides.forEach(slides => {
        slides.classList.remove('upper-display');
    });
    //Finally display the selected slide by adding this class name
    upperSlides[upperCarouselIndex].classList.add('upper-display');
}
//Previous button
function prevSlide(){
    //When previous button is clicked the auto aniamtion will stop = null
    clearInterval(intervalId);
    upperCarouselIndex--;
    showSlide(upperCarouselIndex);
}
//Next button
function nextSlide(){
    upperCarouselIndex++;
    showSlide(upperCarouselIndex);
}


//Main panel carousel
document.addEventListener('DOMContentLoaded', function() {
 //Get the Ul tag containers using its class name. Container for the carousel contents
 const carouselItemContainer = document.querySelector('.owl-carousel');
 //For previous and next button arrows
 const arrowBtns = document.querySelectorAll('.owl-carousel-container i');
 //Get the containers of each UL tags 
 const carouselContainer = document.querySelector('.owl-carousel-container');
 //Get LI tag as the carousel contents
 const firstItem = carouselItemContainer.querySelector('.carousel-item');
 //Get the layout width of the container/carousel item with all its contents
 const firstItemWidth = firstItem.offsetWidth;
 //Declare for when dragging on the screen
 let isDrag = false,
     startX,//Left/right movement
     startScrollLeft,//Storing scroll movement X axis
     timeoutId;//Scroll after mouse pointer leaving the container
 //When clicking and holding mouse
 const dragStart = (e) => {
    isDrag = true;
    carouselItemContainer.classList.add('dragging');//Add this class name when dragging
    startX = e.pageX;//Mouse cursor horizontal movement
    startScrollLeft = carouselItemContainer.scrollLeft;
 };
 
 //When removing mouse cursor out of the container
 const dragging = (e) => {
    if(!isDrag) return;
    const newScrollToLeft = startScrollLeft -(e.pageX - startX);//Get scroll to left action
    //If reached end of container to scroll to
    if(newScrollToLeft <= 0 || newScrollToLeft >=
       carouselItemContainer.scrollWidth - carouselItemContainer.offsetWidth ){
        isDrag = false;
        return;
       }
       carouselItemContainer.scrollLeft = newScrollToLeft;//Keep scrolling left
 };
 //If drag is released
 const dragStop = () => {
    isDrag = false;
    carouselItemContainer.classList.remove('dragging');
 };
//When leaving mouse cursor out of the container, scroll to left
 const autoPlay = () => {
    if(window.innerWidth < 900) return; 
    const totalItemWidth = carouselItemContainer.scrollWidth;
    const maxSCrollToLeft = totalItemWidth - carouselItemContainer.offsetWidth;
    if(carouselItemContainer.scrollLeft >= maxSCrollToLeft) return;
    timeoutId = setTimeout(() => carouselItemContainer.scrollLeft += firstItemWidth);
 };
   if(window.innerWidth <= 430){
    carouselItemContainer.removeEventListener('mousedown', dragStart);
    carouselItemContainer.removeEventListener('mousemove', dragging);
    document.removeEventListener('mouseup', dragStop);
    carouselContainer.removeEventListener('mouseenter', () => clearTimeout(timeoutId));
    carouselContainer.removeEventListener('mouseleave', autoPlay);
    //Previous/next button
    arrowBtns.forEach(btn => {
        btn.removeEventListener('click', () => {
            carouselItemContainer.scrollLeft += btn.id === 'left' ? -firstItemWidth : firstItemWidth;
        });
    });
   }else{
    carouselItemContainer.addEventListener('mousedown', dragStart);
    carouselItemContainer.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragStop);
    carouselContainer.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    carouselContainer.addEventListener('mouseleave', autoPlay);
    //Previous/next button
    arrowBtns.forEach(btn => {
       btn.addEventListener('click', () => {
           carouselItemContainer.scrollLeft += btn.id === 'left' ? -firstItemWidth : firstItemWidth;
       });
    });
    }
});
   
document.addEventListener('DOMContentLoaded', function() {
 const carouselItemContainerShoes = document.querySelector('.owl-carousel-shoes');
 const arrowBtns = document.querySelectorAll('.owl-carousel-container-shoes i');
 const carouselContainerShoes = document.querySelector('.owl-carousel-container-shoes');
 const firstItem = carouselItemContainerShoes.querySelector('.carousel-item-shoes');
 const firstItemWidth = firstItem.offsetWidth;

 let isDrag = false,
     startX,
     startScrollLeft,
     timeoutId;
 const dragStart = (e) => {
    isDrag = true;
    carouselItemContainerShoes.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carouselItemContainerShoes.scrollLeft;
 };
 const dragging = (e) => {
    if(!isDrag) return;
    const newScrollToLeft = startScrollLeft -(e.pageX - startX);
    if(newScrollToLeft <= 0 || newScrollToLeft >=
       carouselItemContainerShoes.scrollWidth - carouselItemContainerShoes.offsetWidth ){
        isDrag = false;
        return;
       }
       carouselItemContainerShoes.scrollLeft = newScrollToLeft;
 };
 const dragStop = () => {
    isDrag = false;
    carouselItemContainerShoes.classList.remove('dragging');
 };
 const autoPlay = () => {
    if(window.innerWidth < 600) return;
    const totalItemWidth = carouselItemContainerShoes.scrollWidth;
    const maxSCrollToLeft = totalItemWidth - carouselItemContainerShoes.offsetWidth;
    if(carouselItemContainerShoes.scrollLeft >= maxSCrollToLeft) return;
    timeoutId = setTimeout(() => carouselItemContainerShoes.scrollLeft += firstItemWidth);
 };
 
 if(window.innerWidth <= 430){
    carouselItemContainerShoes.removeEventListener('mousedown', dragStart);
    carouselItemContainerShoes.removeEventListener('mousemove', dragging);
    document.removeEventListener('mouseup', dragStop);
    carouselContainerShoes.removeEventListener('mouseenter', () => clearTimeout(timeoutId));
    carouselContainerShoes.removeEventListener('mouseleave', autoPlay);

    arrowBtns.forEach(btn => {
    btn.removeEventListener('click', () => {
        carouselItemContainerShoes.scrollLeft += btn.id === 'left-Shoes' ? -firstItemWidth : firstItemWidth;   
    });
 });
 }else{
    
    carouselItemContainerShoes.addEventListener('mousedown', dragStart);
    carouselItemContainerShoes.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragStop);
    carouselContainerShoes.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    carouselContainerShoes.addEventListener('mouseleave', autoPlay);

    arrowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            carouselItemContainerShoes.scrollLeft += btn.id === 'left-Shoes' ? -firstItemWidth : firstItemWidth;  
        });
    });
 }
});


//For the items in lower panel
document.addEventListener('DOMContentLoaded', () =>{
    let lowerPanelBtn = document.querySelectorAll('.best-offer-button');
    lowerPanelBtn.forEach(function (Btn){
        Btn.addEventListener('click', () =>{
             alert('Link to ' + Btn.querySelector('span').textContent + ' page');
        });
    });

    let lowerPanelCardLinks = document.querySelectorAll('.lower-panel-item-card-links');
    lowerPanelCardLinks.forEach(function (aTag){
        aTag.addEventListener('click', ()=>{
            alert('Link to ' + aTag.textContent + ' page');
        });
    });

    //This is for the links of footer
    let footerLnks = document.querySelectorAll('.footer-links');
    footerLnks.forEach(function (foot){
        foot.addEventListener('click', ()=>{
            alert('Link to ' + foot.textContent + ' page');
        });
    });
})


//loading="lazy" JS style for images
document.addEventListener('DOMContentLoaded', ()=>{
    const lazyImages = document.querySelectorAll('img[data-src]');
    const crossIntersection = new IntersectionObserver(crossIntersectionHandler, {
    rootMargin: "0px 0px 150px 0px", //preload 150px before image enters. It will start displaying imgages when scrolling gets near that value
    threshold: 0                    //fire early
    });

    function crossIntersectionHandler(entries, observer){
        for(const entry of entries){
            if(entry.intersectionRatio > 0){
                entry.target.src = entry.target.dataset.src;
                //entry.target.src = entry.target.getAttribute('data-src'); //This line is the same as the code just above it
            }   
        }
    }
    lazyImages.forEach(img => crossIntersection.observe(img));
});


