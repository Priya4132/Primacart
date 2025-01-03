// slider functinality
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

function showSlide(index) {
    const slideWidth = slideImages[0].clientWidth;
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slideImages.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === slideImages.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
});

// admin login page

// const { json } = require("body-parser");

let adminloginbtn = document.getElementById("adminloginbtn");
adminloginbtn.addEventListener("click", function () {
    let adminform = document.getElementById("admin-form")
    adminform.style.display = "flex";//catching admin login form
});

// close modal
let closemodal = document.getElementById("close_modal");
closemodal.addEventListener("click", function () {
    let adminform = document.getElementById("admin-form")
    adminform.style.display = "none";
})


//catching admin form for checking credentials

const adminUsername = "admin";
const adminPassword = "admin123";

// Redirect to dashboard if already logged in
if (localStorage.getItem("username") && localStorage.getItem("password")) {
    if (
        localStorage.getItem("username") === adminUsername &&
        localStorage.getItem("password") === adminPassword
    ) {
        window.location.href = "dashboard.html";
    } else {
        // Clear incorrect credentials
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
}

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check credentials
    if (username === adminUsername && password === adminPassword) {
        localStorage.setItem("username", username); // Save username
        localStorage.setItem("password", password); // Save password
        alert("Login successful!");
        window.location.href = "admindashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid username or password.");
    }
});


//customer login



//JS code for category wise displaying clothing category data

let clothing_img = document.getElementById("clothing_img");
clothing_img.addEventListener("click", async function () {

    let filterbyprice=document.getElementById("filterbyprice");
    filterbyprice.style.display="flex";
    filterbyprice.addEventListener("change", async function(){
        if(filterbyprice.value=="1 to 4999"){
            let data = await getClothingDetails();
            let filteredData=data.filter((el,i)=> el.category=="clothing" && (el.price>=1 && el.price <=4999));
                console.log(filteredData)
                showClothingDetails(filteredData);
            
            }
          else  if(filterbyprice.value==" 5000 to 19999"){
                let data = await getClothingDetails();
                let filteredData=data.filter((el,i)=> el.category=="clothing" && (el.price>=5000 && el.price <=20000));
                    console.log(filteredData)
                    showClothingDetails(filteredData);
                
                }


                    else if(filterbyprice.value=="20000 to 39999"){
                        let data = await getClothingDetails();
                        let filteredData=data.filter((el,i)=> el.category=="clothing" && (el.price>20000 && el.price <=39999));
                            console.log(filteredData)
                            showClothingDetails(filteredData);
                    }
                    else{
                        let data = await getClothingDetails();
                        let filteredData=data.filter((el,i)=> el.category=="clothing" && (el.price>40000 ));
                            console.log(filteredData)
                            showClothingDetails(filteredData);   
                    }




});


    let clothing_cont = document.getElementById("clothing_cont");
    clothing_cont.style.display = "grid";
    let electronics_cont = document.getElementById("electronics_cont");
    electronics_cont.style.display = "none";
    let furniture_cont = document.getElementById("furniture_cont");
    furniture_cont.style.display = "none";
    // console.log("clicked")
    let data = await getClothingDetails();
    showClothingDetails(data);
})
// http://localhost:3200/furniture
// https://polarized-concrete-desert.glitch.me/furniture
async function getClothingDetails() {
    try {
        let res = await fetch("http://localhost:3000/furniture");
        let data = await res.json();
        return data;

    }

    catch (err) {
        console.log(err);
        alert("Something Went Wrong, not able to fetch clothing details")
    }
}

//js code for showing clothing  details

