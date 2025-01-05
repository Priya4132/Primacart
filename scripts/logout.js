function logout() {
    let customerData = JSON.parse(localStorage.getItem("customersData"));

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loginData");
        alert("Redirecting to Home Page....");
        window.location.href = "index.html";
      });
    }
    
    export {logout}