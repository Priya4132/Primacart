









window.onload = async () => {
    // let data=await getFurnitureDetails();
    let customerData = JSON.parse(localStorage.getItem("customersData"));
    console.log(customerData);
    let customerId = null;
    if (customerData != null) {
        customerId = customerData.id;
    }
    let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || [];//fetching wishlisted products from local storage if already present or an empty array
    console.log("wishListPerCustomer=", wishListPerCustomer);
    let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
    console.log("wishlistForThisCustomer=", wishlistForThisCustomer);
    if (wishlistForThisCustomer == undefined || wishListPerCustomer == null) {
        alert("No products in wishlist!")
    } else {
        let wishArray = wishlistForThisCustomer.wishArray;
        console.log("wishArray=", wishArray);
        showWishlistProductDetails(wishArray);
    }

}
// let wishArray = JSON.parse(localStorage.getItem("wishlistedProducts"));


// async function getFurnitureDetails() {
//     try{
// let res=await fetch("https://polarized-concrete-desert.glitch.me/furniture");
// let data=await res.json();
// return data;

//     } 

// catch(err){
//   console(err);
//   alert("Something Went Wrong, not able to fetch furniture details")
// }
//   }

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
        ratings.textContent = `Ratings:${item.ratings}`;

        let product_image = document.createElement("img");
        product_image.src = item.product_image;
        let specificationdiv = document.createElement("div");
        specificationdiv.append(product_name, price, ratings)
        //wishlist button    
        let removerwishlistbtn = document.createElement("button");
        removerwishlistbtn.textContent = "Remove from Wishlist"
        removerwishlistbtn.addEventListener("click", function () {
            if (confirm("Are you sure to remove item from Wishlist")) {


                let wishArray = JSON.parse(localStorage.getItem("wishlistedProducts")) || [];

                wishlist_cont.removeChild(card);
                wishArray.splice(i, 1);
                localStorage.setItem("wishlistedProducts", JSON.stringify(wishArray));
                location.reload(); // Refresh to reflect change
            }
        })
        //add to cart button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {
            // location.reload(); // Refresh to reflect changess
            let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            //check wether product is present in the cart
            if (item.stocks == 0) {
                alert("product Out of Stock");
            }
            else {


                let filteredArray = cartArray.filter((ele, i) => ele.id == item.id);
                // console.log("fa", filteredArray)
                // if filteredArray length == 1, item is prsent in the cart else not present
                if (filteredArray.length == 0) {
                    cartArray.push({ ...item, quantity: 1 });//spreading of old onject and adding a new key
                    //console.log("ca", cartArray)
                }
                else {
                    // if filteredArray length == 1, item is prsent in the cart
                    // just update the quantity key and store in localStoarge
                    // console.log("ca in the else", cartArray)
                    //console.log(el["quantity"]);
                    let newArr = cartArray.map((product, i) => {
                        if (product.id == item.id) {
                            product["quantity"]++
                            //console.log( item["quantity"])
                            return product
                            //return true;

                        }
                        else {
                            return product;
                        }
                    })
                    //console.log(newArr)
                    cartArray = [...newArr]
                }



                //console.log("before pushing", cartArray)
                localStorage.setItem("cartProducts", JSON.stringify(cartArray));
                alert("Product added to the cart");

            }

        });

        card.append(product_image, specificationdiv, removerwishlistbtn, cartbtn);
        wishlist_cont.append(card);

    })
}
