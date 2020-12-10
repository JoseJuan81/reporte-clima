import { setNewProperty } from 'functionallibrary';
import {
	axisBottom,
	axisLeft,
	// curveNatural,
	curveStep,
	line,
	max,
	min,
	select,
	scaleBand,
	scaleLinear,
	// transition,
} from 'd3';

const curve = curveStep;

class Line {
	constructor({ container, height, width }) {
		this.hours = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
		];

		this.svg = select(container).append('svg')
			.attr('width', width).attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);
		this.g = this.svg.append('g');
		this.axisXContainer = this.svg.append('g');
		this.axisYContainer = this.svg.append('g');
		this.currentCircleContainer = this.svg.append('g');
		this.oldCircleContainer = this.svg.append('g');
		this.currentPath = this.g.append('path');
		this.oldPath = this.g.append('path');

		this.x = null;
		this.y = null;

		this.height = height;
		this.margin = { bottom: 40, left: 40, right: 20, top: 30 };
		this.width = width;

		this.duration = 2000;

		this.minTempValue = 0;
	}

	init(cData, oData) {
		const transformingDate = (acc, d) => {
			if (d.temp === null) {
				return acc;
			}
			const { datetime } = d;
			const [, h] = datetime.split(':');
			const transformedEl = setNewProperty('datetime', Number(h), d);
			return acc.concat(transformedEl);
		};

		const currentData = { ...cData };
		const oldData = { ...oData };
		currentData.data = cData.data.reduce(transformingDate, []);
		oldData.data = oData.data.reduce(transformingDate, []);

		this.axisX(currentData, oldData);
		this.axisY(currentData, oldData);

		this.axisXLabel();
		this.axisYLabel();

		this.currentCircle(currentData);
		this.currentLabel(currentData);
		this.drawCurrentLine(currentData);

		this.oldCircle(oldData);
		this.drawOldLine(oldData);
		this.oldLabel(oldData);
	}

	axisX() {
		this.x = scaleBand()
			.domain(this.hours)
			.range([this.margin.left, this.width - this.margin.right]);

		this.axisXContainer
			.attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
			.call(axisBottom(this.x).ticks(24));
	}

	axisY(currentData, oldData) {
		const currentMinTemp = min(currentData.data, (d) => d.temp);
		const currentMaxTemp = max(currentData.data, (d) => d.temp);
		const oldMinTemp = min(oldData.data, (d) => d.temp);
		const oldMaxTemp = max(oldData.data, (d) => d.temp);

		this.minTempValue = min([currentMinTemp, oldMinTemp]);

		this.y = scaleLinear()
			.domain([
				max([currentMaxTemp, oldMaxTemp]),
				this.minTempValue,
			])
			.range([this.margin.top, this.height - this.margin.bottom]);

		this.axisYContainer
			.attr('transform', `translate(${this.margin.left}, 0)`)
			.call(axisLeft(this.y));
	}

	currentCircle(current) {
		const that = this;

		this.currentCircleContainer
			.attr('data-iden', 'current-circle')
			.selectAll('circle')
			.data(current.data, (d) => d)
			.join(
				(enter) => enter
					.append('circle')
					.attr('cx', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2))
					.attr('cy', -100)
					.call((e) => e.transition().duration(that.duration)
						.attr('cy', (d) => that.y(d.temp))),
				(update) => update
					.call((el) => el.transition().duration(250)
						.attr('cx', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2))
						.attr('cy', (d) => that.y(d.temp))),
				(exit) => exit.remove(),
			)
			.attr('class', 'exr-today-circle')
			.attr('r', 2);
	}

	currentLabel(current) {
		const that = this;

		this.currentCircleContainer
			.attr('data-iden', 'current-label')
			.selectAll('text')
			.data(current.data, (d) => d)
			.join(
				(enter) => enter
					.append('text')
					.attr('x', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2) - 7)
					.attr('y', -100)
					.call((e) => e.transition().duration(that.duration).delay(200)
						.attr('y', (d) => that.y(d.temp) - 8)),
				(update) => update
					.call((el) => el.transition().duration(250)
						.attr('x', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2) - 7)
						.attr('y', (d) => that.y(d.temp) - 8)),
				(exit) => exit.remove(),
			)
			.attr('class', 'exr-today-label')
			.text((d) => d.temp);
	}

	drawCurrentLine(current) {
		const noNullableValues = current.data.filter((f) => f.temp !== null);
		const that = this;
		const currentLine = line()
			.curve(curve)
			.x((d) => that.x(d.datetime) + (that.x.bandwidth() / 2))
			.y((d) => that.y(d.temp));

		this.currentPath
			.attr('class', 'exr-today-line opacity-75')
			.attr('dasharray', noNullableValues.length)
			.attr('d', currentLine(current.data));
	}

	drawOldLine(oldData) {
		const that = this;
		const oldLine = line()
			.curve(curve)
			.x((d) => that.x(d.datetime) + (that.x.bandwidth() / 2))
			.y((d) => that.y(d.temp));

		this.oldPath
			.attr('class', 'exr-outdate-line opacity-50')
			.attr('d', oldLine(oldData.data));
	}

	oldCircle(old) {
		const that = this;

		this.oldCircleContainer
			.attr('data-iden', 'current-circle')
			.selectAll('circle')
			.data(old.data, (d) => d)
			.join(
				(enter) => enter
					.append('circle')
					.attr('cx', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2))
					.attr('cy', -100)
					.call((e) => e.transition().duration(that.duration).delay(200)
						.attr('cy', (d) => that.y(d.temp))),
				(update) => update
					.call((el) => el.transition().duration(250)
						.attr('cx', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2))
						.attr('cy', (d) => that.y(d.temp))),
				(exit) => exit.remove(),
			)
			.attr('class', 'exr-outdate-circle')
			.attr('r', 2);
	}

	oldLabel(old) {
		const that = this;

		this.oldCircleContainer
			.attr('data-iden', 'old-label')
			.selectAll('text')
			.data(old.data, (d) => d)
			.join(
				(enter) => enter
					.append('text')
					.attr('x', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2) - 7)
					.attr('y', -100)
					.call((e) => e.transition().duration(that.duration).delay(200)
						.attr('y', (d) => that.y(d.temp) - 8)),
				(update) => update
					.call((el) => el.transition().duration(250)
						.attr('x', (d) => that.x(d.datetime) + (that.x.bandwidth() / 2) - 7)
						.attr('y', (d) => that.y(d.temp) - 8)),
				(exit) => exit.remove(),
			)
			.attr('class', 'exr-outdate-label')
			.text((d) => d.temp);
	}

	axisXLabel() {
		this.svg
			.append('g')
			.attr('data-iden', 'axisX-name')
			.attr('transform', `translate(${this.width / 2}, ${this.height})`)
			.attr('class', 'font-poppins-regular fill-secondary')
			.append('text')
			.text('Horas');
	}

	axisYLabel() {
		this.svg
			.append('g')
			.attr('data-iden', 'axisY-name')
			.attr('transform', `translate(0, ${this.margin.top / 2})`)
			.attr('class', 'font-poppins-regular fill-secondary')
			.append('text')
			.text('Temperatura (C)');
	}
}

export default Line;
