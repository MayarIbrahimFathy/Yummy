function displayAreaMeals(areaName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    .then((response) => {
      if (response.status !== 200) {
        console.log("Error");
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      let areaMealsContainer = document.getElementById("areaMealsContainer");
      let areaMealsList = "";

      data.meals.forEach((meal) => {
        areaMealsList += `<div class="col-md-3 mb-2 meal-item"> 
        <div class="meal-image">
            <img src="${meal.strMealThumb}" class="mealImage w-100 rounded-3">
            <div class="overlay">
                <h2 class="text-black">${meal.strMeal}</h2>
            </div>
        </div>
    </div>`;
      });

      if (areaMealsContainer) {
        areaMealsContainer.innerHTML = areaMealsList;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

if (window.location.pathname.includes("areaMeals.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const areaName = urlParams.get("a");

  if (areaName) {
    displayAreaMeals(areaName);
  }
}
