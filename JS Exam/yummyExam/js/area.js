fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  .then((response) => response.json())
  .then((data) => {
    console.log("Areas:", data);

    let areaContainer = document.getElementById("areaContainer");
    let areasList = "";

    data.meals.forEach((area) => {
      areasList += `<div class="col-md-3 mb-3 text-white"> 
  
      <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h2 class="arName">${area.strArea}</h2>
          
        </div>`;
    });

    if (areaContainer) {
      areaContainer.innerHTML = areasList;

      const arNameElements = document.querySelectorAll(".arName");

      arNameElements.forEach((ar) => {
        ar.addEventListener("click", () => {
          console.log("Clicked");

          const areaName = ar.textContent.trim();
          console.log("Area Name:", areaName);

          window.location.href = `areaMeals.html?a=${areaName}`;
        });
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