function showClothingDetails(arr) {
    let clothing_cont = document.getElementById("clothing_cont");
    clothing_cont.innerHTML = "";
    let filteredData = arr.filter((el, i) => el.category == "clothing");
    filteredData.map((item, i) => {
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
        // Decrease Quantity Button
        let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "Decrease Quantity";
        decreaseBtn.addEventListener("click", function () {
            let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            let newArr = cartArray.map((product) => {
                if (product.id === item.id) {
                    product["quantity"]--;
                    item.stocks++;
                    if (product["quantity"] === 0) {
                        return null; // Mark for removal
                    }
                    return product;
                } else {
                    return product;
                }
            }).filter(Boolean); // Remove null items
            localStorage.setItem("cartProducts", JSON.stringify(newArr));
        });

        // Increase Quantity Button
        let increaseBtn = document.createElement("button");
        increaseBtn.textContent = "Increase Quantity";
        increaseBtn.addEventListener("click", function () {
            let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            let newArr = cartArray.map((product) => {
                if (product.id === item.id) {
                    if (item.stocks > 0) {
                        product["quantity"]++;
                        item.stocks--;
                    } else {
                        alert("No more stock available");
                    }
                    return product;
                } else {
                    return product;
                }
            });
            localStorage.setItem("cartProducts", JSON.stringify(newArr));
        });

        //wishlist button    
        let wishlistbtn = document.createElement("button");
        wishlistbtn.textContent = "Wishlist";
        wishlistbtn.addEventListener("click", function () {
            addWishlist(item);
            // let customerData = JSON.parse(localStorage.getItem("customersData"));
            // console.log(customerData);
            // let customerId = null;
            // if(customerData!=null){
            //     customerId = customerData.id;
            //     console.log("customerId=",customerId);
            // }
            // let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || [];//fetching wishlisted products from local storage if already present or an empty array
            // console.log("wishListPerCustomer=",wishListPerCustomer);
            // let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
            // console.log("wishlistForThisCustomer=",wishlistForThisCustomer);
            // if (wishlistForThisCustomer == null || wishlistForThisCustomer == undefined) {
            //     let wishArray = [];
            //     wishArray.push(item);
            //     let wishlistForThisCustomer = {
            //         "customerId": customerId,
            //         "wishArray": wishArray
            //     }
            //     wishListPerCustomer.push(wishlistForThisCustomer);
            //     localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
            //     alert("Product added to the wishlist");
            // }else{
            //     let wishArray = wishlistForThisCustomer.wishArray;
            //     console.log("wishArray=",wishArray);
            //     let matchedProduct = wishArray.filter((ele, i) => ele.id == item.id);
            //     console.log("matchedProduct=",wishArray);
            //     if(matchedProduct.length != 0){
            //         alert("Product already present in the Wishlist");
            //     } else {
            //         wishArray.push(item);
            //         alert("Product added to the wishlist");
            //     }
            // }
        });


        //add to cart button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {
            addtoCart(item);

            // let customerData = JSON.parse(localStorage.getItem("customersData"));
            // console.log(customerData);
            // let customerId = null;
            // if (customerData != null) {
            //     customerId = customerData.id;
            //     console.log("customerId=", customerId);
            // }
            // let cartPerCustomer = JSON.parse(localStorage.getItem("cartPerCustomer")) || [];//fetching wishlisted products from local storage if already present or an empty array
            // console.log("cartPerCustomer=", cartPerCustomer);
            // let cartForThisCustomer = cartPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
















            // // location.reload(); // Refresh to reflect changess
            // let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            // //check wether product is present in the cart
            // if (item.stocks == 0) {
            //     alert("product Out of Stock");
            // }
            // else {


            //     let filteredArray = cartArray.filter((ele, i) => ele.id == item.id);
            //     // console.log("fa", filteredArray)
            //     // if filteredArray length == 1, item is prsent in the cart else not present
            //     if (filteredArray.length == 0) {
            //         cartArray.push({ ...item, quantity: 1 });//spreading of old onject and adding a new key
            //         //console.log("ca", cartArray)
            //     }
            //     else {
            //         // if filteredArray length == 1, item is prsent in the cart
            //         // just update the quantity key and store in localStoarge
            //         // console.log("ca in the else", cartArray)
            //         //console.log(el["quantity"]);
            //         let newArr = cartArray.map((product, i) => {
            //             if (product.id == item.id) {
            //                 product["quantity"]++
            //                 //console.log( item["quantity"])
            //                 return product
            //                 //return true;

            //             }
            //             else {
            //                 return product;
            //             }
            //         })
            //         //console.log(newArr)
            //         cartArray = [...newArr]
            //     }



            //     //console.log("before pushing", cartArray)
            //     localStorage.setItem("cartProducts", JSON.stringify(cartArray));
            //     alert("Product added to the cart");

            // }

        });

        card.append(product_image, specificationdiv, wishlistbtn, cartbtn, increaseBtn, decreaseBtn);

        clothing_cont.append(card);

    })
}















//JS code for category wise displaying electronics  category data
let electronics_img = document.getElementById("electronics_img");
electronics_img.addEventListener("click", async function () {
    let filterbyprice=document.getElementById("filterbyprice");
    filterbyprice.style.display="flex";
    filterbyprice.addEventListener("change", async function(){
        if(filterbyprice.value=="1 to 4999"){
            let data = await getElectronicsDetails();
            let filteredData=data.filter((el,i)=> el.category=="electronics" && (el.price>=1 && el.price <=4999));
                console.log(filteredData)
                showElectronicsDetails(filteredData);
            
            }
          else  if(filterbyprice.value==" 5000 to 19999"){
                let data = await getElectronicsDetails();
                let filteredData=data.filter((el,i)=> el.category=="electronics" && (el.price>=5000 && el.price <=20000));
                    console.log(filteredData)
                    showElectronicsDetails(filteredData);
                
                }


                    else if(filterbyprice.value=="20000 to 39999"){
                        let data = await getElectronicsDetails();
                        let filteredData=data.filter((el,i)=> el.category=="electronics" && (el.price>20000 && el.price <=39999));
                            console.log(filteredData)
                            showElectronicsDetails(filteredData);
                    }
                    else{
                        let data = await getElectronicsDetails();
                        let filteredData=data.filter((el,i)=> el.category=="electronics" && (el.price>40000 ));
                            console.log(filteredData)
                            showElectronicsDetails(filteredData);   
                    }




});
    let electronics_cont = document.getElementById("electronics_cont");
    electronics_cont.style.display = "grid";
    let furniture_cont = document.getElementById("furniture_cont");
    furniture_cont.style.display = "none";
    let clothing_cont = document.getElementById("clothing_cont");
    clothing_cont.style.display = "none";

    let data = await getElectronicsDetails();
    showElectronicsDetails(data);

})

