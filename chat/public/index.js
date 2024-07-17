const galery = document.querySelector('.my-container');

const form = document.querySelector('form');

function displayImages() {
    fetch('http://localhost:8080/multimedia', {
        method: "GET"
    })
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                let div = document.createElement('div');
    
                div.className = 'mySlides';
    
                let image = document.createElement('img');
    
                image.src = file.name;
    
                image.alt = 'galery image';
    
                div.appendChild(image);
    
                galery.appendChild(div);
            });
        });
}

displayImages();

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

form.addEventListener('submit', displayImages);