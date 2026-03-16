async function initAsync(){
    await fetchNavigation();
    await fetchBodyContent();
    await fetchProducts();
    await fetchPopupPanels();
    restoreLoggedUser();
    categoryToggle();
    animateUpperImages();
    upperPanel();
  
    
    backToTop();

    returnHome();
    burgerButton();
    mobileNewsContent();
    mobileCart();     
    userDisplay(); 

    loginCreateForm();
    createAccount();
    loginAccount();
    forgotPassword();
    hoverLongNameUsers();
    uploadProfile();
    signOut();
    
    addItemToCart();
    itemCount();
    await loadCartTemplate();
    await fetchCartContent();
    updateCartCounter();
    deleteItemInCart();
    paymentSummary();

    otherProduct();
    otherProductLinks();
    
}
document.addEventListener("DOMContentLoaded", initAsync);