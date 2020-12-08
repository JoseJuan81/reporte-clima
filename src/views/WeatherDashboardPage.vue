<template>
	<div>
		<select
			name="cities"
			v-model="selectedCity.city_name"
			@change="setNewCity"
		>
			<option
				v-for="city in cities"
				:key="`${city.city_name}-${city.country}`"
			>{{city.city_name}}</option>
		</select>
		<h3>{{JSON.stringify(selectedCity)}}</h3>
	</div>
</template>

<script>
import { addDays, sub, format } from 'date-fns';
import { equality, find } from 'functionallibrary';
import Cities from '@/shared/data/cities.json';
import WeatherHourlyService from '@/axios';

const baseFormat = (dateFormat) => (date) => format(date, dateFormat);
const dailyFormat = baseFormat('yyyy-MM-dd');

const apiKey = process.env.VUE_APP_WEATHER_API_KEY;

function mounted() {
	this.loadDefaultData();
	this.loadWeatherData();
}

function loadDefaultData() {
	this.selectedCity = this.defaultCity;
}

async function loadTodayWeatherData() {
	const params = {
		latitude: this.selectedCity.latitude,
		longitude: this.selectedCity.longitude,
		startDate: dailyFormat(this.today),
		endDate: dailyFormat(addDays(this.today, 1)),
	};

	const url = this.buildUrl(params);

	try {
		({
			data: this.selectedCityTodayWeatherData,
		} = await WeatherHourlyService.get(url));
	} catch (error) {
		console.error('No se pudo obtener la información de la ciudad', error);
	}
}

async function loadAYearAgoWatherData() {
	const lastYear = this.getLastYear();
	const params = {
		endDate: dailyFormat(addDays(lastYear, 1)),
		latitude: this.selectedCity.latitude,
		longitude: this.selectedCity.longitude,
		startDate: dailyFormat(lastYear),
	};

	const url = this.buildUrl(params);

	try {
		({
			data: this.selectedCityLastYearWeatherData,
		} = await WeatherHourlyService.get(url));
	} catch (error) {
		console.error('No se pudo obtener la información de la ciudad', error);
	}
}

async function loadWeatherData() {
	await Promise.all([
		this.loadTodayWeatherData(),
		this.loadAYearAgoWatherData(),
	]);
}

function getLastYear() {
	return sub(
		this.today,
		{ years: 1 },
	);
}

function buildUrl({ endDate, startDate, latitude, longitude }) {
	const urlBase = 'hourly';
	const sDate = `start_date=${startDate}`;
	const eDate = `end_date=${endDate}`;
	const lat = `lat=${latitude}`;
	const lon = `lon=${longitude}`;
	const key = `key=${apiKey}`;
	return `${urlBase}?${sDate}&${eDate}&${lat}&${lon}&${key}`;
}

function setNewCity(ev) {
	const { currentTarget: { value } } = ev;
	const getCity = find(equality('city_name', value));
	const selectedCity = getCity(this.cities);
	this.selectedCity = { ...selectedCity };
	this.loadWeatherData();
}

function data() {
	return {
		cities: Cities,
		defaultCity: {
			rank_code: 14,
			city_name: 'Budapest',
			country: 'Hungary',
			population: '1,759,407',
			date: '1 January 2015',
			latitude: 47.4925,
			longitude: 19.051389,
		},
		selectedCity: {},
		selectedCityTodayWeatherData: null,
		selectedCityLastYearWeatherData: null,
		today: new Date(),
	};
}

export default {
	name: 'WeatherDashboardPage',
	data,
	methods: {
		buildUrl,
		getLastYear,
		loadAYearAgoWatherData,
		loadDefaultData,
		loadTodayWeatherData,
		loadWeatherData,
		setNewCity,
	},
	mounted,
};
</script>

<style lang="scss" scoped>

</style>
