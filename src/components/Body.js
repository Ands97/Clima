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
    const [emptyMessage, setEmptyMessage] = useState(false);
    const [forecast, setForecast] = useState([]);
    const [lat, setLat] = useState(''); 
    const [lon, setLon] = useState(''); 

    const getCity = async(e)=>{
            e.preventDefault();
            setShowLoading(true)
            try {
                if(
                    cityField === '123' 
                    || cityField === 'true'
                    || cityField === 'cidade' 
                    || cityField === 'cidades'
                    || cityField === 'sad'
                ){
                    setErrorMessage(true);
                    setEmptyMessage(false);
                    setShowLoading(false);
                }else if(cityField === ''){
                    setEmptyMessage(true);
                    setShowLoading(false);
                    setErrorMessage(false);
                }
                else{
                    let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityField}&&units=metric&lang=pt&appid=e6589e7279a8a0ec755503aff3d4f22d`)
                    let json = res.data;
                    setLat(res.data.coord.lat)
                    setLon(res.data.coord.lon)
                    setCityData([json]);
                    setCityField('');
                    setShowTitle(false);
                    setErrorMessage(false);
                    setShowLoading(false);
                    setEmptyMessage(false);
                }
            } catch (error) {
                setErrorMessage(true);
                setShowLoading(false);
            }
        }
    const getForecast = async()=>{
            getCity()
            let res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?appid=e6589e7279a8a0ec755503aff3d4f22d&lat=${lat}&lon=${lon}&units=metric&lang=pt&exclude=current,hourly,minutely`);
            let json = res.data;
            setForecast([json]);
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

    const formatDate = (time)=>{
        let date = new Date(time*1000);
        let dateFormated = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        return dateFormated
    }
    useEffect(() => {
        getCity();
        getForecast();
        getBrasilia();
        getLondon();
        getNewYork();
    }, [cityData])

    return(
        <div className="body">
            <div className='box'>
                {showTitle && 
                    <div className='title'>   
                        <div className='citiesTemp'>
                            {brasiliaCity.map((item)=>
                                 <h4>{item.name} - {item.main.temp.toFixed(1)}??C</h4>
                            )}
                        
                        
                            {LondonCity.map((item)=>
                                 <h4>{item.name} - {item.main.temp.toFixed(1)}??C</h4>
                            )}
                        
                        
                            {newYorkCity.map((item)=>
                                 <h4>{item.name} - {item.main.temp.toFixed(1)}??C</h4>
                            )}
                        </div>
                        
                        <h3>Insira abaixo sua localidade!</h3>
                    </div>    
                    
                }
                
                {cityData.map((item, index)=>(
                    <>
                        <div className='title'>
                            <h3 key={index}>Clima hoje em: </h3>
                            <span>{item.name}</span>
                        </div>
                        
                        <div className='temperature'>
                            <img className='imageWeather' src={`https://openweathermap.org/img/w/${item.weather.map(icon=>icon.icon)}.png`}/>
                            <h2>{item.main.temp.toFixed(1)}??C</h2>
                            <div>
                                <h5>Min. {item.main.temp_min.toFixed(1)}??C</h5>
                                <h5>M??x. {item.main.temp_max.toFixed(1)}??C</h5>
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
                                            <IoIosThermometer className='cloudIcon'/><span>Sensa????o T??rmica - {item.main.feels_like.toFixed(1)}??C</span>
                                        </div>
                                        <div>
                                            <IoMdWater className='cloudIcon'/><span>Umidade - {item.main.humidity}%</span>
                                        </div>
                                        <div>
                                            <img src={Pressure} className='pressureIcon'/><span>Press??o - {item.main.pressure}hPa</span>
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
                            <input type='text' required onInvalid={e => e.target.setCustomValidity('Digite uma localidade!')} onInput={e => e.target.setCustomValidity('')} placeholder='Ex. Jo??o Pessoa' value={cityField.toLowerCase()} onChange={e=>setCityField(e.target.value)}/>
                            <SearchIcon onClick={getCity} onKeyPress={getCity} className='searchIcon'/>
                        </div>
                    </form>
                </div>
                {errorMessage && 
                    <div className='error'>
                        <h4>Localidade n??o encontrada! </h4><IoMdWarning className='warningIcon'/>
                    </div>
                }
                {emptyMessage && 
                    <div className='error'>
                        <h4>Voc?? deve digitar algo! </h4><IoMdWarning className='warningIcon'/>
                    </div>
                }
                
            </div>
            {!showTitle &&
            <div className='second-box'>
                {forecast.map((item, index)=>(
                item.daily.map((info, key)=>(
                    <div key={key}>
                        {key > 0 &&
                            <div className='info'>
                                <div className='date'>
                                    <h5>{formatDate(info.dt)}</h5>
                                </div>
                                <div className='temperature forecast'>            
                                    <h2>{info.temp.day.toFixed(1)}??C</h2>
                                    <div>
                                        <h5>Min. {info.temp.min.toFixed(1)}??C</h5>
                                        <h5>M??x. {info.temp.max.toFixed(1)}??C</h5>
                                    </div>
                                </div> 
                            </div>  
                       }  
                    </div>
                ))  
            ))}
           </div>
            }
            
            
            
            
        </div>
    )
};

export default Body;