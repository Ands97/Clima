import './body.css';
import Pressure from '../images/gauge.png'
import SearchIcon from '@material-ui/icons/Search';
import { IoMdCloudOutline, IoIosThermometer, IoMdWater, IoMdWarning} from "react-icons/io";
import axios from 'axios';
import { useState, useEffect } from 'react';


const Body = ()=>{
    const [cityField, setCityField] = useState('');
    const [cityData, setCityData] = useState([]);
    const [showTitle, setShowTitle] = useState(true);
    const [brasiliaCity, setBrasiliaCity] = useState([])
    const [LondonCity, setLondonCity] = useState([])
    const [newYorkCity, setNewYorkCity] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    const [showLoading, setShowLoading] = useState(true);

    const getCity = async(e)=>{
            e.preventDefault();
            setShowLoading(true)
            try {
                if(cityField === '123' || cityField === 'true' || cityField === 'cidade' || cityField === 'cidades' || cityField === 'sad'){
                    setErrorMessage(true);
                    setShowLoading(false);
                }else{
                    let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityField}&&units=metric&lang=pt&appid=e6589e7279a8a0ec755503aff3d4f22d`)
                    let json = res.data;

                    setCityData([json]);

                    setCityField('');
                    setShowTitle(false);
                    setErrorMessage(false);
                    setShowLoading(false);
                }
                
                
                
            } catch (error) {
                setErrorMessage(true);
                setShowLoading(false);
            }
        }
        
    
    const getBrasilia = async()=>{
        setShowLoading(true)
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=brasilia&&units=metric&lang=pt&appid=e6589e7279a8a0ec755503aff3d4f22d`)
        let json = res.data;
        setBrasiliaCity([json])
        setShowLoading(false)
    }
    const getLondon = async()=>{
        setShowLoading(true)
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=london&&units=metric&lang=pt&appid=e6589e7279a8a0ec755503aff3d4f22d`)
        let json = res.data;
        setLondonCity([json])
        setShowLoading(false)
    }
    const getNewYork = async()=>{
        setShowLoading(true)
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=nova%20iorque&&units=metric&lang=pt&appid=e6589e7279a8a0ec755503aff3d4f22d`)
        let json = res.data;
        setNewYorkCity([json])
        setShowLoading(false)
    }
    useEffect(() => {
        getCity();
        getBrasilia();
        getLondon();
        getNewYork();
    }, [])

    return(
        <div className="body">
            <div className='box'>
                {showTitle && 
                    <div className='title'>   
                        <div className='citiesTemp'>
                            {brasiliaCity.map((item)=>
                                 <h4>{item.name} - {item.main.temp.toFixed(1)}°C</h4>
                            )}
                        
                        
                            {LondonCity.map((item)=>
                                 <h4>{item.name} - {item.main.temp.toFixed(1)}°C</h4>
                            )}
                        
                        
                            {newYorkCity.map((item)=>
                                 <h4>{item.name} - {item.main.temp.toFixed(1)}°C</h4>
                            )}
                        </div>
                        
                        <h3>Insira abaixo sua localidade!</h3>
                    </div>    
                    
                }
                
                {cityData.map((item, index)=>(
                    <>
                        <div className='title'>
                            <h3 key={index}>Clima em: </h3>
                            <span>{item.name}</span>
                        </div>
                        
                        <div className='temperature'>
                            <img className='imageWeather' src={`https://openweathermap.org/img/w/${item.weather.map(icon=>icon.icon)}.png`}/>
                            <h2>{item.main.temp.toFixed(1)}°C</h2>
                            <div>
                                <h5>Min. {item.main.temp_min.toFixed(1)}°C</h5>
                                <h5>Máx. {item.main.temp_max.toFixed(1)}°C</h5>
                            </div>
                            
                        </div>
                        <div>
                            {item.weather.map(res=>(
                                <div className='data'>
                                    <div className='descriptions'>
                                        <div>
                                            <IoMdCloudOutline className='cloudIcon'/><span>{res.description[0].toUpperCase()+res.description.slice(1).toLowerCase()}</span>
                                        </div>     
                                        <div>
                                            <IoIosThermometer className='cloudIcon'/><span>Sensação Térmica - {item.main.feels_like.toFixed(1)}°C</span>
                                        </div>
                                        <div>
                                            <IoMdWater className='cloudIcon'/><span>Umidade - {item.main.humidity}%</span>
                                        </div>
                                        <div>
                                            <img src={Pressure} className='pressureIcon'/><span>Pressão - {item.main.pressure}hPa</span>
                                        </div>
                                    </div>
                                </div>
                                
                            ))
                            }
                        </div>
                    </>
                ))}
                {showLoading &&
                <div className='loaderPosition'>
                    <div className='loader'></div> 
                </div>    
                }
                <div className='search'>
                    <form onSubmit={getCity}>
                        <div className='searchField'>
                            <input type='text' required onInvalid={e => e.target.setCustomValidity('Digite uma localidade!')} onInput={e => e.target.setCustomValidity('')} placeholder='Ex. João Pessoa' value={cityField} onChange={e=>setCityField(e.target.value)}/>
                            <SearchIcon onClick={getCity} onKeyPress={getCity} className='searchIcon'/>
                        </div>
                    </form>
                </div>
                {errorMessage && 
                    <div className='error'>
                        <h4>Localidade não encontrada! </h4><IoMdWarning className='warningIcon'/>
                    </div>
                }
                
            </div>
        </div>
    )
};

export default Body;