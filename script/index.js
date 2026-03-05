async function fetchNavigation(){
    const body = document.querySelector("body");

    const resHeader = await fetch("./nav/mainNav.html");
    const headerHTML = await resHeader.text();
    body.insertAdjacentHTML("afterbegin", headerHTML);
    const navContainer = document.querySelector(".title-cart-panel");


    const resCategory = await fetch("./header/categoryPanel.html");
    const categoryHTML = await resCategory.text();
    navContainer.innerHTML += categoryHTML;

    const resUpCarousel = await fetch("./upperCarousel/upperCarousel.html");
    const upCarouselHTML = await resUpCarousel.text();
    body.insertAdjacentHTML("beforeend", upCarouselHTML);

    const resUpItems = await fetch("./product/items.html");
    const itemsHTML = await resUpItems.text();
    body.insertAdjacentHTML("beforeend", itemsHTML);
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
   

    const resFooter = await fetch("./footer/footer.html");
    const footerlHTML = await resFooter.text();
    body.insertAdjacentHTML("beforeend", footerlHTML);
}

async function initAsync(){
    await fetchNavigation();
}
document.addEventListener("DOMContentLoaded", initAsync);