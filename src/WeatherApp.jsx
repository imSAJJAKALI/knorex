import React, { useState, useEffect } from 'react';
import './weather.css'; 

const WeatherComponent = () => {
    const [cityName, setCityName] = useState('Singapore');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = '31b7185bccf137e1855c1c6256268743';

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`, setWeatherData);

       
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`, setForecastData);
    }, [cityName]);

    const fetchWeatherData = (url, setData) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            });
    };

    const handleCityChange = (e) => {
        setCityName(e.target.value);
    };

    return (
        <>
            <h1>Weather App</h1>
            <select onChange={handleCityChange} value={cityName}>
                <option value="">Select a city</option>
                <option value="Ho Chi Minh">Ho Chi Minh</option>
                <option value="Singapore">Singapore</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Athens">Athens</option>
            </select>
            <div className="weather-container">
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {weatherData && (
                    <div className="current-weather">
                        <h2>Current Weather</h2>
                        <h3 >City: <span style={{color:"blueviolet"}}>{weatherData.name}</span></h3>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Description: {weatherData.weather[0].description}</p>
                    </div>
                )}
                {forecastData && (
                    <div className="forecast">
                        <h2>Next 3 Days Forecast</h2>
                        {forecastData.list.slice(0, 3).map((forecast, index) => (
                            <div key={index} className="forecast-item">
                                <p>Date: {forecast.dt_txt.split(" ")[0]}</p>
                                <p>Temperature: {forecast.main.temp} °C</p>
                                
                                <p>Description: {forecast.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default WeatherComponent;