async function getElectronicsDetails() {
    try {
        let res = await fetch("http://localhost:3000/furniture");
        let data = await res.json();
        return data;

    }

    catch (err) {
        console.log(err);
        alert("Something Went Wrong, not able to fetch electronics details")
    }
}

//js code for showing fuirniture details
//older version without customer 
// function showElectronicsDetails(arr) {
//     let electronics_cont = document.getElementById("electronics_cont");
//     electronics_cont.innerHTML = "";
//     let filteredData = arr.filter((el, i) => el.category == "electronics");
//     filteredData.map((item, i) => {
//         let card = document.createElement("div");
//         let product_name = document.createElement("h4");
//         product_name.textContent = item.product_name;
//         let price = document.createElement("h4");
//         price.textContent = `Price:${item.price}`;
//         let ratings = document.createElement("h4");
//         ratings.textContent = `Ratings:${item.ratings}⭐`;

//         let product_image = document.createElement("img");
//         product_image.src = item.product_image;
//         let specificationdiv = document.createElement("div");
//         specificationdiv.append(product_name, price, ratings)
//         // Decrease Quantity Button
//         let decreaseBtn = document.createElement("button");
//         decreaseBtn.textContent = "Decrease Quantity";
//         decreaseBtn.addEventListener("click", function () {
//             let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
//             let newArr = cartArray.map((product) => {
//                 if (product.id === item.id) {
//                     product["quantity"]--;
//                     item.stocks++;
//                     if (product["quantity"] === 0) {
//                         return null; // Mark for removal
//                     }
//                     return product;
//                 } else {
//                     return product;
//                 }
//             }).filter(Boolean); // Remove null items
//             localStorage.setItem("cartProducts", JSON.stringify(newArr));
//         });

//         // Increase Quantity Button
//         let increaseBtn = document.createElement("button");
//         increaseBtn.textContent = "Increase Quantity";
//         increaseBtn.addEventListener("click", function () {
//             let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
//             let newArr = cartArray.map((product) => {
//                 if (product.id === item.id) {
//                     if (item.stocks > 0) {
//                         product["quantity"]++;
//                         item.stocks--;
//                     } else {
//                         alert("No more stock available");
//                     }
//                     return product;
//                 } else {
//                     return product;
//                 }
//             });
//             localStorage.setItem("cartProducts", JSON.stringify(newArr));
//         });

//         //wishlist button    
//         let wishlistbtn = document.createElement("button");
//         wishlistbtn.textContent = "Wishlist";
//         wishlistbtn.addEventListener("click", function () {
//             let customerData = JSON.parse(localStorage.getItem("customersData"));
//             console.log(customerData);
//             let customerId = null;
//             if(customerData!=null){
//                 customerId = customerData.id;
//                 console.log("customerId=",customerId);
//             }
//             let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || [];//fetching wishlisted products from local storage if already present or an empty array
//             console.log("wishListPerCustomer=",wishListPerCustomer);
//             let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
//             console.log("wishlistForThisCustomer=",wishlistForThisCustomer);
//             if (wishlistForThisCustomer == null || wishlistForThisCustomer == undefined) {
//                 let wishArray = [];
//                 wishArray.push(item);
//                 let wishlistForThisCustomer = {
//                     "customerId": customerId,
//                     "wishArray": wishArray
//                 }
//                 wishListPerCustomer.push(wishlistForThisCustomer);
//                 localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
//                 alert("Product added to the wishlist");
//             }else{
//                 let wishArray = wishlistForThisCustomer.wishArray;
//                 console.log("wishArray=",wishArray);
//                 let matchedProduct = wishArray.filter((ele, i) => ele.id == item.id);
//                 console.log("matchedProduct=",wishArray);
//                 if(matchedProduct.length != 0){
//                     alert("Product already present in the Wishlist");
//                 } else {
//                     wishArray.push(item);
//                     alert("Product added to the wishlist");
//                 }
//             }
//         });


