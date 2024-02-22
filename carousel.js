const carouselItem = document.querySelectorAll(".carousel-item");
const carouselActive = document.querySelectorAll(".carousel-active");
const prevBtn = document.getElementsByClassName("prev-btn");
const nextBtn = document.getElementsByClassName("next-btn");
let currIndex = 0;
let carouselLength = carouselItem.length;

function currentSlide(index) {
  carouselItem.forEach((items) => {
    items.style.display = "none";
  });
  carouselActive.forEach((items) => {
    items.style.zoom = "normal";
  });
  carouselItem[index].style.display = "block";
  carouselActive[index].style.zoom = "150%";
}

function nextSlide() {
  currIndex = (currIndex + 1) % carouselLength;
  currentSlide(currIndex);
}

function previousSlide() {
  currIndex = (currIndex - 1 + carouselLength) % carouselLength;
  currentSlide(currIndex);
}

currentSlide(currIndex);

setInterval(() => {
  nextSlide(currIndex);
}, 2000);

nextBtn[0].addEventListener("click", nextSlide);
prevBtn[0].addEventListener("click", previousSlide);
