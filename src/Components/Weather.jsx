import { useEffect, useRef, useState } from "react";
import wind from '../assets/wind.png'
import humid from '../assets/flood.png'
import search_icon from '../assets/search.png'



function WeatherCard() {
      const inputRef = useRef();
      const [ latlong,getlong ] = useState({ latitude: 0, longitude: 0 });
      const [ cname,getName ] = useState({ temperature: 0, humidity: 0 ,windspeed:0,weatherCode:0});
      const weatherIcons = {
                    0: "☀️",   
                    1: "🌤️",   
                    2: "⛅",    
                    3: "☁️",  
                    45: "🌫️",
                    48: "🌫️",  
                    51: "🌦️",  
                    53: "🌦️",  
                    55: "🌧️",  
                    61: "🌦️", 
                    63: "🌧️",  
                    65: "🌧️",
                    71: "❄️",  
                    73: "❄️",  
                    75: "❄️",
                    95: "⛈️",  
                      };

      const search = async (city) =>{
        if(city ===""){
          alert("Enter the City Name");
          return
        }
        try {
          
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=100&language=en&format=json`;
          const response = await fetch(url);
          const data = await response.json(); 
          const cityData = data.results[0];
          console.log(data);
         
          getlong({
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            Cityname: cityData.name,
            

          })
           
          const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latlong.latitude}&longitude=${latlong.longitude}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
           const response2 = await fetch(url2);
          const data2 = await response2.json(); 
          console.log(data2);
          getName({
            temperature: data2.current.temperature_2m,
            humidity: data2.current.relative_humidity_2m,
            windspeed: data2.current.wind_speed_10m,
            weatherCode: data2.current.weather_code


          })
           console.log("the current city is " + cityData.name);

        } catch (error) {
          
        }
      }

      useEffect(()=>{
        search()
      },[])
  return (
    <div className="weather-card">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter City Name" />
        <button className="search-btn" onClick={()=> {search(inputRef.current.value); 
         
        }} ><img  className="searchIcon" src={search_icon} alt="" /></button>
        
      </div>

      <div className="weather-icon"> {weatherIcons[cname.weatherCode] || "☀️"}</div>


      <h1 className="temperature">{cname.temperature}ºc</h1>
      
      <h2 className="city-name">{latlong.Cityname}</h2>


      <div className="extra-info">
        <div className="info-item">
          <img src={humid} alt="" /> <span>{cname.humidity}%</span>
          <p>Humidity</p>
        </div>
        <div className="info-item">
          <img src={wind} alt="" />
           <span>{cname.windspeed} Km/h</span>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
