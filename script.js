

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


    // Check for empty
    if(searchData.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData.toString()}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
    } else {
        alert('Input Field is empty')
        }
    }



// Event Listeners
submit.addEventListener('submit', searchMeal);










