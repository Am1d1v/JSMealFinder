

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
    console.log(searchData, typeof searchData)


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
                }).join(' ');
            }


            // Clear Search Text
            search.value = '';


        });
    } else {
        alert('Input Field is empty')
        }
    }



// Event Listeners
submit.addEventListener('submit', searchMeal);










