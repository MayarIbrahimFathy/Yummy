function displayMealsByName(nameQuery) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameQuery}`)
    .then((response) => {
      if (response.status !== 200) {
        console.log("Error");
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      const mealsContainer = document.getElementById("mealsContainer");
      let mealsHTML = "";
      console.log(data);
      data.meals.forEach((meal) => {
        mealsHTML += `
            <div class="meal col-md-2 d-inline-block p-2">
            <div class="meal-image">
            <img src="${meal.strMealThumb}" class="w-100 mealImage rounded-3 " alt="${meal.strMeal}" />
            <div class="overlay rounded-3">
              <h2 class="text-black">${meal.strMeal}</h2>
              </div>
            </div>
            </div>
          `;
      });
      

      if (mealsContainer) {
        mealsContainer.innerHTML = mealsHTML;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function displayMealsByLetter(letterQuery) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterQuery}`)
    .then((response) => {
      if (response.status !== 200) {
        console.log("Error");
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      const mealsContainer = document.getElementById("mealsContainer");
      let mealsHTML = "";

      data.meals.forEach((meal) => {
        mealsHTML += `
            <div class="meal col-md-3">
              <h2>${meal.strMeal}</h2>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            </div>
          `;
      });

      if (mealsContainer) {
        mealsContainer.innerHTML = mealsHTML;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

const searchByNameInput = document.getElementById("searchByName");
const searchByLetterInput = document.getElementById("searchByLetter");

searchByNameInput.addEventListener("input", () => {
  const searchQuery = searchByNameInput.value.trim();
  displayMealsByName(searchQuery);
});

searchByLetterInput.addEventListener("input", () => {
  const searchLetter = searchByLetterInput.value.trim();
  displayMealsByLetter(searchLetter);
});
