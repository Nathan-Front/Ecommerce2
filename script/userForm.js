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

    const cancelInput = document.getElementById("cancel-create-input");
    cancelInput.addEventListener("click", ()=>{
        document.getElementById("create-accnt-btn").reset();
    });
}

//Loggin account function
function loginAccount(){
    const loginForm = document.getElementById("mobile-form-submit");
    loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const inputUser = document.getElementById("input-user-name");
        const inputPass = document.getElementById("input-user-pass");
        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const existUser = users.find(user => user.userName === inputUser.value && user.userPassword === inputPass.value);
        const userLogIndicator = "../images/logo/profile-user-svgrepo-com-green.svg";
        if(existUser){
            localStorage.setItem("loggedUser", JSON.stringify({
                user: existUser,
                indicator: userLogIndicator
            }));
            const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
            const rememberMe = document.getElementById("mobile-remember-me");
            if(rememberMe.checked){
                localStorage.setItem('rememberUserName', JSON.stringify(inputUser.value));
            }else{
                localStorage.removeItem('rememberUserName');
            }
            if(savedUser){
                document.getElementById("user-to-log").textContent = savedUser.user.userName;
                document.getElementById("mobile-user-to-log").textContent = savedUser.user.userName;
                document.getElementById("mobile-login-button").src = savedUser.indicator;
            }
            closeAll();
        }else{
            alert("Invalid username or password");
        }
    });

    const cancelInput = document.getElementById("mobile-cancel-input");
    cancelInput.addEventListener("click", ()=>{
        document.getElementById("mobile-form-submit").reset();
    });
}
//Use to restore the logged in user on reload
async function restoreLoggedUser(){
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(!savedUser) return;
    const displayUser = document.getElementById("user-to-log");
    const displayUserMob =  document.getElementById("mobile-user-to-log");
    const logIndicator = document.getElementById("mobile-login-button");
    if(displayUser) {
        displayUser.textContent = savedUser.userName;
        displayUserMob.textContent = savedUser.user.userName;
        logIndicator.src = savedUser.indicator;
    }
}

function signOut(){
    const signOutBtn = document.getElementById("sign-out");
    signOutBtn.addEventListener("click", ()=>{
        localStorage.removeItem("loggedUser");
        alert("Signed out");
        window.location.href = "index.html";
    });
}