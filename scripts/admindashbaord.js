// Redirect to login if credentials are not found
// if (!localStorage.getItem("username") || !localStorage.getItem("password")) {
//     alert("You are not logged in!");
//     window.location.href = "index.html";
//   }


  let admin=JSON.parse(localStorage.getItem("adminData"));
  if(!admin){
    alert("You are not logged in!");
    window.location.href = "index.html";
  }

  document.getElementById(
    "user-name"
  ).textContent = `Welcome, ${admin.adminName}`;

  // Handle logout
  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("adminData"); // Remove username
    
    alert("You have been logged out.");
    window.location.href = "index.html"; // Redirect to login page
  });

// addproduct form

let form=document.getElementById("addproductform");
form.addEventListener("submit", async  function(){
  event.preventDefault();
  let product_name=form.product_name.value;
  let price=form.price.value;
  let ratings=form.ratings.value;
  let stocks=form.stocks.value;
  let category=form.category.value;
  let product_image=form.product_image.value;
  let productObj={product_name,price,ratings,stocks,category,product_image}
//now push form data to json server

try{
  await  fetch("http://localhost:3200/furniture",{
       method:"POST",
       headers:{
           "content-type":"application/json"
       },
       body:JSON.stringify(productObj)
   })
   alert("Product  Added Succefully");

  }
  catch{;
  }


})


window.onload=async ()=>{
  let data=await getProductDetails();
  showProductDetails(data);
}

async function getProductDetails() {
  try{
let res=await fetch("http://localhost:3200/furniture");
let data=await res.json();
return data;

  } 
  
catch(err){
console(err);
alert("Something Went Wrong, not able to fetch furniture details")
}
}

//js code for showing fuirniture details

function showProductDetails(arr){
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    let cont=document.getElementById("cont");
    cont.innerHTML="";
    // let filteredData=arr.filter((el,i)=> el.category=="furtinure");
    arr.map((item,i)=>{
        let card=document.createElement("div");
        let product_name=document.createElement("h4");
        product_name.textContent=item.product_name;
        let price=document.createElement("h4");
        price.textContent=`Price:${item.price}`;
        let ratings=document.createElement("h4");
        ratings.textContent=`Ratings:${item.ratings}⭐`;
     
        let product_image=document.createElement("img");
        product_image.src=item.product_image;
        let specificationdiv=document.createElement("div");
        specificationdiv.append(product_name,price,ratings)


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

let wishlistbtn=document.createElement("button");
wishlistbtn.textContent="Wishlist";
wishlistbtn.addEventListener("click", function(){
let wishArray = JSON.parse(localStorage.getItem("wishlistedProducts")) || [];//fetching wishlisted products from local storage if already present or an empty array
let filteredArray = wishArray.filter((ele, i) => ele.id == item.id);
if (filteredArray.length == 0){
    wishArray.push(item);
    localStorage.setItem("wishlistedProducts", JSON.stringify(wishArray));

    alert("Product added to the wishlist");
}
else{
    alert("Product already present in the Wishlist");
}




});
//add to cart











//add to cart button
let cartbtn = document.createElement("button");
cartbtn.textContent = "Add to Cart";
cartbtn.addEventListener("click", function () {
// location.reload(); // Refresh to reflect changess
let cartArray = JSON.parse(localStorage.getItem("cartProducts")) || [];
//check wether product is present in the cart
if (item.stocks==0){
    alert("product Out of Stock");
}
else{


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

card.append(product_image,specificationdiv,wishlistbtn,cartbtn,increaseBtn,decreaseBtn);
let cont=document.getElementById("cont");
cont.append(card);

    })
}


// filter by category
let filterbycategory=document.getElementById("filterbycategory");
    filterbycategory.addEventListener("change",async function(){

      try{
        let res=await fetch("http://localhost:3200/furniture");
        let data=await res.json();
        // console.log(data)
        if(filterbycategory.value=="clothing"){
          let filteredData=data.filter((el,i)=> el.category=="clothing");
          showProductDetails(filteredData);
         data=[...filteredData];//making copy of filtered data so that we can apply sorting after filtering
          // console.log("clicked")
      }
      else if(filterbycategory.value=="furniture"){
          let filteredData=data.filter((el,i)=> el.category=="furniture");
          // console.log("clicked")
          showProductDetails(filteredData);
          data=[...filteredData];//making copy of filtered data so that we can apply sorting after filtering
      }
      else{
          let filteredData=data.filter((el,i)=> el.category=="electronics");
          showProductDetails(filteredData); 
          data=[...filteredData];//making copy of filtered data so that we can apply sorting after filtering
          // console.log("clicked")
      }
        
          } 
          
        catch(err){
        console.log(err);
        alert("Something Went Wrong, not able to fetch furniture details")
        }
      
       
    })

   


