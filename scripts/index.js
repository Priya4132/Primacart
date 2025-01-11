import { baseUrl } from "./baseUrl.js";

let customerData = JSON.parse(localStorage.getItem("customersData"));

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






//JS code for category wise displaying clothing category data
let clothing_img = document.getElementById("clothing_img");
clothing_img.addEventListener("click", async function () {

    //filter by gender in clothing category
    let filterbygender = document.getElementById("filterbygender");
    filterbygender.style.display = "flex";
    filterbygender.addEventListener("change", async function () {
        if (filterbygender.value == "male") {
            let data = await getClothingDetails();
            let filteredData = data.filter((el, i) => el.category == "clothing" && (el.filterbygender == "male"));
            //data=[...filteredData]  ; //making copy of filtered Data

            // console.log(filteredData)
            showClothingDetails(filteredData);
            localStorage.setItem("FilterbyPriceinClothing", JSON.stringify(filteredData));
            //   data=[...filteredData]  ; //making copy of filtered Data

        }
        else if (filterbygender.value == "female") {
            let data = await getClothingDetails();
            let filteredData = data.filter((el, i) => el.category == "clothing" && (el.filterbygender == "female"));
            // console.log(filteredData)
            showClothingDetails(filteredData);
            localStorage.setItem("FilterbyPriceinClothing", JSON.stringify(filteredData));
            //ata=[...filteredData]  ; //making copy of filtered Data

        }


        else if (filterbygender.value == "kids") {
            let data = await getClothingDetails();
            let filteredData = data.filter((el, i) => el.category == "clothing" && (el.filterbygender == "kids"));
            // console.log(filteredData)
            showClothingDetails(filteredData);
            localStorage.setItem("FilterbyPriceinClothing", JSON.stringify(filteredData));
            //data=[...filteredData]  ; //making copy of filtered Data
        }

    });







    // filter by price

    let filterbyprice = document.getElementById("filterbyprice");
    filterbyprice.style.display = "flex";
    filterbyprice.addEventListener("change", async function () {
        if (filterbyprice.value == "1 to 4999") {
            let data = await getClothingDetails();
            let filteredData = data.filter((el, i) => el.category == "clothing" && (el.price >= 1 && el.price <= 4999));
            //  data=[...filteredData]  ; //making copy of filtered Data
            localStorage.setItem("FilterbyPriceinClothing", JSON.stringify(filteredData));
            // console.log(filteredData)
            showClothingDetails(filteredData);
            //data = [...filteredData]; //making copy of filtered Data

        }
        else if (filterbyprice.value == " 5000 to 19999") {
            let data = await getClothingDetails();
            let filteredData = data.filter((el, i) => el.category == "clothing" && (el.price >= 5000 && el.price <= 20000));
            // console.log(filteredData)
            showClothingDetails(filteredData);
            localStorage.setItem("FilterbyPriceinClothing", JSON.stringify(filteredData));
            //  data=[...filteredData]  ; //making copy of filtered Data

        }


        else if (filterbyprice.value == "20000 to 39999") {
            let data = await getClothingDetails();
            let filteredData = data.filter((el, i) => el.category == "clothing" && (el.price > 20000 && el.price <= 39999));
            // console.log(filteredData)
            showClothingDetails(filteredData);
            localStorage.setItem("FilterbyPriceinClothing", JSON.stringify(filteredData));
            //    data=[...filteredData]  ; //making copy of filtered Data
        }
        else {
            let data = await getClothingDetails();
            let filteredData = data.filter((el, i) => el.category == "clothing" && (el.price > 40000));
            // console.log(filteredData)
            showClothingDetails(filteredData);
            localStorage.setItem("FilterbyPriceinClothing", JSON.stringify(filteredData));
            //    data=[...filteredData]  ; //making copy of filtered Data
        }




    });
    // sort by price
    let sortbyprice = document.getElementById("sortbyprice");
    sortbyprice.style.display = "flex";
    sortbyprice.addEventListener("change", async function () {
        // let data = await getFurnitureDetails();
        let data = JSON.parse(localStorage.getItem("FilterbyPriceinClothing"));
        // localStorage.removeItem("FilterbyPrice")
        if (sortbyprice.value === "htl") {

            data.sort((a, b) => b.price - a.price);
            showClothingDetails(data);
            //  console.log("clicked")//
        }
        else {
            data.sort((a, b) => a.price - b.price);
            showClothingDetails(data);
        }
    });

    //    sort by name
    let sortbyname = document.getElementById("sortbyname");
    sortbyname.style.display = "flex";
    sortbyname.addEventListener("change", function () {
        let data = JSON.parse(localStorage.getItem("FilterbyPriceinClothing"));
        if (sortbyname.value == "atoz") {
           
            data.sort((a, b) => {
                if (a.product_name > b.product_name) {//ascending order
                    return 1;
                }
                else {
                    return -1;
                }
            })
            showClothingDetails(data);
        }
        else {
            data.sort((a, b) => { //descending order
                if (a.product_name > b.product_name) {
                    return -1;
                }
                else {
                    return 1;
                }
            })
            showClothingDetails(data);
        }

    })




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
        let res = await fetch(`${baseUrl}/furniture`);
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
        card.setAttribute("class", "card")

        let product_name = document.createElement("h4");
        product_name.textContent = item.product_name;

        let price = document.createElement("h4");
        price.textContent = `Price:₹${item.price}`;

        let ratings = document.createElement("h4");
        ratings.textContent = `Ratings: ${item.ratings}⭐`;

        let product_image = document.createElement("img");
        product_image.setAttribute("class", "product_image")
        product_image.src = item.product_image;

        let specificationdiv = document.createElement("div");
        specificationdiv.setAttribute("class", "specificatdioniv")
        // specificationdiv.append(product_name, price, ratings);
        let quantityDiv = document.createElement("div");
        let quantityLabel = document.createElement("span");
        quantityLabel.textContent = "Quantity: ";
          let quantity = document.createElement("span");
          item.quantity = item.quantity || 1;
          quantity.textContent = item.quantity;
    
          let increaseBtn = document.createElement("button");
          increaseBtn.textContent = "+";
    
         
    // Decrease Quantity
    let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
  
    decreaseBtn.addEventListener("click", function () {
      if (item.quantity > 1) {
        item.quantity--;
        quantity.textContent = parseInt(item.quantity);
        cartArray[i] = item;
        // localStorage.setItem("cartProducts", JSON.stringify(cartArray));
        localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
      }
    });
  
    // Increase Quantity
    increaseBtn.addEventListener("click", function () {
      // console.log("item.quantity=", item.quantity, "item.stocks=", item.stocks);
      if (item.quantity < item.stocks) {
        item.quantity = (item.quantity || 1) + 1;
        quantity.textContent = item.quantity;
        localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
        //cartArray[i] = item;
        //localStorage.setItem("cartProducts", JSON.stringify(cartArray));
        //showCartDetails(cartArray); // Refresh cart
      } else {
        alert("Cannot add more than available stock.");
      }
    });
  
    quantityDiv.append(quantityLabel, decreaseBtn, quantity, increaseBtn);
    specificationdiv.append(product_name, price, ratings, quantityDiv);
  
  
  
        //wishlist button    
        let wishlistbtn = document.createElement("button");
        wishlistbtn.textContent = "Wishlist";
        wishlistbtn.addEventListener("click", function () {
            addWishlist(item);
           
        });


        //add to cart button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {
            addtoCart(item);

          

        });

        card.append(product_image, specificationdiv, wishlistbtn, cartbtn);

        clothing_cont.append(card);

    })
}




