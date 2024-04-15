document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-list li");

  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      navItems.forEach(function (navItem) {
        navItem.classList.remove("active");
      });
      this.classList.add("active");

      const targetId = this.querySelector("a")
        .getAttribute("href")
        .substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".portfolio-categories .text");

  categories.forEach(function (category) {
    category.addEventListener("click", function () {
      categories.forEach(function (cat) {
        cat.classList.remove("text-active");
      });
      this.classList.add("text-active");
    });
  });
});