//         //add to cart button
//         let cartbtn = document.createElement("button");
//         cartbtn.textContent = "Add to Cart";
//         cartbtn.addEventListener("click", function () {
//             // location.reload(); // Refresh to reflect changess
//             let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
//             //check wether product is present in the cart
//             if (item.stocks == 0) {
//                 alert("product Out of Stock");
//             }
//             else {


//                 let filteredArray = cartArray.filter((ele, i) => ele.id == item.id);
//                 // console.log("fa", filteredArray)
//                 // if filteredArray length == 1, item is prsent in the cart else not present
//                 if (filteredArray.length == 0) {
//                     cartArray.push({ ...item, quantity: 1 });//spreading of old onject and adding a new key
//                     //console.log("ca", cartArray)
//                 }
//                 else {
//                     // if filteredArray length == 1, item is prsent in the cart
//                     // just update the quantity key and store in localStoarge
//                     // console.log("ca in the else", cartArray)
//                     //console.log(el["quantity"]);
//                     let newArr = cartArray.map((product, i) => {
//                         if (product.id == item.id) {
//                             product["quantity"]++
//                             //console.log( item["quantity"])
//                             return product
//                             //return true;

//                         }
//                         else {
//                             return product;
//                         }
//                     })
//                     //console.log(newArr)
//                     cartArray = [...newArr]
//                 }



//                 //console.log("before pushing", cartArray)
//                 localStorage.setItem("cartProducts", JSON.stringify(cartArray));
//                 alert("Product added to the cart");

//             }

//         });

//         card.append(product_image, specificationdiv, wishlistbtn, cartbtn, increaseBtn, decreaseBtn);

//         electronics_cont.append(card);

//     })
// }
//new version with customer
function showElectronicsDetails(arr) {
    let electronics_cont = document.getElementById("electronics_cont");
    electronics_cont.innerHTML = "";
    let filteredData = arr.filter((el, i) => el.category == "electronics");
    filteredData.map((item, i) => {











        let card = document.createElement("div");
        let product_name = document.createElement("h4");
        product_name.textContent = item.product_name;

        let price = document.createElement("h4");
        price.textContent = `Price: ${item.price}`;

        let ratings = document.createElement("h4");
        ratings.textContent = `Ratings: ${item.ratings}⭐`;

        let product_image = document.createElement("img");
        product_image.src = item.product_image;

        let specificationdiv = document.createElement("div");
        specificationdiv.append(product_name, price, ratings);

        // Decrease Quantity Button (-)
        let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
        decreaseBtn.addEventListener("click", function () {
            let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            let newArr = cartArray.map((product) => {
                if (product.id === item.id) {
                    product["quantity"]--;
                    item.stocks++;
                    if (product["quantity"] === 0) {
                        return null; // Mark for removal
                    }
                    return product;
                } else {
                    return product;
                }
            }).filter(Boolean); // Remove null items
            localStorage.setItem("cartProducts", JSON.stringify(newArr));
        });

        // Increase Quantity Button (+)
        let increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.addEventListener("click", function () {
            let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            let newArr = cartArray.map((product) => {
                if (product.id === item.id) {
                    if (item.stocks > 0) {
                        product["quantity"]++;
                        item.stocks--;
                    } else {
                        alert("No more stock available");
                    }
                    return product;
                } else {
                    return product;
                }
            });
            localStorage.setItem("cartProducts", JSON.stringify(newArr));
        });

        // Wishlist Button
        let wishlistbtn = document.createElement("button");
        wishlistbtn.textContent = "Wishlist";
        wishlistbtn.addEventListener("click", function () {
            addWishlist(item);
            // let customerData = JSON.parse(localStorage.getItem("customersData"));
            // console.log(customerData);
            // let customerId = null;
            // if (customerData != null) {
            //     customerId = customerData.id;
            //     console.log("customerId=", customerId);
            // }
            // let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || [];// Fetching wishlisted products from local storage if already present or an empty array
            // console.log("wishListPerCustomer=", wishListPerCustomer);
            // let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
            // console.log("wishlistForThisCustomer=", wishlistForThisCustomer);
            // if (wishlistForThisCustomer == null || wishlistForThisCustomer == undefined) {
            //     let wishArray = [];
            //     wishArray.push(item);
            //     let wishlistForThisCustomer = {
            //         "customerId": customerId,
            //         "wishArray": wishArray
            //     };
            //     wishListPerCustomer.push(wishlistForThisCustomer);
            //     localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
            //     alert("Product added to the wishlist");
            // } else {
            //     let wishArray = wishlistForThisCustomer.wishArray;
            //     console.log("wishArray=", wishArray);
            //     let matchedProduct = wishArray.filter((ele, i) => ele.id == item.id);
            //     console.log("matchedProduct=", matchedProduct);
            //     if (matchedProduct.length != 0) {
            //         alert("Product already present in the Wishlist");
            //     } else {
            //         wishArray.push(item);
            //         localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
            //         alert("Product added to the wishlist");
            //     }
            // }
        });

        // Add to Cart Button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {
            addtoCart(item);
            // let customerData = JSON.parse(localStorage.getItem("customersData"));
            // if (!customerData) {
            //     alert("Please log in to add items to the cart.");
            //     return;
            // }
            // let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            // if (item.stocks == 0) {
            //     alert("Product Out of Stock");
            // } else {
            //     let filteredArray = cartArray.filter((ele, i) => ele.id == item.id);
            //     if (filteredArray.length == 0) {
            //         cartArray.push({ ...item, quantity: 1 });
            //     } else {
            //         let newArr = cartArray.map((product, i) => {
            //             if (product.id == item.id) {
            //                 product["quantity"]++;
            //                 return product;
            //             } else {
            //                 return product;
            //             }
            //         });
            //         cartArray = [...newArr];
            //     }
            //     localStorage.setItem("cartProducts", JSON.stringify(cartArray));
            //     alert("Product added to the cart");
            // }
        });

        card.append(product_image, specificationdiv, wishlistbtn, cartbtn, increaseBtn, decreaseBtn);

        electronics_cont.append(card);


    });
}