//JS code for category wise displaying electronics  category data
let electronics_img = document.getElementById("electronics_img");
electronics_img.addEventListener("click", async function () {

    let filterbygender = document.getElementById("filterbygender");
    filterbygender.style.display = "none";
    let filterbyprice = document.getElementById("filterbyprice");
    filterbyprice.style.display = "flex";
    filterbyprice.addEventListener("change", async function () {
        if (filterbyprice.value == "1 to 4999") {
            let data = await getElectronicsDetails();
            console.log(data);
            let filteredData = data.filter((el, i) => el.category == "electronics" && (el.price >= 1 && el.price <= 4999));
            console.log(filteredData);
            localStorage.setItem("FilterbyPriceinElectronics", JSON.stringify(filteredData));
            showElectronicsDetails(filteredData);
            // data=[...filteredData]  ; //making copy of filtered Data

        }
        else if (filterbyprice.value == " 5000 to 19999") {
            let data = await getElectronicsDetails();
            let filteredData = data.filter((el, i) => el.category == "electronics" && (el.price >= 5000 && el.price <= 20000));
            // console.log(filteredData)
            localStorage.setItem("FilterbyPriceinElectronics", JSON.stringify(filteredData));

            showElectronicsDetails(filteredData);
            // data=[...filteredData]  ; //making copy of filtered Data

        }
        else if (filterbyprice.value == "20000 to 39999") {
            let data = await getElectronicsDetails();
            let filteredData = data.filter((el, i) => el.category == "electronics" && (el.price > 20000 && el.price <= 39999));
            // console.log(filteredData)
            showElectronicsDetails(filteredData);
            localStorage.setItem("FilterbyPriceinElectronics", JSON.stringify(filteredData));

            //  data=[...filteredData]  ; //making copy of filtered Data
        }
        else {
            let data = await getElectronicsDetails();
            let filteredData = data.filter((el, i) => el.category == "electronics" && (el.price > 40000));
            // console.log(filteredData)
            localStorage.setItem("FilterbyPriceinElectronics", JSON.stringify(filteredData));

            // showElectronicsDetails(filteredData);   
            // data=[...filteredData]  ; //making copy of filtered Data
        }




    });

    // sort by price
    let sortbyprice = document.getElementById("sortbyprice");
    sortbyprice.style.display = "flex";
    sortbyprice.addEventListener("change", async function () {
        // let data = await getFurnitureDetails();
        let data = JSON.parse(localStorage.getItem("FilterbyPriceinElectronics"));
        // localStorage.removeItem("FilterbyPrice")
        if (sortbyprice.value === "htl") {

            data.sort((a, b) => b.price - a.price);
            showElectronicsDetails(data);
            //  console.log("clicked")//
        }
        else {
            data.sort((a, b) => a.price - b.price);
            showElectronicsDetails(data);
        }
    });

    //    sort by name
    let sortbyname = document.getElementById("sortbyname");
    sortbyname.style.display = "flex";
    sortbyname.addEventListener("change", function () {
        let data = JSON.parse(localStorage.getItem("FilterbyPriceinElectronics"));
        if (sortbyname.value == "atoz") {
           
            data.sort((a, b) => {
                if (a.product_name > b.product_name) {//ascending order
                    return 1;
                }
                else {
                    return -1;
                }
            })
            showElectronicsDetails(data);
        }
        else {
            data.sort((a, b) => { //descending order
                if (a.product_name > b.product_name) {
                    return -1;
                }
                else {
                    return 1;
                }
            })
            showElectronicsDetails(data);
        }

    })





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
        let res = await fetch(`${baseUrl}/furniture`);
        let data = await res.json();
        return data;

    }

    catch (err) {
        console.log(err);
        alert("Something Went Wrong, not able to fetch electronics details")
    }
}


