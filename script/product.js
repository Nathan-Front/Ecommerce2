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
        if (radioBtnSize) {
            size = radioBtnSize.value;
        }

        const dropdown = addItem.querySelector(".shoe-size-dropdown");
        if (dropdown &&  dropdown.selectedIndex > 0) {
            const selectedOption = dropdown.options[dropdown.selectedIndex];
            size = selectedOption.dataset.size;
        }

        if (!size) {
            alert("Please select a size.");
            return;
        }
        console.log(size);
        const itemCount = addItem.querySelector(".item-count");
        const quantity = parseInt(itemCount.textContent) || 1;
        const cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];
        const existingItem = cartContent.find(
            item => item.itemN === itemName && item.itemSize === size //Add current item even if its already in cart, only when size is different
        );                                                            //Else just increase quantity of it
        if(existingItem){
            existingItem.Qty += quantity; //Adding of quantity
            existingItem.totalP = existingItem.Qty * Number(itemPrice); //Total price of item
        
        }else{
            cartContent.push({
                itemId: Date.now(),
                itemN: itemName,
                itemP: itemPrice,
                itemS: itemSeller,
                itemImg: itemPic,
                itemSize: size,
                Qty: quantity,
                totalP: quantity * Number(itemPrice)
            });
        }
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
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
    const cart = JSON.parse(localStorage.getItem("cartContent")) || [];
    let totalItems = 0;
    cart.forEach(item=>{
        totalItems += item.Qty || 1; //fallback to 1 if 0 null or empty
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

//For bestoffer and outdoors content
function otherProduct(){
    document.addEventListener("click", (e)=>{

        const btn = e.target.closest(".best-offer-button");
        const popup = document.querySelector(".popup-wrap");

        // If clicking a product button
        if(btn){

            const itemImg = btn.querySelector(".other-img").src;

            if(popup) popup.remove();

            const container = document.createElement("div");
            container.classList.add("popup-wrap");

            const img = document.createElement("img");
            img.classList.add("popup-image","popup-img");
            img.src = itemImg;

            container.appendChild(img);
            document.body.append(container);

            return;
        }

        // Clicked somewhere else → close popup
        if(popup && !e.target.closest(".popup-wrap")){
            popup.remove();
        }

    });
}