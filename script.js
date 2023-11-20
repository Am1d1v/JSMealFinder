

const search = document.querySelector('#search');
const submit = document.querySelector('#submit');
const random = document.querySelector('#random');
const mealsElements = document.querySelector('#meals');
const resultHeading = document.querySelector('#result-heading');
const single_mealElement = document.querySelector('#single-meal');


// Search meal and fetch from API
function searchMeal(event){
    event.preventDefault();


    // Clear Single Meal
    single_mealElement.innerHTML = '';


    // Get the search data
    const searchData = search.value


    // Check for empty and fetch data
    if(searchData.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData.toString()}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            resultHeading.innerHTML = `<h2>Search results for '${searchData}' :</h2>`

            
            if(data.meals === null){
                // If search meal not found
                resultHeading.innerHTML = `<h3>There are no search results for '${searchData}'</h3>`
            } else {
                mealsElements.innerHTML = data.meals.map((meal) => {
                    return `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.srtMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `
                }).join('');
            }


            // Clear Search Text
            search.value = '';


        });
    } else {
        alert('Input Field is empty')
        }
    }

// Fetch Meal by ID. Lookup full meal details by id
function getMealByID(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(mealData => {
        const meal = mealData.meals[0];
        console.log(meal)

        addMealToDOM(meal)
    });
}

// Fetch Random Meal
function randomMeal(){
    
    // Clear meals and headings
    mealsElements.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
}

// Add Meal To DOM
function addMealToDOM(meal){
    const ingredients = [];

    // Meal Ingredients and Measurements array
    for(let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            // If ingredients did't found
            break;
        }
    }
   // console.log(ingredients)

    // Insert Meal Data to DOM
    single_mealElement.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="MealImg"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>Category:  ${meal.strCategory}</p>` : ``}
            ${meal.strArea ? `<p>Country:  ${meal.strArea}</p>` : ``}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
    </div>
`;

}



// Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

mealsElements.addEventListener('click',(event) => {
    const mealInfo = event.composedPath().find((item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    }))

    // Get meal ID
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        
        getMealByID(mealID)
        
        //console.log(mealID)
    }

    //console.log(mealInfo);
});