//new version with customer
function showElectronicsDetails(arr) {
    let electronics_cont = document.getElementById("electronics_cont");
    electronics_cont.innerHTML = "";
    let filteredData = arr.filter((el, i) => el.category == "electronics");
    filteredData.map((item, i) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card")

        let product_name = document.createElement("h4");
        product_name.textContent = item.product_name;

        let price = document.createElement("h4");
        price.textContent = `Price:₹${item.price}`;

        let ratings = document.createElement("h4");
        ratings.textContent = `Ratings: ${item.ratings}⭐`;

        let product_image = document.createElement("img");
        product_image.setAttribute("class", "product_image")
        product_image.src = item.product_image;

        let specificationdiv = document.createElement("div");
        specificationdiv.setAttribute("class", "specificatdioniv")
        
        let quantityDiv = document.createElement("div");
        let quantityLabel = document.createElement("span");
        quantityLabel.textContent = "Quantity: ";
          let quantity = document.createElement("span");
          item.quantity = item.quantity || 1;
          quantity.textContent = item.quantity;
    
          let increaseBtn = document.createElement("button");
          increaseBtn.textContent = "+";
    
         
    // Decrease Quantity
    let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
  
    decreaseBtn.addEventListener("click", function () {
      if (item.quantity > 1) {
        item.quantity--;
        quantity.textContent = parseInt(item.quantity);
        cartArray[i] = item;
        // localStorage.setItem("cartProducts", JSON.stringify(cartArray));
        localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
      }
    });
  
    // Increase Quantity
    increaseBtn.addEventListener("click", function () {
      // console.log("item.quantity=", item.quantity, "item.stocks=", item.stocks);
      if (item.quantity < item.stocks) {
        item.quantity = (item.quantity || 1) + 1;
        quantity.textContent = item.quantity;
        localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
        //cartArray[i] = item;
        //localStorage.setItem("cartProducts", JSON.stringify(cartArray));
        //showCartDetails(cartArray); // Refresh cart
      } else {
        alert("Cannot add more than available stock.");
      }
    });
  
    quantityDiv.append(quantityLabel, decreaseBtn, quantity, increaseBtn);
    specificationdiv.append(product_name, price, ratings, quantityDiv);
  
  
  

        // Wishlist Button
        let wishlistbtn = document.createElement("button");
        wishlistbtn.textContent = "Wishlist";
        wishlistbtn.addEventListener("click", function () {
            addWishlist(item);
           
        });

        // Add to Cart Button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {
            addtoCart(item);
            
        });

        card.append(product_image, specificationdiv, wishlistbtn, cartbtn);

        electronics_cont.append(card);


    });
}