//JS code for category wise displaying  furniture category data

let furniture_img = document.getElementById("furniture_img");
furniture_img.addEventListener("click", async function () {

    let filterbyprice=document.getElementById("filterbyprice");
    filterbyprice.style.display="flex";
    filterbyprice.addEventListener("change", async function(){
        if(filterbyprice.value=="1 to 4999"){
            let data = await getFurnitureDetails();
            let filteredData=data.filter((el,i)=> el.category=="furniture" && (el.price>=1 && el.price <=4999));
                console.log(filteredData)
                showFurnitureDetails(filteredData);
            }
           else if(filterbyprice.value==" 5000 to 19999"){
                let data = await getFurnitureDetails();
                let filteredData=data.filter((el,i)=> el.category=="furniture" && (el.price>=5000 && el.price <=20000));
                    console.log(filteredData)
                    showFurnitureDetails(filteredData);
                
                }


                    else if(filterbyprice.value=="20000 to 39999"){
                        let data = await getFurnitureDetails();
                        let filteredData=data.filter((el,i)=> el.category=="furniture" && (el.price>20000 && el.price <=39999));
                            console.log(filteredData)
                            showFurnitureDetails(filteredData);
                    }
                    else{
                        let data = await getFurnitureDetails();
                        let filteredData=data.filter((el,i)=> el.category=="furniture" && (el.price>40000 ));
                            console.log(filteredData)
                            showFurnitureDetails(filteredData);   
                    }




});
            
               
               // let filteredprice=filteredData.filter((ele,i)=> ele.price>"10000")
               
                // products=[...filteredData];//making copy of filtered data so that we can apply sorting after filtering
                // console.log("clicked")
          
            // else if(filterbycategory.value=="furniture"){
            //     let filteredData=products.filter((el,i)=> el.category="furniture");
            //     // console.log("clicked")
            //     showFurnitureDetails(data)ta);
            //     products=[...filteredData];//making copy of filtered data so that we can apply sorting after filtering
            // }
            // else{
            //     let filteredData=products.filter((el,i)=> el.category="electronics");
            //     displayData(filteredData); 
            //     products=[...filteredData];//making copy of filtered data so that we can apply sorting after filtering
            //     // console.log("clicked")
            // }
     
    
    
    // console.log("clicked")
    let furniture_cont = document.getElementById("furniture_cont");
    furniture_cont.style.display = "grid";
    let electronics_cont = document.getElementById("electronics_cont");
    electronics_cont.style.display = "none";
    let clothing_cont = document.getElementById("clothing_cont");
    clothing_cont.style.display = "none";
    let data = await getFurnitureDetails();
    showFurnitureDetails(data)
})


// async function getFurnitureDetails() {
//     try {
//       let res = await fetch("http://localhost:3200/furniture");
//       let data = await res.json();
//       return data;
//     } catch (err) {
//       console.error(err);
//       alert("Something Went Wrong, not able to fetch furniture details");
//     }
//   }

//   // Function to show furniture details
//   function showFurnitureDetails(arr) {
//     let furniture_cont = document.getElementById("furniture_cont");
//     furniture_cont.innerHTML = "";
//     let filteredData = arr.filter((el) => el.category === "furniture");

//     filteredData.map((item) => {
//       let card = document.createElement("div");

