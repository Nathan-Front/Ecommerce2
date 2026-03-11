
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
        createForm.reset();
    });
}

function loginAccount(){
    const loginForm = document.getElementById("mobile-form-submit");
    loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const inputUser = document.getElementById("input-user-name");
        const inputPass = document.getElementById("input-user-pass");
        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const existUser = users.find(user => user.userName === inputUser.value && user.userPassword === inputPass.value);
        if(existUser){
            localStorage.setItem("loggedUser", JSON.stringify(existUser));
            const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
            if(savedUser){
                document.getElementById("user-to-log").textContent = savedUser.userName;
            }
            closeAll();
        }else{
            alert("Invalid username or password");
        }
    });
}
//Use to restore the logged in user
async function restoreLoggedUser(){
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(!savedUser) return;
    const displayUser = document.getElementById("user-to-log");
    if(displayUser) {
        displayUser.textContent = savedUser.userName;
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