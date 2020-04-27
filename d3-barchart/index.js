import * as d3 from 'd3';
import '/styles/styles.scss';
const root = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
const fetchData = (url) => {
      return fetch(url)
            .then((response) => {
                  return response.json()
            });
};

const svg = d3.select('svg');
fetchData(root).then(res => createBarChart(1400, 700, res.data.map((el) => {
      return el[1]
}), res.data.map((el) => {
      return el[0]
})));

function createBarChart(width, height, yData, xData) {
      const timeData = xData.map((el) => {
            return new Date(el)
      });
      const margin = {
            top: 20,
            right: 20,
            bottom: 50,
            left: 50
      }
      const min = Math.min(...yData);
      const max = Math.max(...yData);
      const dimensionDivider = height / max;
      const barWidth = width / yData.length;
      const canvas = svg
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('class', 'chart')
      const tooltip = d3.select('body').append('div').attr('id', 'tooltip').attr('class', 'tooltip').style('opacity', '0');
      const formatTime = d3.timeFormat('%Y');
      const g = canvas.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      const y = d3.scaleLinear()
            .range([height, 0]);
      const yAxis = d3.axisLeft(y);
      y.domain([0, max]);
      g.append('g')
            .attr('id', 'y-axis')
            .call(yAxis);

      const x = d3.scaleTime()
            .domain([timeData[0], timeData[timeData.length - 1]])
            .range([0, width]);
      const xAxis = d3.axisBottom(x);
      g.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

      g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Value");

      const barChart = g.selectAll('rect')
            .data(yData)
            .enter()
            .append('rect')
            .attr('data-date', function (d, i) {
              return xData[i];
            })
            .attr('data-gdp', function (d) {
              return d;
            })
            .attr('y', function (d) {
                  return height - d * dimensionDivider
            })
            .attr('height', function (d) {
                  return d * dimensionDivider
            })
            .attr('width', barWidth)
            .attr('transform', function (d, i) {
                  const translate = [barWidth * i, 0];
                  return `translate(${translate})`;
            })
            .attr('class', 'bar')
            .on('mouseover', function (d, i) {
                  tooltip.attr('data-gdp', d)
                         .attr('data-date', xData[i])
                         .transition()
                         .duration(200)
                         .style('opacity', '0.9');
                  tooltip.html(`GDP for ${xData[i]} is ${d}`)
                         .style('left', (d3.event.pageX - 20) + 'px')
                         .style('top', (d3.event.pageY + 30) + 'px');
            })
            .on('mouseout', function (d) {
                  tooltip.transition()
                         .duration(500)
                         .style('opacity', '0');
            });

}