const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestionsList = document.querySelector('.suggestions');

let cityData;
fetch(endpoint)
	.then(response => response.json())
	.then(data => {
		cityData = data;
	});

searchInput.addEventListener('input', function() {
	if (!this.value) {
		suggestionsList.innerHTML = '<li>Filter for a city</li><li>or a state</li>';
		return;
	}
	const regex = new RegExp(this.value, 'i');
	const matches = cityData.filter(data => regex.test(data.city) || regex.test(data.state));
	suggestionsList.innerHTML = '';
	matchedElements = '';
	let locationString;
	matches.forEach(match => {
		locationString = `${match.city}, ${match.state}`.replace(regex, m => `<span class="hl">${m}</span>`);
		matchedElements += `<li> <span>${locationString}</span> <span class="population">${match.population}</span></li>\n`;
	});
	suggestionsList.innerHTML += matchedElements;
});