//       // Product Details
//       let product_name = document.createElement("h4");
//       product_name.textContent = item.product_name;
//       let price = document.createElement("h4");
//       price.textContent = `Price: ${item.price}`;
//       let ratings = document.createElement("h4");
//       ratings.textContent = `Ratings: ${item.ratings}⭐`;
//       let product_image = document.createElement("img");
//       product_image.src = item.product_image;

//       let specificationdiv = document.createElement("div");
//       specificationdiv.append(product_name, price, ratings);

//       // Wishlist Button
//       let wishlistbtn = document.createElement("button");
//       wishlistbtn.textContent = "Wishlist";
//       wishlistbtn.addEventListener("click", function () {
//         let wishArray = JSON.parse(localStorage.getItem("wishlistedProducts")) || [];
//         let filteredArray = wishArray.filter((ele) => ele.id === item.id);
//         if (filteredArray.length === 0) {
//           wishArray.push(item);
//           localStorage.setItem("wishlistedProducts", JSON.stringify(wishArray));
//           alert("Product added to the wishlist");
//         } else {
//           alert("Product already present in the Wishlist");
//         }
//       });

//       // Add to Cart Button
//       let cartbtn = document.createElement("button");
//       cartbtn.textContent = "Add to Cart";
//       cartbtn.addEventListener("click", function () {
//         let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
//         if (item.stocks === 0) {
//           alert("Product Out of Stock");
//         } else {
//           let filteredArray = cartArray.filter((ele) => ele.id === item.id);
//           if (filteredArray.length === 0) {
//             cartArray.push({ ...item, quantity: 1 });
//           } else {
//             let newArr = cartArray.map((product) => {
//               if (product.id === item.id) {
//                 product["quantity"]++;
//                 item.stocks--;
//                 return product;
//               } else {
//                 return product;
//               }
//             });
//             cartArray = [...newArr];
//           }
//           localStorage.setItem("cartProducts", JSON.stringify(cartArray));
//           alert("Product added to the cart");
//         }
//       });

//       // Increase Quantity Button
//       let increaseBtn = document.createElement("button");
//       increaseBtn.textContent = "Increase Quantity";
//       increaseBtn.addEventListener("click", function () {
//         let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
//         let newArr = cartArray.map((product) => {
//           if (product.id === item.id) {
//             if (item.stocks > 0) {
//               product["quantity"]++;
//               item.stocks--;
//             } else {
//               alert("No more stock available");
//             }
//             return product;
//           } else {
//             return product;
//           }
//         });
//         localStorage.setItem("cartProducts", JSON.stringify(newArr));
//       });

//       // Decrease Quantity Button
//       let decreaseBtn = document.createElement("button");
//       decreaseBtn.textContent = "Decrease Quantity";
//       decreaseBtn.addEventListener("click", function () {
//         let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
//         let newArr = cartArray.map((product) => {
//           if (product.id === item.id) {
//             product["quantity"]--;
//             item.stocks++;
//             if (product["quantity"] === 0) {
//               return null; // Mark for removal
//             }
//             return product;
//           } else {
//             return product;
//           }
//         }).filter(Boolean); // Remove null items
//         localStorage.setItem("cartProducts", JSON.stringify(newArr));
//       });

//       card.append(product_image, specificationdiv, wishlistbtn, cartbtn, increaseBtn, decreaseBtn);
//       furniture_cont.append(card);
//     });
//   }

// //   // Fetch and display furniture on page load
// //   getFurnitureDetails().then((data) => {
// //     showFurnitureDetails(data);
// //   });





//js code for fetching fuirniture details
// aakash version
// JS code for fetching furniture details
async function getFurnitureDetails() {
    try {
        let res = await fetch("http://localhost:3000/furniture");
        let data = await res.json();
        return data;

    } catch (err) {
        console.log(err);
        alert("Something Went Wrong, not able to fetch furniture details");
    }
}

