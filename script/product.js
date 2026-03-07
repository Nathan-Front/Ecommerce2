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
