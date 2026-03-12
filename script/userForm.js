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
            restoreLoggedUser();
        }else{
            alert("Invalid username or password");
        }
    });
    //Cancel button of the form
    const cancelInput = document.getElementById("mobile-cancel-input");
    cancelInput.addEventListener("click", ()=>{
        document.getElementById("mobile-form-submit").reset();
    });
}

//Use to restore the logged in user on reload
function restoreLoggedUser(){
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(savedUser){
        const displayUser = document.getElementById("user-to-log");
        const displayUserMob = document.getElementById("mobile-user-to-log");
        const logIndicator = document.getElementById("mobile-login-button");
        if(displayUser){
            displayUser.textContent = savedUser.user.userName;
        }
        if(displayUserMob){
            displayUserMob.textContent = savedUser.user.userName;
        }
        if(logIndicator){
            logIndicator.src = savedUser.indicator;
        }
    }

    const savedRemember = JSON.parse(localStorage.getItem("rememberUserName"));
    if(savedRemember){
        const inputUser = document.getElementById("input-user-name");
        const rememberMe = document.getElementById("mobile-remember-me");
        if(inputUser){
            inputUser.value = savedRemember;
        }
        if(rememberMe){
            rememberMe.checked = true;
        }
    }

    const profilePic = document.getElementById('profile-picture');
    if (savedUser?.user.profileImage) {
        profilePic.src = savedUser.user.profileImage;
    }
}

function uploadProfile(){
    const uploadImg = document.getElementById("upload-pic-Btn");
    const fileInput = document.getElementById('profile-pic-upload');
    const profilePic = document.getElementById('profile-picture');
    uploadImg.addEventListener('click', () => {
        fileInput.click(); //Open folder
    });

    fileInput.addEventListener("change", ()=>{
        const file = fileInput.files[0]; //Get only one picture
        if(!file) return;
        if(!file.type.startsWith('image/')){ //Check if the selected file's MIME type is not an image
            alert('Select only an image file');
            return;
        }

        const reader = new FileReader(); //Create reader fo the file being selected
        reader.onload = () =>{ //When the reader finished reading the file
            const imageData = reader.result;
            profilePic.src = imageData; //Selected picture source
            const users = JSON.parse(localStorage.getItem('registeredUsers')) || []; //Storage of users
            const loggedUser = JSON.parse(localStorage.getItem('loggedUser')); //Storage of logged user
            if (!loggedUser) return;
            const userIndex = users.findIndex(u => u.registryID === loggedUser.user.registryID); //Search for the logged user
            if (userIndex === -1) return; //If user not logged
            users[userIndex].profileImage = imageData; //Add the picture to that searched user
            localStorage.setItem('registeredUsers', JSON.stringify(users)); //Save it to the user localstorage
            localStorage.setItem('loggedUser', JSON.stringify({
                user: users[userIndex],
                indicator: loggedUser.indicator
            }));
        };
        reader.readAsDataURL(file);//This open the file (image/picture) and covert it to string
    });

}

//Signout all
function signOut(){
    const signOutBtn = document.querySelectorAll(".sign-out");
    signOutBtn.forEach(btn =>{
        btn.addEventListener("click", ()=>{
            localStorage.removeItem("loggedUser");
            alert("Signed out");
            window.location.href = "index.html";
        });
    });
    
}