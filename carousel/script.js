const imageSources = [
  "assets/blog-1.jpeg",
  "assets/blog-2.jpeg",
  "assets/blog-3.jpeg",
  "assets/product-1.jpeg",
  "assets/product-2.jpeg",
];

const mainImage = document.getElementById("main-image");
const imageList = document.getElementById("image-list");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

function initialize() {
  mainImage.setAttribute("src", imageSources[0]);

  for (let i = 0; i < imageSources.length; i++) {
    document.getElementById("img-" + i).addEventListener("click", () => {
      removeActiveImage(imageSources);
      mainImage.setAttribute("src", imageSources[i]);
      document.getElementById("img-" + i).classList.add("active");
    });
  }
}

imageSources.forEach((source) => {
  const img = document.createElement("img");
  img.src = source;
  img.style.width = "100%";

  const li = document.createElement("li");
  li.appendChild(img);
  li.id = "img-" + imageSources.indexOf(source);

  imageList.appendChild(li);
});

function removeActiveImage(arr) {
  for (let i = 0; i < arr.length; i++) {
    document.getElementById("img-" + i).classList.remove("active");
  }
}

function nextImage() {
  removeActiveImage(imageSources);
  let index = imageSources.indexOf(mainImage.getAttribute("src"));

  if (index == imageSources.length - 1) {
    mainImage.setAttribute("src", imageSources[0]);
    document.getElementById("img-0").classList.add("active");
  } else {
    mainImage.setAttribute("src", imageSources[index + 1]);
    document.getElementById("img-" + (index + 1)).classList.add("active");
  }
}

function previousImage() {
  removeActiveImage(imageSources);
  let index = imageSources.indexOf(mainImage.getAttribute("src"));

  if (index == 0) {
    mainImage.setAttribute("src", imageSources[imageSources.length - 1]);
    document
      .getElementById("img-" + (imageSources.length - 1))
      .classList.add("active");
  } else {
    mainImage.setAttribute("src", imageSources[index - 1]);
    document.getElementById("img-" + (index - 1)).classList.add("active");
  }
}

nextButton.addEventListener("click", nextImage);
previousButton.addEventListener("click", previousImage);

initialize();
