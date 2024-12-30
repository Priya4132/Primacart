// functionality for login form

let form=document.getElementById("form");
form.addEventListener("submit", async function(){
event.preventDefault();
    let email=form.email.value;
    let password=form.password.value;
    //fetch server to check if email id and password in DB
    try{
        let res=await  fetch("https://polarized-concrete-desert.glitch.me/customers");
        let data= await res.json();
        let user=data.filter((el,i)=> el.email==email);
        //check if email is present or not
        if(user.length!=0){
            //now check for password
            if(user[0].password==password){
                alert("Login SuccessFul");
                localStorage.setItem("customersData", JSON.stringify(user[0]));//saving customers data in local storage
window.location.href="customerpage.html";//redirecting to customer page

            }
            else{//
alert("Wrong Password, Please login with Correct password");
window.location.href="login.html"
            }
        }
        //if customer email is not present in DB
        
            else {
                // user not present
                alert("User not registred, Please signup....");
                window.location.href = "signup.html"
                
              }
    s
    }
    catch(err){
        console.log(err);
        alert("Something Went Wrong ,Please try again later")
    }
});