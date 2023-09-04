const maxIngredientsLength = 20;
const maxDescriptionLength = 100;

function limitOfDescription(description) {
  if (description.length <= maxDescriptionLength) {
    return description;
  } else {
    return description.slice(0, maxDescriptionLength) + "...";
  }
}

function displayMealsIngredients(strIngredient) {
  fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${strIngredient}`)
    .then((response) => {
      if (response.status != 200) {
        console.log("Error");
      }
      return response.json();
    })
    .then((data) => {
      let mealsIngredientsContainer = document.getElementById(
        "mealsIngredientsContainer"
      );
      let mealsIngredientsList = "";
      console.log(data);
      data.meals.slice(0, maxIngredientsLength).forEach((meal) => {
        const descriptionLength = maxDescriptionLength;
        const limitOfDescription = limitOfDescription(
          meal.strDescription || "No description available"
        );

        mealsIngredientsList += `<div class="col-md-3 mb-3 text-white text-center">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i> 
                <h2>${meal.strIngredient}</h2>
                <p class="text-center">${limitOfDescription}</p>
              </div>`;
      });

      if (mealsIngredientsContainer) {
        mealsIngredientsContainer.innerHTML = mealsIngredientsList;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

if (window.location.pathname.includes("mealsIngredients.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const strIngredient = urlParams.get("list");

  if (strIngredient) {
    displayMealsIngredients(strIngredient);
  }
}
