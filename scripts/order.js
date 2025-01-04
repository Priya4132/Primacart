let customerData = JSON.parse(localStorage.getItem("customersData"));

if (customerData === null) {
    alert("You are not logged in, Please Login to check order Details");
    window.location.href = "login1.html";
}


window.onload = async () => {
    // let data=await getFurnitureDetails();
    let customerData = JSON.parse(localStorage.getItem("customersData"));
    console.log(customerData);
    let customerId = null;
    if (customerData != null) {
        customerId = customerData.id;
    }
    let orderPerCustomer = JSON.parse(localStorage.getItem("orderPerCustomer")) || [];//fetching wishlisted products from local storage if already present or an empty array
    console.log("orderPerCustomer=", orderPerCustomer);
    let orderForThisCustomer = orderPerCustomer.filter((ele, i) => ele.customerId == customerId)[0];
    console.log("orderForThisCustomer=", orderForThisCustomer);
    if (orderForThisCustomer == undefined || orderPerCustomer == null) {
        alert("No products in order")
    } else {
        let orders = orderForThisCustomer.orders;
        // console.log("hi",orderForThisCustomer)
        let ordersDiv = document.getElementById("orders");
        let elementCustomerTitle = document.createElement("h1");
        elementCustomerTitle.textContent = `Hello ${customerData.signup_name}, thanks for choosing Primacart` 
        ordersDiv.append(elementCustomerTitle);
        
        orders.map((item, i) => {
            let orderId = item.orderId;
            let paymentMethod = item.paymentMethod;
            let totalPrice = item.totalPrice;
            let address = item.address;
            let pincode = item.pincode;
            let dateAndTime = item.dateAndTime;

            console.log(paymentMethod)
            // console.log(orderId);
            let elementOrderTitle = document.createElement("h2");
            elementOrderTitle.textContent = `Below are details for your order with id=#${orderId}:`        
            let elementOrderDate = document.createElement("h3");
            elementOrderDate.textContent = `Ordered on date: ${dateAndTime}`;
            let elementTotalPrice = document.createElement("h3");
            elementTotalPrice.textContent = `Total amount paid = ₹${totalPrice}, using payment mode: ${paymentMethod}`;
            let elementOrderDeliveryDetails = document.createElement("h3");
            elementOrderDeliveryDetails.textContent = `Your Order will be delivered at this Address:${address}.${pincode}`;
            ordersDiv.append(elementOrderTitle, elementOrderDate, elementTotalPrice, elementOrderDeliveryDetails);

            console.log("orderArray=", item.orderedProducts);
            showOrderDetails(item.orderedProducts);
        });
    }

}

function showOrderDetails(arr) {
    let ordersDiv = document.getElementById("orders");
    let allProducts = document.createElement("div");
    allProducts.append(document.createElement("h3").textContent = "Products ordered:" )
    allProducts.setAttribute("class", "hl");
    ordersDiv.append(allProducts);
    arr.map((item, i) => {
        let card = document.createElement("div");
        let product_name = document.createElement("h4");
        product_name.textContent = item.product_name;
        let price = document.createElement("h4");
        price.textContent = `Price:₹${item.price}`;
        let ratings = document.createElement("h4");
        ratings.textContent = `Ratings:${item.ratings}⭐`;


        let product_image = document.createElement("img");
        product_image.src = item.product_image;
        let specificationdiv = document.createElement("div");
        specificationdiv.append(product_name, price, ratings)
        card.append(product_image, specificationdiv);

        allProducts.append(card);
    })

}


