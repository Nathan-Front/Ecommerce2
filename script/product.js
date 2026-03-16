async function fetchProducts(){
    const itemContainer = document.querySelector(".item-panel");
    const resClothe = await fetch("./product/clothes.html");
    const clotheHTML = await resClothe.text();
    itemContainer.innerHTML += clotheHTML;
    const resShoes = await fetch("./product/shoes.html");
    const shoesHTML = await resShoes.text();
    itemContainer.innerHTML += shoesHTML;
    const resOffers = await fetch("./product/bestOffers.html");
    const offersHTML = await resOffers.text();
    itemContainer.innerHTML += offersHTML;
    const resOutdoor = await fetch("./product/outdoor.html");
    const outdorrHTML = await resOutdoor.text();
    itemContainer.innerHTML += outdorrHTML;
}

//Add to cart function (Clothe and shoes). Event delegation
function addItemToCart(){
    const itemContainer = document.getElementById("Main-Panel"); //From items.html
    itemContainer.addEventListener("click", (e)=>{
        if(!e.target.classList.contains("add-cart-button")) return;
        const btn = e.target;
        const addItem = btn.closest(".list-of-items");
        const itemName = addItem.querySelector(".product-name").textContent;
        const itemPrice = addItem.querySelector(".item-price").textContent;
        const itemSeller = addItem.querySelector(".item-seller").textContent;
        const itemPic = addItem.querySelector(".item-img").src;
        const radioBtnSize = addItem.querySelector(".radio-button:checked");
        let size = "";
        if(radioBtnSize){
            size = radioBtnSize.value;
        }
        const dropdown = addItem.querySelector(".shoe-size-dropdown");
        if(dropdown &&  dropdown.selectedIndex > 0){
            const selectedOption = dropdown.options[dropdown.selectedIndex];
            size = selectedOption.dataset.size;
        }
        if(!size){
            alert("Please select a size.");
            return;
        }

        const itemCount = addItem.querySelector(".item-count");
        const quantity = parseInt(itemCount.textContent) || 1;
        const cart = cartArrayCondition();
        const existingItem = cart.find(
            item => item.itemN === itemName && item.itemSize === size //Search same item with same size selected
        ); 

        const price = Number(itemPrice);
        if(existingItem){
            existingItem.Qty += quantity; //Adding of quantity
            existingItem.totalP = existingItem.Qty * existingItem.itemP; //Total price of item
        }else{
            cart.push({
                itemId: Date.now(),
                itemN: itemName,
                itemP: price,
                itemS: itemSeller,
                itemImg: itemPic,
                itemSize: size,
                Qty: quantity,
                totalP: quantity * price,
            });
        }
        alert("Added to cart");
        saveToCartStorage(cart); //Add the item in here
        updateCartCounter();
        fetchCartContent();
    })
}

//Item quantity
function itemCount(){
    document.querySelectorAll(".counter-add").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const itemWrap = btn.closest(".list-of-items");
            const display = itemWrap.querySelector(".item-count");
            let count = parseInt(display.textContent);
            count++;
            display.textContent = count;
        });
    });
    document.querySelectorAll(".counter-minus").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const itemWrap = btn.closest(".list-of-items");
            const display = itemWrap.querySelector(".item-count");
            let count = parseInt(display.textContent); 
            if(count > 0){
                count--;
            }
            display.textContent = count;
        });
    });
}

//For cart counter
function updateCartCounter(){
    //const cart = JSON.parse(localStorage.getItem("cartContent")) || [];
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const tempCart = JSON.parse(localStorage.getItem("tempCartContent"));
    let cart = [];
    if(loggedUser){
        const userData = locateCartOfUser(); //Use registeredUsers cart array
        if(!userData) return;
        let {users, userIndex} = userData;
        cart = users[userIndex].cart || [];
    }else{
        cart = tempCart || [];
    }
    let totalItems = 0;
    cart.forEach(item=>{
        totalItems += item.Qty;
    });
    const mobileCartCounter = document.querySelector(".cart-counter");
    const cartCounter = document.getElementById("added-to-cart");
    if(mobileCartCounter){
        mobileCartCounter.textContent = totalItems;
    }
    if(cartCounter){
        cartCounter.textContent = totalItems;
    }
}

//finding the user in the user registry
function locateCartOfUser(){
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(!loggedUser) return;
    let users = JSON.parse(localStorage.getItem("registeredUsers"));
    if(!Array.isArray(users)) users = [];
    const userIndex = users.findIndex(user => user.registryID === loggedUser.user.registryID); //Compare logged user Id in registeredUsers
    if (userIndex === -1) return;
    users[userIndex].cart = users[userIndex].cart || [];
    return { users, userIndex };
}

//Temporary storage
function saveToCartStorage(cartContent) {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(loggedUser){ //Cart of logged user
        const userData = locateCartOfUser(); //Use registeredUsers cart array
        if(!userData) return;
        let {users, userIndex} = userData;
        users[userIndex].cart = cartContent;
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    }
    else{ //Temporary cart for logged out user
        localStorage.setItem("tempCartContent", JSON.stringify(cartContent));
    }
}

//Combine items from temporary to the cart of users when logging in
function mergeCartOnLogin(){
    const tempCart = JSON.parse(localStorage.getItem("tempCartContent")) || [];
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if(!loggedUser || tempCart.length === 0) return;
    const userData = locateCartOfUser(); //Use registeredUsers cart array
    if(!userData) return;
    let {users, userIndex} = userData;
    if(userIndex === -1) return;
    users[userIndex].cart = users[userIndex].cart || [];
    tempCart.forEach(tempItem =>{
        const existingItem = users[userIndex].cart.find(item =>
        item.itemN === tempItem.itemN &&
        item.itemSize === tempItem.itemSize
        );
        if(existingItem){
            existingItem.Qty += tempItem.Qty;
            existingItem.totalP = existingItem.Qty * existingItem.itemP;
        }else{
            users[userIndex].cart.push(tempItem); //If different add new item
        }
    });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    localStorage.removeItem("tempCartContent");
}


//For bestoffer and outdoors content
function otherProduct(){
    document.addEventListener("click", (e)=>{
        const btn = e.target.closest(".other-offer-button");
        const popup = document.querySelector(".popup-wrap");
        //If clicking a product button
        if(btn){
            const itemImg = btn.querySelector(".other-img").src;
            if(popup) popup.remove();
            const container = document.createElement("div");
            container.classList.add("popup-wrap");
            const closePop = document.createElement("button");
            closePop.classList = "Close-popup-container";
            closePop.textContent = "Close";
            const img = document.createElement("img");
            img.classList.add("popup-image","popup-img");
            img.src = itemImg;
            container.appendChild(img);
            container.appendChild(closePop);
            document.body.append(container);
            document.body.classList.add("no-scroll");
            const overlay = document.getElementById("overlay");
            overlay.classList.toggle("cover");
            closePopup();
            return;
        }
    });
}
function closePopup(){
    const closeBtn = document.querySelector(".Close-popup-container");
    if(!closeBtn) return;
    closeBtn.addEventListener("click", (e)=>{
        e.target.closest(".popup-wrap").remove();
        closeAll();
    });
}

function otherProductLinks(){
    document.addEventListener("click", (e) =>{
        const btn = e.target;
        const linkWrap = btn.closest(".item-panel-lower-link");
        if(!linkWrap) return;
        const linkContent = linkWrap.querySelector(".lower-panel-item-card-links").textContent;
        alert("Link to " + `${linkContent}` + " page");
            
    });
}