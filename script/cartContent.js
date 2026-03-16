//For asynchronous cart content display
let cartTemplate = "";
async function loadCartTemplate(){
    const res = await fetch("./cart/cartContent.html");
    cartTemplate = await res.text();
}

//Cart content
async function fetchCartContent(){
    const cartWrap = document.getElementById("checkout-items");
    if(!cartWrap) return;
    let cart = cartArrayCondition(); //Select which array to use
    
    cartWrap.innerHTML = ""; //CLear content of container first
    cart.forEach(item =>{
        cartWrap.insertAdjacentHTML("beforeend", cartTemplate);
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

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        let cart = cartArrayCondition(); //Select which array to use
        cart = cart.filter(item => item.itemId !== itemId); //Filter out the item
        alert("Item deleted");
        if(loggedUser){ //Cart of logged user
            const userData = locateCartOfUser(); //Use registeredUsers cart array
            if(!userData) return;
            let {users, userIndex} = userData;
            users[userIndex].cart = cart; //Pass the unfiltered item here
            localStorage.setItem("registeredUsers", JSON.stringify(users));
        }else{ //Temporary cart for logged out user
            localStorage.setItem("tempCartContent", JSON.stringify(cart));
        }
        fetchCartContent();
        updateCartCounter();
    });
}

//for switching array to be used
function cartArrayCondition(){
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const tempCart = JSON.parse(localStorage.getItem("tempCartContent")) || [];
    if(loggedUser){
        const userData = locateCartOfUser(); //Use registeredUsers cart array
        if(!userData) return [];
        const { users, userIndex } = userData;
        return users[userIndex].cart || [];

    }else{
        return tempCart; //Use temporary cart
    }
}

//Payment
function paymentSummary(){
    const paymentBtn = document.getElementById("to-payment");
    paymentBtn.addEventListener("click", ()=>{
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if(!loggedUser){
            alert("Login is needed");
            return;
        }
        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const userIndex = users.findIndex(user => user.registryID === loggedUser.user.registryID); //Compare logged user ID and registeredUsers ID
        if (userIndex === -1) return;

        const cart = users[userIndex].cart || [];
        const totalPrice = cart.reduce((sum, item) => sum + item.totalP, 0); //array.reduce((accumulator, currentItem) => {return newValue;}, initialValue);
        alert("Total balance is: $" + totalPrice.toFixed(2));
    }); 
}