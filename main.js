const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestionsList = document.querySelector('.suggestions');

fetch(endpoint)
	.then(response => response.json())
	.then(cityData => {
		searchInput.addEventListener('input', () => filterCityData(cityData));
	});

function filterCityData(cityData) {
	if (!searchInput.value) {
		suggestionsList.innerHTML = '<li>Filter for a city</li><li>or a state</li>';
		return;
	}
	const regex = new RegExp(searchInput.value, 'gi');
	suggestionsList.innerHTML = cityData
		.filter(data => regex.test(data.city) || regex.test(data.state))
		.reduce((acc, match) => {
			const locationString = `${match.city}, ${match.state}`
				.replace(regex, m => `<span class="hl">${m}</span>`);
			return acc += 
				`<li>
					<span>${locationString}</span> 
					<span class="population">${match.population}</span>
				</li>\n`;
	}, '');
}