//JS code for category wise displaying  furniture category data

let furniture_img = document.getElementById("furniture_img");
furniture_img.addEventListener("click", async function () {


    let filterbygender = document.getElementById("filterbygender");
    filterbygender.style.display = "none";




    //filter by price
    let filterbyprice = document.getElementById("filterbyprice");
    filterbyprice.style.display = "flex";
    filterbyprice.addEventListener("change", async function () {
        if (filterbyprice.value == "1 to 4999") {
            let data = await getFurnitureDetails();
            let filteredData = data.filter((el, i) => el.price >= 1 && el.price <= 4999);
            // console.log(filteredData)
            showFurnitureDetails(filteredData);
            localStorage.setItem("FilterbyPriceinFurniture", JSON.stringify(filteredData));
            //data=[...filteredData]  ; //making copy of filtered Data
        }
        else if (filterbyprice.value == " 5000 to 19999") {
            let data = await getFurnitureDetails();
            console.log("furniture data=",data);
            let filteredData = data.filter((el, i) => el.price >= 5000 && el.price <= 20000);
            // console.log("filtered furniture data",filteredData)
            showFurnitureDetails(filteredData);
            // data=[...filteredData]  ; //making copy of filtered Data
            localStorage.setItem("FilterbyPriceinFurniture", JSON.stringify(filteredData));

        }


        else if (filterbyprice.value == "20000 to 39999") {
            let data = await getFurnitureDetails();
            let filteredData = data.filter((el, i) => el.price > 20000 && el.price <= 39999);
            // console.log(filteredData)
            showFurnitureDetails(filteredData);
            // data=[...filteredData]  ; //making copy of filtered Data
            localStorage.setItem("FilterbyPriceinFurniture", JSON.stringify(filteredData));
        }
        else {
            let data = await getFurnitureDetails();
            let filteredData = data.filter((el, i) => el.price > 40000);
            // console.log(filteredData)
            showFurnitureDetails(filteredData);
            // data=[...filteredData]  ; //making copy of filtered Data 
            localStorage.setItem("FilterbyPriceinFurniture", JSON.stringify(filteredData));
        }




    });
    // sort by price
    let sortbyprice = document.getElementById("sortbyprice");
    sortbyprice.style.display = "flex";
    sortbyprice.addEventListener("change", async function () {
        // let data = await getFurnitureDetails();
        let data = JSON.parse(localStorage.getItem("FilterbyPriceinFurniture"));
        // localStorage.removeItem("FilterbyPrice")
        if (sortbyprice.value === "htl") {

            data.sort((a, b) => b.price - a.price);
            showFurnitureDetails(data);
            // console.log("clicked")//
        }
        else {
            data.sort((a, b) => a.price - b.price);
            showFurnitureDetails(data);
        }
    })
    //    sort by name
    let sortbyname = document.getElementById("sortbyname");
    sortbyname.style.display = "flex";
    sortbyname.addEventListener("change", function () {
        let data = JSON.parse(localStorage.getItem("FilterbyPriceinFurniture"));
        if (sortbyname.value == "atoz") {
         //   let data = JSON.parse(localStorage.getItem("FilterbyPriceinFurniture"));
            data.sort((a, b) => {
                if (a.product_name > b.product_name) {//ascending order
                    return 1;
                }
                else {
                    return -1;
                }
            })
            showFurnitureDetails(data);
        }
        else {
            data.sort((a, b) => { //descending order
                if (a.product_name > b.product_name) {
                    return -1;
                }
                else {
                    return 1;
                }
            })
            showFurnitureDetails(data);
        }

    })





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






// JS code for fetching furniture details
async function getFurnitureDetails() {
    try {
        let res = await fetch(`${baseUrl}/furniture`);
        let data = await res.json();
        return data;

    } catch (err) {
        console.log(err);
        alert("Something Went Wrong, not able to fetch furniture details");
    }
}

// JS code for showing furniture details

function showFurnitureDetails(arr) {
    let furniture_cont = document.getElementById("furniture_cont");
    furniture_cont.innerHTML = "";
    let filteredData = arr.filter((el, i) => el.category == "furniture");
    filteredData.map((item, i) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card")

        let product_name = document.createElement("h4");
        product_name.textContent = item.product_name;

        let price = document.createElement("h4");
        price.textContent = `Price:₹${item.price}`;

        let ratings = document.createElement("h4");
        ratings.textContent = `Ratings: ${item.ratings}⭐`;

        let product_image = document.createElement("img");
        product_image.setAttribute("class", "product_image")
        product_image.src = item.product_image;

        let specificationdiv = document.createElement("div");
        specificationdiv.setAttribute("class", "specificatdioniv")
       

        
        let quantityDiv = document.createElement("div");
      let quantityLabel = document.createElement("span");
      quantityLabel.textContent = "Quantity: ";
        let quantity = document.createElement("span");
        item.quantity = item.quantity || 1;
        quantity.textContent = item.quantity;
  
        let increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";
  
       
  // Decrease Quantity
  let decreaseBtn = document.createElement("button");
      decreaseBtn.textContent = "-";

  decreaseBtn.addEventListener("click", function () {
    if (item.quantity > 1) {
      item.quantity--;
      quantity.textContent = parseInt(item.quantity);
      cartArray[i] = item;
      // localStorage.setItem("cartProducts", JSON.stringify(cartArray));
      localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
    }
  });

  // Increase Quantity
  increaseBtn.addEventListener("click", function () {
    // console.log("item.quantity=", item.quantity, "item.stocks=", item.stocks);
    if (item.quantity < item.stocks) {
      item.quantity = (item.quantity || 1) + 1;
      quantity.textContent = item.quantity;
      localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
      //cartArray[i] = item;
      //localStorage.setItem("cartProducts", JSON.stringify(cartArray));
      //showCartDetails(cartArray); // Refresh cart
    } else {
      alert("Cannot add more than available stock.");
    }
  });

  quantityDiv.append(quantityLabel, decreaseBtn, quantity, increaseBtn);
  specificationdiv.append(product_name, price, ratings, quantityDiv);



        // Wishlist Button
        let wishlistbtn = document.createElement("button");
        wishlistbtn.textContent = "Wishlist";
        wishlistbtn.addEventListener("click", function () {
            addWishlist(item);
           
        });

        // Add to Cart Button
        let cartbtn = document.createElement("button");
        cartbtn.textContent = "Add to Cart";
        cartbtn.addEventListener("click", function () {
            addtoCart(item);
           
        });

        card.append(product_image, specificationdiv, wishlistbtn, cartbtn);

        furniture_cont.append(card);


    });
}


//add to cart function
function addtoCart(product) {
    // console.log(product.stocks);
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
            alert("Product already present in the Cart, Kindly increase the quantity");
        } else {
            cartArray.push(product);
            localStorage.setItem("cartPerCustomer", JSON.stringify(cartPerCustomer));
            alert("Product added to the Cart");
        }
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
    // console.log("wishListPerCustomer=", wishListPerCustomer);
    let wishlistForThisCustomer = wishListPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
    // console.log("wishlistForThisCustomer=", wishlistForThisCustomer);
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
        // console.log("wishArray=", wishArray);
        let matchedProduct = wishArray.filter((ele, i) => ele.id == product.id);
        // console.log("matchedProduct=", matchedProduct);
        if (matchedProduct.length != 0) {
            alert("Product already present in the Wishlist");
        } else {
            wishArray.push(product);
            localStorage.setItem("wishListPerCustomer", JSON.stringify(wishListPerCustomer));
            alert("Product added to the wishlist");
        }
    }
}







