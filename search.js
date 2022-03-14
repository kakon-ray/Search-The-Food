function searchFood() {
  const searchFild = document.getElementById("search-fild");
  const searchText = searchFild.value;

  if (searchText == "") {
    document.getElementById("noresult").innerText = "Please Input Some Value";
    const foodDetails = document.getElementById("food-details");
    foodDetails.innerHTML = "";
  } else {
    document.getElementById("noresult").innerText = "Search The Food";
    searchFild.value = "";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayUser(data));
  }
}

function displayUser(data) {
  const foodDetails = document.getElementById("food-details");

  foodDetails.innerHTML = "";
  const food = data.meals;

  try {
    food.forEach((element) => {
      const div = document.createElement("div");

      div.innerHTML = `
  
     <div class="col my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${element.strMeal}</h5>
        <img src="${element.strMealThumb}" class="img-fluid"></img>
        <button class="btn btn-primary my-2" onclick = "idDetails(${element.idMeal})">Go somewhere</button>
      </div>
    </div>
  
    </div>
    `;
      foodDetails.appendChild(div);
    });
  } catch (error) {
    console.log(error);
  }
}

function idDetails(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => mailIdDetails(data));
}

function mailIdDetails(data) {
  const detailsContaienr = document.getElementById("mail-details");
  detailsContaienr.innerHTML = "";

  data.meals.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="mx-auto w-50">
    <img src="${item.strMealThumb}" class="w-75 h-50"></img>
      <h2>${item.strIngredient1}</h2>
      <p>${item.strMeal}</p>
  </div>
    `;

    detailsContaienr.appendChild(div);
  });
}

// Enter Button Click search value show
const searchFild = document.getElementById("search-fild");
searchFild.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    document.getElementById("button").click();
  }
});
