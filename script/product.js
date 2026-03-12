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

//Add to cart function
function addItemToCart(){
    const addToCartBtn = document.querySelectorAll(".add-cart-button");
    const cart = JSON.parse(localStorage.getItem("cartContent")) ||[];
    addToCartBtn.forEach(btn =>{
        btn.addEventListener("click", async ()=>{
            //Adding item to localstorage
            const itemWrap = btn.closest(".list-of-items");
            const itemName = itemWrap.querySelector(".product-name").textContent;
            const itemPrice = itemWrap.querySelector(".item-price").textContent;
            const itemSeller = itemWrap.querySelector(".item-seller").textContent;
            const itemPic = itemWrap.querySelector(".item-img").src;
            const selectedSize = itemWrap.querySelector(".radio-button:checked");
            let size = "";
            if(selectedSize){
            size = selectedSize.value;
            }
            const itemCount = itemWrap.querySelector(".item-count");
            const quantity = parseInt(itemCount.textContent) || 1;
            let totalPrice = Number(quantity) * Number(itemPrice);
            const cartContent = JSON.parse(localStorage.getItem("cartContent")) || [];
            cartContent.push({
                itemN: itemName,
                itemP: itemPrice,
                itemS: itemSeller,
                itemImg: itemPic,
                itemSize: size,
                Qty: quantity,
                totalP: totalPrice
            });
            localStorage.setItem("cartContent", JSON.stringify(cartContent));
            updateCartCounter();
        });
    });
}
function updateCartCounter(){
    const cart = JSON.parse(localStorage.getItem("cartContent")) || [];
    let totalItems = 0;
    cart.forEach(item=>{
        totalItems += item.Qty || 1;
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

async function fetchCartContent(){
    const cartWrap = document.getElementById("checkout-items");
    const resCartContent = await fetch("./cart/cartContent.html");
    const cartContentHTML = await resCartContent.text();
    const cart = JSON.parse(localStorage.getItem("cartContent")) ||[];
    cart.forEach(item =>{
        cartWrap.insertAdjacentHTML("beforeend", cartContentHTML);
        const lastItem = cartWrap.lastElementChild;
        lastItem.querySelector(".article-name").textContent = item.itemN;
        lastItem.querySelector(".article-price").textContent = item.itemP;
        lastItem.querySelector(".article-quantity").textContent = item.Qty;
        lastItem.querySelector(".article-size").textContent = item.itemSize;
        lastItem.querySelector(".article-seller").textContent = item.itemS;
        lastItem.querySelector(".article-image").src = item.itemImg;
        lastItem.querySelector(".article-total-price").textContent = item.totalP;
    });
}