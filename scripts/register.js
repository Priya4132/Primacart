// navbar functionallity

const navbar=()=>{
    let card= `
    <div id="logo">
        <a href="./index.html">
       <img src="./Images/WhatsApp_Image_2024-12-29_at_11.56.41_PM-removebg-preview.png" alt="PrimaCart Logo" width="100px">
    </a> </div>
   `

       document.getElementById("register-navbar").innerHTML=card;
}
navbar();


// register form

let form = document.getElementById("form");
form.addEventListener("submit", async function () {
  event.preventDefault();
  let username = form.username.value;
  let email = form.email.value;
  let password = form.password.value;
//   let gender = form.gender.value;
  let mobile = form.mobile.value;
  let userObj = { username, email, password, mobile };

  try {
   let res=await  fetch("https://polarized-concrete-desert.glitch.me/customers");
   let data= await res.json();
   let user=data.filter((el,i)=> el.email==email);
   if(user.length!=0){
    alert("User Already Registered , Please login");
    window.location.href="login.html"
   }
   else{//if user not present push data to json server
    await fetch("https://polarized-concrete-desert.glitch.me/customers" , {
        method:"POST",
        headers: {
            "content-type":"application/json"
        },
        body:JSON.stringify(userObj)
    });
    alert("Signup successful");
       window.location.href="login.html"
   }
  }
  catch{
console.log("not able to signup")
  }
});