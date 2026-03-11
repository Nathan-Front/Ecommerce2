
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
            const displayUser = document.getElementById("user-to-log");
            displayUser.textContent = existUser.userName;
            closeAll();
        }else{
            alert("Invalid username or password");
        }
    });
}