
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