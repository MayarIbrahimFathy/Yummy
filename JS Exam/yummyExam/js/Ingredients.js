
const maxIngredientsLength = 20; 
const maxDescriptionLength = 100;

function limitOfDescription(description) {
  
  if (description.length <= maxDescriptionLength) {
    return description;
  } else {
    return description.slice(0, maxDescriptionLength) + "...";
  }
}

fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
  .then((response) => { 
    if (response.status != 200) {
      console.log("Error");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const ingredientsContainer = document.getElementById("ingredientsContainer");
    let ingredientsList = "";

    data.meals.slice(0, maxIngredientsLength).forEach((meal) => {
      const descriptionLength = maxDescriptionLength;
      
      const limitedDescription = limitOfDescription(
        meal.strDescription || "No description available"
      );

      ingredientsList += `<div class="ingredientsClass col-md-3 mb-3 text-white text-center"> 
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h2>${meal.strIngredient}</h2>
        <p class="text-center">${limitedDescription}</p>
      </div>`;
    });

    ingredientsContainer.innerHTML = ingredientsList;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
