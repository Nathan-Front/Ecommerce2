
//Cart content
async function fetchCartContent(){
    const cartWrap = document.getElementById("checkout-items");
    const resCartContent = await fetch("./cart/cartContent.html");
    const cartContentHTML = await resCartContent.text();
    const cart = JSON.parse(localStorage.getItem("cartContent")) ||[];
    cartWrap.innerHTML = ""; //CLear content of container 
    cart.forEach(item =>{
        cartWrap.insertAdjacentHTML("beforeend", cartContentHTML);
        const lastItem = cartWrap.lastElementChild;
        lastItem.dataset.id = item.itemId; //Special ID for the item in cart
        lastItem.querySelector(".article-name").textContent = item.itemN;
        lastItem.querySelector(".article-price").textContent = item.itemP;
        lastItem.querySelector(".article-quantity").textContent = item.Qty;
        lastItem.querySelector(".article-size").textContent = item.itemSize;
        lastItem.querySelector(".article-seller").textContent = item.itemS;
        lastItem.querySelector(".article-image").src = item.itemImg;
        lastItem.querySelector(".article-total-price").textContent = item.totalP;
    });
}

//Delete function. Event delegation
function deleteItemInCart(){
    const cartWrap = document.getElementById("checkout-items"); //Container of items
    cartWrap.addEventListener("click", (e)=>{
        if(!e.target.classList.contains("article-delete-button")) return; //If not delete button element do nothing
        const delItem = e.target.closest(".cart-display-wrap"); //Item to be deleted
        const itemId = Number(delItem.dataset.id); //Use the special ID of item
        let cart = JSON.parse(localStorage.getItem("cartContent")) || [];
        cart = cart.filter(item => item.itemId !== itemId); //Filter out the item
        localStorage.setItem("cartContent", JSON.stringify(cart)); //Resave to update the localstorage
        fetchCartContent();
        updateCartCounter();
    });
}

//Payment
function paymentSummary(){
    const paymentBtn = document.getElementById("to-payment");
    paymentBtn.addEventListener("click", ()=>{
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if(loggedUser){
        const cart = JSON.parse(localStorage.getItem("cartContent")) || [];
        const totalPrice = cart.reduce((sum, item) => sum + item.totalP, 0); //array.reduce((accumulator, currentItem) => {return newValue;}, initialValue);
        alert("Total balance is: $" + `${totalPrice}`);
        }else{
            alert("Login is needed");
        }
    }); 
}