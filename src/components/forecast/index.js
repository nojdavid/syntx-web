import React from 'react';

const Forecast = (props) => {
	const { applicable_date: date, min_temp, max_temp, weather_state_abbr: abbr } = props.weather || {};
	return (
		<div className='forecast'>
			<div className='date'>{date}</div>
			<img src={'https://www.metaweather.com/static/img/weather/png/'+abbr+'.png'} alt="weather"/>
			<div className='temp'>
				<div className='min'>Min Temp: {Math.round(min_temp)}</div>
				<div className='max'>Max Temp: {Math.round(max_temp)}</div>
			</div>
		</div>
	);
};

export default Forecast;