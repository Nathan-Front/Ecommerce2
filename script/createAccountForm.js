//Creating account function
function createAccount(){
    const createForm = document.getElementById("create-accnt-btn");
    createForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const inputName = document.getElementById("input-uName");
        const inputPass = document.getElementById("input-pass");
        const inputMail = document.getElementById("input-email");
        const inputContact = document.getElementById("input-number");
        const dateRegistered = new Date().toISOString();
        const registryId = Date.now();
        showError(inputMail);
        if (!validateEmail(inputMail.value)) {
            showError(inputMail);
            return;
        }
        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const existingUser = users.find(user =>user.userMail === inputMail.value || user.userPassword === inputPass.value);
        if (existingUser) {
            alert("Email already registered");
            return;
        }
        const hashedPass = await hashPassword(inputPass.value.trim());
        const userRegister = {
            registryID: registryId,
            userName: inputName.value,
            userPassword: hashedPass,
            userMail: inputMail.value,
            userContact: inputContact.value,
            dateRegistery: dateRegistered,
            cart: []
        };
        users.push(userRegister);
        localStorage.setItem("registeredUsers", JSON.stringify(users));
        
        const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if(savedUser){
            alert("Account created");
            window.location.href = "index.html";
            return;
        }else{
            alert("Account created");
            const formWrap = document.querySelector(".mobile-form");
            const isOpen = formWrap.classList.contains("showLoginDesk");
            closeAll();
            document.getElementById("create-accnt-btn").reset();
            if(!isOpen){
                formWrap.classList.add("showLoginDesk");
                document.body.classList.add("no-scroll");
                const overlay = document.getElementById("overlay");
                overlay.classList.toggle("cover");
            }
        }

    });
    //Cancel button of the form
    const cancelInput = document.getElementById("cancel-create-input");
    cancelInput.addEventListener("click", ()=>{
        document.getElementById("create-accnt-btn").reset();
    });
}

//Warning error for wrong email format
function showError(email) {
    document.querySelectorAll("small.error").forEach(el => el.textContent = ""); 
    document.querySelectorAll("input").forEach(el => el.classList.remove("error-border"));
    if (!validateEmail(email.value)) {
        const error = email.parentElement.querySelector("small.error"); //parentElement is the container where small belong to
        if (error) {
            error.textContent = "Enter a valid email";
        }
        email.classList.add("error-border");
    }
}

//Email validator
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email)
}