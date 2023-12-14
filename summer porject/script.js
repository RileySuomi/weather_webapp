async function getWeather() {
    const apiKey = '0f72adedaf15d4ecd62e6aff95c5a295'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('cityInput').value;

    // Make sure the user entered a city
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    // Make API request
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        // display weather
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayCityName(data); // wanted to display the city name elsewhere for weather details
        displayWeather(data);

        // display image of the entered city
        const imageUrl = `https://source.unsplash.com/featured/?${city}`;
        displayCityImage(imageUrl);
    } 
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

//function to display weather and other weather related details
function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    var temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    var feeling = data.main.feels_like;

    temperature = (temperature * 9/5) + 32; // calculations to show in farenheit
    temperature = Math.round(temperature);

    feeling = (feeling * 9/5) + 32; // show feel-like in farenheit as well
    feeling = Math.round(feeling);


    const resultHTML = `
        <p>Temperature: ${temperature}°F </p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}</p>
        <p>feels-like: ${feeling}°F</p>
    `;

    weatherResult.innerHTML = resultHTML;
}

function displayCityName (data) {
    const nameResult = document.getElementById('nameResult');
    const cityName = data.name;

    const resultHTML = `<h2> ${cityName} </h2>`;
    nameResult.innerHTML = resultHTML;
}

//function for displaying city image
function displayCityImage(imageUrl) {
    // test to see if we were retreiving images form unsplash
    console.log('img:', imageUrl);
    const cityImage = document.getElementById('cityImage');

    cityImage.onerror = function() {
        console.error('Error loading city image.');
    };

     // Create a new img element
     const imgElement = document.createElement('img');
     imgElement.src = imageUrl;
 
     // Remove any existing child elements before appending the new img element
     while (cityImage.firstChild) {
         cityImage.removeChild(cityImage.firstChild); // makes it so we can get new pictures
     }
 
     // Append the new img element to the cityImage div
     cityImage.appendChild(imgElement);

}



