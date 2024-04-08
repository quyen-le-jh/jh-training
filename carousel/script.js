const imageSources = [
  "assets/blog-1.jpeg",
  "assets/blog-2.jpeg",
  "assets/blog-3.jpeg",
  "assets/product-1.jpeg",
  "assets/product-2.jpeg",
];

document.getElementById("main-image").setAttribute("src", imageSources[0]);

const imageList = document.getElementById("image-list");

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

for (let i = 0; i < imageSources.length; i++) {
  document.getElementById("img-" + i).addEventListener("click", () => {
    removeActiveImage(imageSources);
    document.getElementById("main-image").setAttribute("src", imageSources[i]);
    document.getElementById("img-" + i).classList.add("active");
  });
}

function nextImg() {
  let img = document.getElementById("main-image");
  removeActiveImage(imageSources);
  let index = imageSources.indexOf(img.getAttribute("src"));

  if (index == imageSources.length - 1) {
    img.setAttribute("src", imageSources[0]);
    document.getElementById("img-0").classList.add("active");
  } else {
    img.setAttribute("src", imageSources[index + 1]);
    document.getElementById("img-" + (index + 1)).classList.add("active");
  }
}

function previousImg() {
  let img = document.getElementById("main-image");
  removeActiveImage(imageSources);
  let index = imageSources.indexOf(img.getAttribute("src"));
  if (index == 0) {
    img.setAttribute("src", imageSources[imageSources.length - 1]);
    document
      .getElementById("img-" + (imageSources.length - 1))
      .classList.add("active");
  } else {
    img.setAttribute("src", imageSources[index - 1]);
    document.getElementById("img-" + (index - 1)).classList.add("active");
  }
}

document.getElementById("next").addEventListener("click", nextImg);
document.getElementById("previous").addEventListener("click", previousImg);
