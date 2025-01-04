// Ensure elements exist before accessing them to avoid errors
document.addEventListener("DOMContentLoaded", () => {
    const loginText = document.querySelector(".title-text .login");
    const signupText = document.querySelector(".title-text .signup");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");

    // let login_details = JSON.parse(localStorage.getItem("signup_details")) || [];

    // Show "Sign-In" and hide "Create Account"
    loginBtn.onclick = () => {
        loginForm.style.marginLeft = "0%";
        loginText.style.display = "block";
        signupText.style.display = "none";
    };

    // Show "Create Account" and hide "Sign-In"
    signupBtn.onclick = () => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.display = "none";
        signupText.style.display = "block";
    };

    // Simulate the signup button click when clicking the "Signup now" link
    signupLink.onclick = (event) => {
        event.preventDefault();
        signupBtn.click();
    };

    // Initial state for text visibility
    signupText.style.display = "none";
    loginText.style.display = "block";

    let signupButton = document.querySelector("#signup-submit");
    signupButton.addEventListener("click", async function () {
        event.preventDefault(); // Prevent form submission behavior
        
        let signup_name = document.querySelector("#signup-name").value.trim();
        let signup_email = document.querySelector("#signup-email").value.trim();
        let signup_pass = document.querySelector("#signup-password").value.trim();

        let userObj = { signup_name, signup_email, signup_pass};
        try {
            let res=await  fetch("http://localhost:3200/customers");
            let data= await res.json();
            let user=data.filter((el,i)=> el.email==signup_email);
            console.log(user)
            if(user.length!=0){
             alert("User Already Registered , Please login");
            //  window.location.href="login.html"
            }
            else{//if user not present push data to json server
             await fetch("http://localhost:3200/customers" , {
                 method:"POST",
                 headers: {
                     "content-type":"application/json"
                 },
                 body:JSON.stringify(userObj)
             });
             alert("Signup successful");
                // window.location.href="login.html"
            }
           }
           catch{
         console.log("not able to signup")
           }


        // console.log("clicked")
    })

        // let check = login_details.find((ele) => ele.signup_email === signup_email);









        // function for login button
 let loginButton = document.querySelector("#login-submit");
    loginButton.addEventListener("click", async function(){
        event.preventDefault(); // Prevent form submission behavior
        // console.log("clicked")
        let login_email = document.querySelector("#login-email").value.trim();
        let login_pass = document.querySelector("#login-password").value.trim();

        
        try{
            let res=await  fetch("http://localhost:3200/customers");
            let data= await res.json();
           // console.log(data)
            let user=data.filter((el,i)=> el.signup_email==login_email);
            //console.log(user[0])
            //check if email is present or not
            if(user.length!=0){

                if(user[0].signup_email== "admin@gmail.com"  ){
                    // window.location.href="admindashboard.html";
                    let adminEmail=user[0].signup_email;
                    let adminpass=user[0].signup_pass;
                    let adminName=user[0].signup_name
                    // console.log(adminpass)
                    // console.log(adminEmail)
                    let adminData={adminEmail,adminpass,adminName}
                    window.location.href="admindashboard.html"
                    localStorage.setItem("adminData",JSON.stringify(adminData));
                    return
                }
                //now check for password
                if(user[0].signup_pass==login_pass){
                    alert("Login SuccessFul");
                    localStorage.setItem("customersData", JSON.stringify(user[0]));//saving customers data in local storage
    window.location.href="index.html";//redinirecting to customer page
    
                }
                else{//
    alert("Wrong Password, Please login with Correct password");
   window.location.href="login1.html"
                }
            }
            //if customer email is not present in DB
            
                else {
                    // user not present
                    alert("User not registred, Please signup....");
                     window.location.href = "login1.html"
                    
                  }
        
        }
        catch(err){
            console.log(err);
            alert("Something Went Wrong ,Please try again later")
        }
    });
})
        
        
        


        
        
        
        
        
        
        
        
        
    