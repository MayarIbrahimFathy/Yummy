
function allCategories() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const categoryContainer = document.getElementById("categoryContainer");
      let categoryList = "";

      data.categories.forEach((category) => {
        categoryList += `
          <div class="categoryClass col-md-3 meal-item"> 
            <div class="meal-image">
              <img src="${category.strCategoryThumb}" class="w-100 mb-3 rounded-3">
              <div class="overlay rounded-3">
                <h2 class="text-black">${category.strCategory}</h2>
              </div>
            </div>
          </div>`;
         
      });
      categoryContainer.innerHTML = categoryList;

      const catImages = document.querySelectorAll(".meal-image");
      catImages.forEach((catImg) => {
        catImg.addEventListener("click", () => {
          const categoryName = catImg.querySelector("h2").textContent.trim();
          window.location.href = `meals.html?category=${categoryName}`;
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


allCategories();
