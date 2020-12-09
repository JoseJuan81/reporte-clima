<template>
	<div>
		<h1
			class="text-5xl font-black my-8 font-poppins-bold px-4 text-gray-600"
		>Seleccione una ciudad</h1>

		<div class="h-12 w-full md:w-1/3 px-4 mx-auto">
			<select
				:class="[
					'h-full w-full border border-gray-300 border-solid px-6',
					'font-poppins-regular text-secondary',
				]"
				name="cities"
				v-model="selectedCity.city_name"
				@change="setNewCity"
			>
				<option
					v-for="city in cities"
					:key="`${city.city_name}-${city.country}`"
				>{{city.city_name}}</option>
			</select>
		</div>

		<h3
			class="text-2xl font-poppins-bold px-4 my-4 ml-8 text-gray-400 text-left"
		>
			Gráfica: <span class="text-gray-600 ml-4">
				Temperatura por hora
				</span>
		</h3>
		<h3
			class="text-2xl font-poppins-bold px-4 my-4 ml-8 text-gray-400 text-left"
		>
			Día: <span class="text-gray-600 ml-4">
				Hoy,
					<span class="text-today">{{new Date().toLocaleDateString()}}</span>
					<span class="text-lastYear ml-4">({{
						new Date(getLastYear()).toLocaleDateString()
					}})</span>
				</span>
		</h3>

		<WeatherChart
			class="mt-8 px-4"
			:currentData="selectedCityTodayWeatherData"
			:aYearAgoData="selectedCityLastYearWeatherData"
		/>

	</div>
</template>

<script>
import { addDays, sub, format } from 'date-fns';
import { equality, find } from 'functionallibrary';
import Cities from '@/shared/data/cities.json';
import WeatherHourlyService from '@/axios';
import WeatherChart from '@/components/WeatherChart.vue';

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
		console.error('No se pudo obtener la información Today de la ciudad', error);
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
		console.error('No se pudo obtener la información LastYear de la ciudad', error);
	}
}

async function loadWeatherData() {
	await Promise.all([
		this.loadTodayWeatherData(),
		this.loadAYearAgoWatherData(),
	]);
}

function getLastYear() {
	return sub(this.today, { years: 1 });
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
	const orderedCities = Cities.sort((a, b) => {
		if (a.city_name > b.city_name) return 1;
		if (a.city_name < b.city_name) return -1;
		return 0;
	});
	return {
		cities: orderedCities,
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
		selectedCityTodayWeatherData: {},
		selectedCityLastYearWeatherData: {},
		today: new Date(),
	};
}

export default {
	name: 'WeatherDashboardPage',
	components: {
		WeatherChart,
	},
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
