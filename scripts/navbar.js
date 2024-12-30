const navbar=()=>{
    let card= `
    <div id="logo">
        <a href="./index.html">
       <img src="./Images/WhatsApp_Image_2024-12-30_at_6.04.25_PM-removebg-preview.png" alt="PrimaCart Logo" width="200px">
    </a> </div>
    <input type="search" placeholder="Search for Products">

    <div id="navbar-links">
   
       <a href="./login.html" ><img src="./Images/profile-52e0dc.svg" alt="">Login</a>
       <a href="./register.html"><img src="./Images/download__1_-removebg-preview.png" alt="" width="25px">Register</a>
       <a href="./cart.html" font-size="100px"> <img src="./Images/download-removebg-preview.png"  width="25px" alt="">Cart</a>
    </div>`

       document.getElementById("navbar").innerHTML=card;
}
navbar();

