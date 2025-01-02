const navbar=()=>{
    let card= `
    <div id="logo">
        <a href="./index.html">
       <img src="./Images/WhatsApp_Image_2024-12-30_at_6.04.25_PM-removebg-preview.png" alt="PrimaCart Logo" width="200px">
    </a> </div>
 
      <form id="prima_search">
                        <a href="" style="color: black; margin-left: 12px;">
                            <span id="search_icon">
                                <!-- SVG for outlined search icon -->
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </span>
                        </a>

                        <input id="search-input" type="text" placeholder="Search on PrimaCart"
                            style="height: 30px;margin-left:0px;">
                    </form>

    <div id="navbar-links">
   
       <a href="./login1.html" ><img src="./Images/profile-52e0dc.svg" alt="" width="30px"></a>
       <a href="./wishlist.html"><img src="./Images/wishlist (2).png" alt="wishlist Image" width="25px"></a>
       <a href="./cart.html" font-size="100px"> <img src="./Images/download-removebg-preview.png"  width="25px" alt=""></a>
    </div>`

       document.getElementById("navbar").innerHTML=card;
}
navbar();

  //  <input type="search" placeholder="Search for Products">