// Redirect to login if credentials are not found
// if (!localStorage.getItem("username") || !localStorage.getItem("password")) {
//     alert("You are not logged in!");
//     window.location.href = "index.html";
//   }

import { baseUrl } from "./baseUrl.js";

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
  await  fetch(`${baseUrl}/furniture`,{
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
let res=await fetch(`${baseUrl}/furniture`);
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
        let stocks=document.createElement("h4");
        stocks.textContent=`Stocks:${item.stocks}`;
        let ratings=document.createElement("h4");
        ratings.textContent=`Ratings:${item.ratings}⭐`;
     
        let product_image=document.createElement("img");
        product_image.src=item.product_image;
        let specificationdiv=document.createElement("div");
        specificationdiv.append(product_name,price,ratings,stocks)
// delete button
let deletebtn=document.createElement("button");
deletebtn.textContent="Delete Product";
deletebtn.setAttribute("id","delete")
deletebtn.addEventListener("click", function(){
  deleteFn(item,i);
})

card.append(product_image,specificationdiv,deletebtn);
let cont=document.getElementById("cont");
cont.append(card);

    })
}


// filter by category
let filterbycategory=document.getElementById("filterbycategory");
    filterbycategory.addEventListener("change",async function(){

      try{
        let res=await fetch(`${baseUrl}/furniture`);
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

   

// delete product function
async function deleteFn(item,i){
  if (confirm("Are you sure to delete the product??")){

 
  let productId=item.id;
  try{
await fetch(`${baseUrl}/furniture/${productId}`, {
  method:"DELETE"

});
alert("Product deleted sucessfully");
getProductDetails();
  }
  catch(err){
    console.log(err);

  }
}

}
