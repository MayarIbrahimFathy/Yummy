document.addEventListener("DOMContentLoaded", () => {
  const mealList = document.getElementById("mealList");

  async function fetchRandomMeals() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      if (response != 200) {
        console.log("Error");
      }
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  async function displayMeals() {
    const meals = await fetchRandomMeals();

    if (meals.length === 0) {
      mealList.innerHTML = "<p>No meals available at the moment.</p>";
      return;
    }

    const maxMeals = 20;
    for (let i = 0; i < Math.min(maxMeals, meals.length); i++) {
      const meal = meals[i];
      const mealItem = document.createElement("div");
      mealItem.classList.add("meal-item");
      mealItem.innerHTML = `
            <div class="meal-image mb-2">
          
            <img src="${meal.strMealThumb}" class="mealImage w-25 rounded-3 ">
            <div class="overlay rounded-3 w-25">
            <h2 class="text-black">${meal.strMeal}</h2></div>
            </div>
            `;
      mealList.appendChild(mealItem);
    }
  }

  displayMeals();
});
