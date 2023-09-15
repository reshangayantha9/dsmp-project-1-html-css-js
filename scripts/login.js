const login=()=>{
    const email=$('#email').val();
    const password=$('#password').val();
    
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then((cred)=>{
            window.location.replace("./dashbord.html");
        })
        .catch((err)=>{
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.error('Invalid username or password','Error!')
        })
};
const createAnAccount=()=>{
    window.location.replace("./signup.html");
};