import './body.css';
import Pressure from '../images/gauge.png'
import SearchIcon from '@material-ui/icons/Search';
import { IoMdCloudOutline, IoIosThermometer, IoMdWater} from "react-icons/io";
import axios from 'axios';
import { useState, useEffect } from 'react';


const Body = ()=>{
    const [cityField, setCityField] = useState('');
    const [cityData, setCityData] = useState([]);
    const [showTitle, setShowTitle] = useState(true)

    const getCity = async(e)=>{
        e.preventDefault()
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityField}&&units=metric&lang=pt&appid=e6589e7279a8a0ec755503aff3d4f22d`)
        let json = res.data;
        setCityData([json])
        setCityField('')
        setShowTitle(false)
    }
    useEffect(() => {
        getCity()
    }, [])

    return(
        <div className="body">
            <div className='box'>
                {showTitle && 
                    <h3>Insira abaixo sua cidade!</h3>
                }
                
                {cityData.map((item, index)=>(
                    <>  
                        <div className='title'>
                            <h3 key={index}>Clima em: </h3>
                            <span>{item.name}</span>
                        </div>
                        
                        <div className='temperature'>
                            <img className='imageWeather' src={`https://openweathermap.org/img/w/${item.weather.map(icon=>icon.icon)}.png`}/>
                            <h2>{item.main.temp.toFixed(1)}°</h2>
                            <div>
                                <h5>Min. {item.main.temp_min.toFixed(1)}°</h5>
                                <h5>Max. {item.main.temp_max.toFixed(1)}°</h5>
                            </div>
                            
                        </div>
                        <div>
                            {item.weather.map(coisa=>(
                                <div className='data'>
                                    <div>
                                        <IoMdCloudOutline className='cloudIcon'/><span>{coisa.description}</span>
                                    </div>     
                                    <div>
                                        <IoIosThermometer className='cloudIcon'/><span>Sensação Térmica - {item.main.feels_like.toFixed(1)}°</span>
                                    </div>
                                    <div>
                                        <IoMdWater className='cloudIcon'/><span>Umidade - {item.main.humidity}%</span>
                                    </div>
                                    <div>
                                        <img src={Pressure} className='pressureIcon'/><span>Pressão - {item.main.pressure}hPa</span>
                                    </div>
                                    
                                </div>
                                
                            ))
                            }
                        </div>
                    </>
                ))}
                
                <div className='search'>
                    <form onSubmit={getCity}>
                        <input type='text' placeholder='Digite sua cidade' value={cityField} onChange={e=>setCityField(e.target.value)}/>
                        <SearchIcon onClick={getCity} className='searchIcon'/>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Body;