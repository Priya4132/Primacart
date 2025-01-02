const footer=()=>{
    let card=`
    <div id="footer-links"> <div class="footer-links1">
    <h2>About US</h2>
    <a href="./index.html">Get to Know PrimaCart</a>
    <a href="./index.html">Charitable Contributions</a>
    <a href="./index.html">Company Information</a>
    <a href="./index.html">Careers</a>
    <a href="./index.html">PrimaCart Blog</a>

    </div>
    <div class="footer-links1">
        <h2>MemberShip</h2>
        <a href="./index.html">Membership Information</a>
        <a href="./index.html">Join Now</a>
        <a href="./index.html">Member Privileges</a>
        <a href="./index.html">Sign In or Register</a>
        <a href="./index.html">Credit Card</a>
    
        </div>
        <div class="footer-links1">
            <h2>Customer Service</h2>
            <a href="./index.html">PrimaCart Customer Service</a>
            <a href="./index.html">Order Status</a>
            <a href="./index.html">Shipping</a>
            <a href="./index.html">Returns and Exchanges</a>
            <a href="./index.html">Preventing Fraud</a>
        
            </div>
            <div class="footer-links1">
                <h2>Locations & Services</h2>
                <a href="./index.html">Find a Warehouse</a>
                <a href="./index.html">Special Events</a>
                <a href="./index.html">Hours and Holiday Closures</a>
                <a href="./index.html">PrimaCartGrocery</a>
                <a href="./index.html">Grocery by Instacart</a>
            
                </div> </div>`

                document.getElementById("footer").innerHTML=card;
}

footer();