<template>
	<div ref="weather-chart"></div>
</template>

<script>
import { isEmpty } from 'functionallibrary';
import LineChart from '@/class/LineChart';

function mounted() {
	this.container = this.$refs['weather-chart'];
	this.line = new LineChart({
		container: this.container,
		height: window.innerHeight / 2,
		width: window.innerWidth - 20,
	});
}

function handleDataUpdated() {
	if (!isEmpty(this.currentData) && !isEmpty(this.aYearAgoData)) {
		this.line.init(
			this.currentData,
			this.aYearAgoData,
		);
	}
}

function data() {
	return {
		container: null,
		line: null,
	};
}

export default {
	name: 'WeatherChart',
	data,
	mounted,
	props: {
		currentData: {
			required: true,
			type: Object,
		},
		aYearAgoData: {
			required: true,
			type: Object,
		},
	},
	watch: {
		aYearAgoData: handleDataUpdated,
		currentData: handleDataUpdated,
	},
};
</script>

<style lang="scss" scoped>

</style>
