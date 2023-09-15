const register=()=>{
    const email=$('#email').val();
    const password=$('#password').val();
    
        firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then((cred)=>{
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.success(`${cred.user} Added!`, 'success!')
            window.location.replace("./login.html");
        })
        .catch((error)=>{
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.error("Error")
            console.log(error);
        })
    
};

const alreadyHaveAnAccount=()=>{
    window.location.replace("./login.html");
}