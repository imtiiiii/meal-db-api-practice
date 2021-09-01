const inputValue = () => {
    const inputField = document.getElementById('search-input');

    if (inputField.value != '')
        loadData(inputField.value);
    inputField.value = '';
};

const loadData = value => {
    const url = `HTTPS://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.meals));


};
const showData = data => {
    console.log(data.length);
    //now get the parent div where we will append the search results;
    const parentDiv = document.getElementById('search-result');

    parentDiv.textContent = '';
    data.forEach(element => {
        const itemId = element.idMeal;
        const contentDiv = document.createElement('div');
        const itemPic = element.strMealThumb;
        const itemName = element.strMeal;
        const itemDescription = element.strInstructions.slice(0, 250); // reduced the amount of character using slice to dispay short description
        //   console.log(itemName, itemDescription);

        contentDiv.innerHTML = `
        <div class="card shadow-lg" style="width: 18rem;"onclick="singleItemDetails(${itemId})">
                    <img src="${itemPic}" class="card-img-top img-fluid" alt="pic not found">
                    <div class="card-body">
                        <h5 class="card-title">${itemName}</h5>
                        <p class="card-text">${itemDescription}</p>
                        <a href="#" class="btn btn-primary">More details</a>
                    </div>
                </div>

        `;
        parentDiv.appendChild(contentDiv);

    });
};

const singleItemDetails = id => {
    console.log(id);
    const url = `HTTPS://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSingleItem(data.meals[0]));
}

const showSingleItem = info => {
    console.log(info);
    const parentDiv = document.getElementById('single-item');
    parentDiv.innerHTML = `

    <h1 class="text-center">Item details:</h1>
    <div class="card shadow-lg" style="width: 18rem;">
    <img src="${info.strMealThumb}" class="card-img-top img-fluid" alt="pic not found">
    <div class="card-body">
        <h5 class="card-title">${info.strMeal}</h5>
        <p class="card-text">${info.strInstructions.slice(0, 150)}</p>
        <a href="#" class="btn btn-primary">More details</a>
    </div>
</div>
    `;
};