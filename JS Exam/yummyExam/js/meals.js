function displayMeals(categoryName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((response) => {
      if (response.status != 200) {
        console.log("Error");
      }
      return response.json();
    })
    .then((data) => {
      let mealsContainer = document.getElementById("mealsContainer");
      let mealList = "";
      data.meals.forEach((meal) => {
        mealList += `<div class="col-md-3 mb-3 meal-item" data-meal-id="${meal.idMeal}"> 
        <div class="meal-image"> 
          <img src="${meal.strMealThumb}" class="mealImage w-100 rounded-3">
          <div class="overlay rounded-3">
          <h2 class="text-black ">${meal.strMeal}</h2></div>
          </div>
        </div>`;
      });

      if (mealsContainer) {
        mealsContainer.innerHTML = mealList;
        const mealItems = document.querySelectorAll(".meal-item");
        mealItems.forEach((mealItem) => {
          mealItem.addEventListener("click", () => {
            const mealId = mealItem.getAttribute("data-meal-id");
            window.location.href = `mealPage.html?id=${mealId}`;
          });
        });
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

if (window.location.pathname.includes("meals.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryName = urlParams.get("category");

  if (categoryName) {
    displayMeals(categoryName);
  }
}
