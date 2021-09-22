import moon1 from'./Components/media/moon1.jpg'
import haze from "./Components/media/haze.jpg"
import sun1 from './Components/media/sun1.jpg'
import cloud from './Components/media/cloud.jpg'
import './App.css';
import { Suspense,useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [DataFromWeb,setDataFromWeb]=useState([])
  const [City,setCity]=useState({cityname:""})
  const [Country,setCountry]=useState({country:""})
  const [sun,setSun]=useState({sunrise:"",sunset:""})
  const handleInputs=(e)=>{
    e.preventDefault();
    const name=e.target.name
    const value=e.target.value
    setCity({...City,[name]:value})
}
  const weatherdata=async()=>{
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${City.cityname}&appid=385b32fcfbaef07ebd5ad9712d019d03`)
    .then(res=>res.data).then(data=>{setDataFromWeb([data]);
      setSun(data.sys.sunset)
    console.log(data);
    })
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
    weatherdata();
},[]);
  return (
    <div>
      
      <h3 id="what" className="text-primary"><b className="text-danger">KNOW</b><b className="text-info" > YOUR</b> <b className="text-success" > CITY</b> WEATHER....</h3>
      <div className="input-group input-group-sm mb-3 " id="searchBox">
        
              <div className="input-group-prepend ">
              </div>
              <input onChange={handleInputs} name="cityname" type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
              <button onClick={weatherdata} className="input-group-text text-white bg-primary" id="inputGroup-sizing-sm">Search</button>
              
              </div>
    {DataFromWeb.map((val,index)=>{
            return(
              <div>
              {
              val.weather[0].main=="Haze"?
              <img className="weatherAnime" src={haze}/>:
              val.weather[0].main=="Clouds"?
              <img className="weatherAnime" src={cloud}/>:
              <img className="weatherAnime" src={sun1}/>}
              <div key={index}  className="App">
              <div className="card bg-white text-white ">
              <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ_be0WIUZSU8AdBYz7uoCNmJO-sWSoQ-ZHpQ_r5iSWaIIDz5jlILY3RzIrjtUJb2VJR0&usqp=CAU" alt="Card image"/>
              <div className="card-img-overlay pt-1">
              <h3 className="card-title text-primary">{val.name}</h3>
              <h5 className="card-text text-danger">(T){(parseInt(val.main.temp)-273.15).toFixed(2)} C</h5>
              <h4 className="card-text text-info">P(hpa):{val.main.pressure}</h4>
              <h5 className="card-title text-success">Humidity:{val.main.humidity}</h5>
              <h5 className="card-title text-dark">Feels(T):{(parseInt(val.main.feels_like)-273.15).toFixed(2)
              }</h5>
          </div>
          </div>
          </div>
          
          </div>)
            }
            )}
      <footer  id="myfoot" className="text-primary">&copy; ADITYA SALABH<b className="text-info">__Weather Forecast</b><b className="text-secondary">__All City WorldWide___</b></footer>
</div>
  );
}

export default App;
