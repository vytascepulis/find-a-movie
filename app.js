const container = document.querySelector('#card-container');

const fetchData = async term => {
	let promises = [];
	let res = await axios.get(`http://www.omdbapi.com/`, {
        params: {
            apikey: 'd9835cc5',
            s: term,
        }
    })
	let results = res.data.Search;
	results.forEach(result => {
		promises.push(axios.get(`http://www.omdbapi.com/`, {
            params: {
                apikey: 'd9835cc5',
                i: result.imdbID
            }}))})
    
    container.innerHTML = ''; // išvalyti #card-container

    let allPromises = await Promise.all(promises);
    allPromises.forEach(element => {
        element = element.data;
        if (element.Poster != 'N/A') {

            // Kortelės sukūrimas
            let divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');
            container.appendChild(divCard);

            divCard.innerHTML = `
                <div class="card-info">
                    <h1>${element.Title}</h1>
                    <h2>${element.Year}</h2>
                    <h3>${element.Genre}</h3>
                    <div class="about">${element.Plot}</div>
                    <div class="imdb">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" width="90">
                        <div class="rating">
                            <span class="top">${element.imdbRating}</span>
                            <span class="bot">${element.imdbVotes}</span>
                        </div>
                    </div>
                </div>
                `;
            divCard.style.backgroundImage = `url(${element.Poster})`;
        }
    })
}



const searchForm = document.querySelector('#search-form');
const searchField = document.querySelector('.search-field')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Tik atidarius veikia submit
    if (searchField.offsetWidth) fetchData(searchField.value);
    
    // Search field animacija
    searchField.style.padding = '10px';
    searchField.style.width = 'calc(100% - 110px)';
    searchField.focus();
})