// JS code for showing furniture details
// Akash version
function showFurnitureDetails(arr) {
    let furniture_cont = document.getElementById("furniture_cont");
    furniture_cont.innerHTML = "";
    let filteredData = arr.filter((el, i) => el.category == "furniture");
    filteredData.map((item, i) => {
let card = document.createElement("div");
        let product_name = document.createElement("h4");
        product_name.textContent = item.product_name;

        let price = document.createElement("h4");
        price.textContent = `Price: ${item.price}`;

        let ratings = document.createElement("h4");
        ratings.textContent = `Ratings: ${item.ratings}⭐`;

        let product_image = document.createElement("img");
        product_image.src = item.product_image;

        let specificationdiv = document.createElement("div");
        specificationdiv.append(product_name, price, ratings);

        // Decrease Quantity Button (-)
        let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
        decreaseBtn.addEventListener("click", function () {
            let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            let newArr = cartArray.map((product) => {
                if (product.id === item.id) {
                    product["quantity"]--;
                    item.stocks++;
                    if (product["quantity"] === 0) {
                        return null; // Mark for removal
                    }
                    return product;
                } else {
                    return product;
                }
            }).filter(Boolean); // Remove null items
            localStorage.setItem("cartProducts", JSON.stringify(newArr));
        });

        // Increase Quantity Button (+)
        let increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
        increaseBtn.addEventListener("click", function () {
            let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            let newArr = cartArray.map((product) => {
                if (product.id === item.id) {
                    if (item.stocks > 0) {
                        product["quantity"]++;
                        item.stocks--;
                    } else {
                        alert("No more stock available");
                    }
                    return product;
                } else {
                    return product;
                }
            });
            localStorage.setItem("cartProducts", JSON.stringify(newArr));
        });

        // Wishlist Button
        let wishlistbtn = document.createElement("button");
        wishlistbtn.textContent = "Wishlist";
        wishlistbtn.addEventListener("click", function () {
            addWishlist(item);
            // let customerData = JSON.parse(localStorage.getItem("customersData"));
            // console.log(customerData);
            // let customerId = null;
            // if (customerData != null) {
            //     customerId = customerData.id;
            //     console.log("customerId=", customerId);
            // }
            // let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || [];// Fetching wishlisted products from local storage if already present or an empty array
            // console.log("wishListPerCustomer=", wishListPerCustomer);
            // let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
            // console.log("wishlistForThisCustomer=", wishlistForThisCustomer);
            // if (wishlistForThisCustomer == null || wishlistForThisCustomer == undefined) {
            //     let wishArray = [];
            //     wishArray.push(item);
            //     let wishlistForThisCustomer = {
            //         "customerId": customerId,
            //         "wishArray": wishArray
            //     };
            //     wishListPerCustomer.push(wishlistForThisCustomer);
            //     localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
            //     alert("Product added to the wishlist");
            // } else {
            //     let wishArray = wishlistForThisCustomer.wishArray;
            //     console.log("wishArray=", wishArray);
            //     let matchedProduct = wishArray.filter((ele, i) => ele.id == item.id);
            //     console.log("matchedProduct=", matchedProduct);
            //     if (matchedProduct.length != 0) {
            //         alert("Product already present in the Wishlist");
            //     } else {
            //         wishArray.push(item);
            //         localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
            //         alert("Product added to the wishlist");
            //     }
            // }
        });

        // Add to Cart Button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {
            addtoCart(item);
            // let customerData = JSON.parse(localStorage.getItem("customersData"));
            // if (!customerData) {
            //     alert("Please log in to add items to the cart.");
            //     return;
            // }
            // let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
            // if (item.stocks == 0) {
            //     ("alertProduct Out of Stock");
            // } else {
            //     let filteredArray = cartArray.filter((ele, i) => ele.id == item.id);
            //     if (filteredArray.length == 0) {
            //         cartArray.push({ ...item, quantity: 1 });
            //     } else {
            //         let newArr = cartArray.map((product, i) => {
            //             if (product.id == item.id) {
            //                 product["quantity"]++;
            //                 return product;
            //             } else {
            //                 return product;
            //             }
            //         });
            //         cartArray = [...newArr];
            //     }
            //     localStorage.setItem("cartProducts", JSON.stringify(cartArray));
            //     alert("Product added to the cart");
            // }
        });

        card.append(product_image, specificationdiv, wishlistbtn, cartbtn, increaseBtn, decreaseBtn);

        furniture_cont.append(card);


    });
}


//add to cart function
function addtoCart(product) {
    let customerData = JSON.parse(localStorage.getItem("customersData"));
    console.log(customerData);
    let customerId = null;
    if (customerData != null) {
        customerId = customerData.id;
        console.log("customerId=", customerId);
    }
    let cartPerCustomer = JSON.parse(localStorage.getItem("cartPerCustomer")) || [];// Fetching wishlisted products from local storage if already present or an empty array
    console.log("cartPerCustomer=", cartPerCustomer);
    let cartForThisCustomer = cartPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
    console.log("cartForThisCustomer=", cartForThisCustomer);
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
        console.log("cartArray=", cartArray);
        let matchedProduct = cartArray.filter((ele, i) => ele.id == product.id);
        console.log("matchedProduct=", matchedProduct);
        if (matchedProduct.length != 0) {
            alert("Product already present in the Cart");
        } else {
            cartArray.push(product);
            localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
            alert("Product added to the Cart");
        }
    }
}







