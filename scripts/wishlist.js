// import { logout } from "./scripts/logout.js";

const selecttag= document.getElementById('selecttag');

selecttag.addEventListener('change', function () {
  const selectedValue = this.value;
  if (selectedValue) {
    window.location.href = selectedValue; // Navigate to the selected page
  }
});


let customerData = JSON.parse(localStorage.getItem("customersData"));


// displaying customer name in navbar

if(!customerData){
  
    document.getElementById(
        "user-name"
      ).textContent = `Welcome, Guest`;
    
    }
    else{
        document.getElementById(
            "user-name"
          ).textContent = `Welcome, ${customerData.signup_name}`; 
    }
    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loginData");
        alert("Redirecting to Home Page....");
        window.location.href = "index.html";
      });
    







window.onload = async () => {
    // let data=await getFurnitureDetails();
    let customerData = JSON.parse(localStorage.getItem("customersData"));
    // console.log(customerData);

    let customerId = null;
    if (customerData != null) {
        customerId = customerData.id;
    }
    let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || [];//fetching wishlisted products from local storage if already present or an empty array
    // console.log("wishListPerCustomer=", wishListPerCustomer);
    let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
    // console.log("wishlistForThisCustomer=", wishlistForThisCustomer);
    if (wishlistForThisCustomer == undefined || wishListPerCustomer == null) {
        alert("No products in wishlist!")
    } else {
        let wishArray = wishlistForThisCustomer.wishArray;
        // console.log("wishArray=", wishArray);
        showWishlistProductDetails(wishArray);
    }

}
// let wishArray = JSON.parse(localStorage.getItem("wishlistedProducts"));




//js code for showing fuirniture details

function showWishlistProductDetails(arr) {
    let wishlist_cont = document.getElementById("wishlist_cont");
    wishlist_cont.innerHTML = "";
    //   let filteredData=arr.filter((el,i)=> el.category=="furtinure");
    arr.map((item, i) => {
        let card = document.createElement("div");
        let product_name = document.createElement("h4");
        product_name.textContent = item.product_name;
        let price = document.createElement("h4");
        price.textContent = `Price:${item.price}`;
        let ratings = document.createElement("h4");
        ratings.textContent = `Ratings:${item.ratings}⭐`;

        let product_image = document.createElement("img");
        product_image.src = item.product_image;
        let specificationdiv = document.createElement("div");
        specificationdiv.append(product_name, price, ratings)
        //wishlist button    
        let removerwishlistbtn = document.createElement("button");
        removerwishlistbtn.textContent = "Remove from Wishlist"
        removerwishlistbtn.addEventListener("click", function () {
            if (confirm("Are you sure to remove item from Wishlist")) {
                removeWishlist(item.id)
           
             }
        })
        //add to cart button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {

            addtoCart(item);
            
        });



        

        card.append(product_image, specificationdiv, removerwishlistbtn, cartbtn);
        wishlist_cont.append(card);

    })
}


//add to cart function

function addtoCart(product) {
    if(product.stocks==0){
        alert("Item Out of Stock , We will notify you once product will be in stock");
    }
    else{
    let customerData = JSON.parse(localStorage.getItem("customersData"));
    // console.log(customerData);
    let customerId = null;
    if (customerData != null) {
        customerId = customerData.id;
        // console.log("customerId=", customerId);
    }
    let cartPerCustomer = JSON.parse(localStorage.getItem("cartPerCustomer")) || [];// Fetching wishlisted products from local storage if already present or an empty array
    // console.log("cartPerCustomer=", cartPerCustomer);
    let cartForThisCustomer = cartPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
    // console.log("cartForThisCustomer=", cartForThisCustomer);
    if (cartForThisCustomer == null || cartForThisCustomer == undefined) {
        let cartArray = [];
        cartArray.push(product);
        let cartForThisCustomer = {
            "customerId": customerId,
            "cartArray": cartArray
        };
        cartPerCustomer.push(cartForThisCustomer);
        localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
        alert("Product added to the cart");
    } else {
        let cartArray = cartForThisCustomer.cartArray;
        // console.log("cartArray=", cartArray);
        let matchedProduct = cartArray.filter((ele, i) => ele.id == product.id);
        // console.log("matchedProduct=", matchedProduct);
        if (matchedProduct.length != 0) {
            alert("Product already present in the Cart, Kindly visit the Cart Page to increase the quantity");
        } else {
            cartArray.push(product);
            localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
            alert("Product added to the Cart");
        }
    }
}
}




//remove from wishlist function
function removeWishlist(productId) {
    let customerData = JSON.parse(localStorage.getItem("customersData"));
    // console.log(customerData);
    let customerId = null;
    if (customerData != null) {
        customerId = customerData.id;
        // console.log("customerId=", customerId);
    }
    let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || []; // Fetching wishlisted products
    // console.log("wishListPerCustomer=", wishListPerCustomer);
    let wishlistForThisCustomer = wishListPerCustomer.filter((ele) => ele.customerId == customerId)[0];
    // console.log("wishlistForThisCustomer=", wishlistForThisCustomer);

    if (wishlistForThisCustomer == null || wishlistForThisCustomer == undefined) {
        alert("No products in the wishlist!");
    } else {
        let wishArray = wishlistForThisCustomer.wishArray;
        // console.log("wishArray before removal=", wishArray);

        // Filter out the product with the given productId
        let updatedWishArray = wishArray.filter((item) => item.id != productId);

        // If the product was not found
        if (updatedWishArray.length === wishArray.length) {
            alert("Product not found in the Wishlist!");
            return;
        }

        // Update the wishlist for this customer
        wishlistForThisCustomer.wishArray = updatedWishArray;

        // Update the wishListPerCustomer array in localStorage
        wishListPerCustomer = wishListPerCustomer.map((customer) =>
            customer.customerId == customerId ? wishlistForThisCustomer : customer
        );

        localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
        alert("Product removed from the wishlist");
        showWishlistProductDetails([])
        // console.log("wishArray after removal=", updatedWishArray);
    }
}
