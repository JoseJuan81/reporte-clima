import axios from 'axios';

const weatherApi = process.env.VUE_APP_WEATHER_API;

const WeatherHourlyService = axios.create({
	baseURL: weatherApi,
});

export default WeatherHourlyService;
