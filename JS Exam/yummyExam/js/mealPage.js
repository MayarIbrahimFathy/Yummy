document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("id");

  if (!mealId) {
    alert("Meal ID not found in URL");
    window.location.href = "categories.html";
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        if (response != 200) {
          console.log("error");;
        }
        return response.json();
      })
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];

          const mealTitleElement = document.getElementById("meal-title");
          const mealImageElement = document.getElementById("meal-image");
          const mealInstructionsElement =
            document.getElementById("meal-instructions");
          const mealAreaElement = document.getElementById("meal-area");
          const mealCategoryElement = document.getElementById("meal-category");
          const mealIngredientsElement =
            document.getElementById("meal-ingredients");
          const mealTagsElement = document.getElementById("meal-tags");
          const youtubeButton = document.getElementById("youtube-button");

          mealTitleElement.textContent = meal.strMeal;
          mealImageElement.src = meal.strMealThumb;
          mealInstructionsElement.textContent = meal.strInstructions;
          mealAreaElement.textContent = meal.strArea;
          mealCategoryElement.textContent = meal.strCategory;

          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measurement = meal[`strMeasure${i}`];
            if (ingredient && measurement) {
              const ingredientBadge = document.createElement("div");
              ingredientBadge.classList.add("ingredient-badge");
              ingredientBadge.textContent = `${ingredient}: ${measurement}`;
              mealIngredientsElement.appendChild(ingredientBadge);
            }
          }

          mealTagsElement.textContent = meal.strTags;

          youtubeButton.addEventListener("click", function () {
            window.open(meal.strYoutube, "_blank");
          });
        } else {
          alert("Meal details not found");
          window.location.href = "categories.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
