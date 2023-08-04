
const btn = document.getElementById("product-btn");
const popup = document.getElementById("products_page");
const homepage = document.getElementById("first-page");
btn.addEventListener('click', function() {
    popup.style.display = "block";
});


const close = document.getElementById("close-btn");

close.addEventListener('click', function() {
    popup.style.display = "none";
});


window.addEventListener('scroll', function(event) {
    let scroll = this.scrollY;
    // document.getElementById("wall").style.animation ="slide .75s ease-in-out";
   
});


const cars = document.getElementsByClassName("navbar")[0];

cars.addEventListener('click', function(event) {
    var car =event.target.id.toUpperCase();
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById(car).classList.add("active");
    console.log(car);
});