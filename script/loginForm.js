//Loggin account function
function loginAccount(){
    const loginForm = document.getElementById("mobile-form-submit");
    loginForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const inputUser = document.getElementById("input-user-name");
        const inputPass = document.getElementById("input-user-pass");
        const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const hashedInput = await hashPassword(inputPass.value);

        const existUser = users.find(user => user.userName === inputUser.value && user.userPassword === hashedInput);
        const userLogIndicator = "./images/logo/profile-user-svgrepo-com-green.svg";
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
    //Remember me 
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
    //Profile picture at mobile viewport
    const profilePic = document.getElementById('profile-picture');
    if (savedUser?.user.profileImage) {
        profilePic.src = savedUser.user.profileImage;
    }
}

//For long user name at hover tooltip display
function hoverLongNameUsers(){
    const userNameHover = document.querySelector('.user-name-logged');
    userNameHover.addEventListener('mouseenter', () => {
    if (userNameHover.scrollWidth > userNameHover.clientWidth) { //if the logged user name is longer than the displayed
        userNameHover.title = userNameHover.textContent; //Display the full user name
    }else{
        userNameHover.removeAttribute('title');
    }
    });
}