//Creating account function
function createAccount(){
    const createForm = document.getElementById("create-accnt-btn");
    createForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const inputName = document.getElementById("input-uName");
        const inputPass = document.getElementById("input-pass");
        const inputMail = document.getElementById("input-email");
        const inputContact = document.getElementById("input-number");
        const dateRegistered = new Date().toISOString();
        const registryId = Date.now();

        const userRegister = {
            registryID: registryId,
            userName: inputName.value,
            userPassword: inputPass.value,
            userMail: inputMail.value,
            userContact: inputContact.value,
            dateRegistery: dateRegistered
        };
        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const existingUser = users.find(user =>user.userMail === inputMail.value || user.userPassword === inputPass.value);
        if (existingUser) {
            if (existingUser.userPassword === inputPass.value) {
                alert("Password already taken");
            } else {
                alert("Email already registered");
            }
            return;
        }
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