function addWishlist(product) {
    let customerData = JSON.parse(localStorage.getItem("customersData"));
    console.log(customerData);
    let customerId = null;
    if (customerData != null) {
        customerId = customerData.id;
        console.log("customerId=", customerId);
    }
    let wishListPerCustomer = JSON.parse(localStorage.getItem("wishListPerCustomer")) || [];// Fetching wishlisted products from local storage if already present or an empty array
    console.log("wishListPerCustomer=", wishListPerCustomer);
    let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
    console.log("wishlistForThisCustomer=", wishlistForThisCustomer);
    if (wishlistForThisCustomer == null || wishlistForThisCustomer == undefined) {
        let wishArray = [];
        wishArray.push(product);
        let wishlistForThisCustomer = {
            "customerId": customerId,
            "wishArray": wishArray
        };
        wishListPerCustomer.push(wishlistForThisCustomer);
        localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
        alert("Product added to the wishlist");
    } else {
        let wishArray = wishlistForThisCustomer.wishArray;
        console.log("wishArray=", wishArray);
        let matchedProduct = wishArray.filter((ele, i) => ele.id == product.id);
        console.log("matchedProduct=", matchedProduct);
        if (matchedProduct.length != 0) {
            alert("Product already present in the Wishlist");
        } else {
            wishArray.push(product);
            localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
            alert("Product added to the wishlist");
        }
    }
}







// //priya version new
// function showFurnitureDetails(arr) {
//     let furniture_cont = document.getElementById("furniture_cont");
//     furniture_cont.innerHTML = "";

//     let filteredData = arr.filter((el) => el.category == "furniture");
//     filteredData.map((item) => {
//         let card = document.createElement("div");
//         let product_name = document.createElement("h4");
//         product_name.textContent = item.product_name;

//         let price = document.createElement("h4");
//         price.textContent = `Price: ${item.price}`;

//         let ratings = document.createElement("h4");
//         ratings.textContent = `Ratings: ${item.ratings}⭐`;

//         let product_image = document.createElement("img");
//         product_image.src = item.product_image;

//         let specificationdiv = document.createElement("div");
//         specificationdiv.append(product_name, price, ratings);

//         // Wishlist Button
//         let wishlistbtn = document.createElement("button");
//         wishlistbtn.textContent = "Wishlist";
//         wishlistbtn.addEventListener("click", function () {
//             let wishlist = JSON.parse(localStorage.getItem("wishlistProducts")) || [];

//             let isItemInWishlist = wishlist.some((el) => el.id === item.id);
//             if (!isItemInWishlist) {
//                 wishlist.push(item);
//                 localStorage.setItem("wishlistProducts", JSON.stringify(wishlist));
//                 alert("Product added to the wishlist");
//             } else {
//                 alert("Product already in the wishlist.");
//             }
//         });

//         // Add to Cart Button
//         let cartbtn = document.createElement("button");
//         cartbtn.textContent = "Add to Cart";
//         cartbtn.addEventListener("click", function () {
//             let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

//             let productInCart = cart.find((el) => el.id === item.id);
//             if (!productInCart) {
//                 cart.push({ ...item, quantity: 1 });
//                 localStorage.setItem("cartProducts", JSON.stringify(cart));
//                 alert("Product added to the cart");
//             } else {
//                 if (item.stocks > 0) {
//                     productInCart.quantity++;
//                     item.stocks--;
//                     localStorage.setItem("cartProducts", JSON.stringify(cart));
//                     alert("Quantity updated in the cart");
//                 } else {
//                     alert("Product out of stock.");
//                 }
//             }
//         });

//         // Increase Quantity Button
//         let increaseBtn = document.createElement("button");
//         increaseBtn.textContent = "Increase Quantity";
//         increaseBtn.addEventListener("click", function () {
//             let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

//             let productInCart = cart.find((el) => el.id === item.id);
//             if (productInCart) {
//                 if (item.stocks > 0) {
//                     productInCart.quantity++;
//                     item.stocks--;
//                     localStorage.setItem("cartProducts", JSON.stringify(cart));
//                 } else {
//                     alert("No more stock available.");
//                 }
//             }
//         });

//         // Decrease Quantity Button
//         let decreaseBtn = document.createElement("button");
//         decreaseBtn.textContent = "Decrease Quantity";
//         decreaseBtn.addEventListener("click", function () {
//             let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

//             let productInCart = cart.find((el) => el.id === item.id);
//             if (productInCart) {
//                 productInCart.quantity--;
//                 item.stocks++;

//                 if (productInCart.quantity === 0) {
//                     cart = cart.filter((el) => el.id !== item.id);
//                 }
//                 localStorage.setItem("cartProducts", JSON.stringify(cart));
//             }
//         });

//         card.append(product_image, specificationdiv, wishlistbtn, cartbtn, increaseBtn, decreaseBtn);
//         furniture_cont.append(card);
//     });
// }
