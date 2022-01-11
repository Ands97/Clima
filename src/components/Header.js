import './header.css'
import Cloud from '../images/cloud.png'
const Header = ()=>{
    return(
        <div className="header">
            <h1>SeuClima.com</h1>
            <img className='cloud' src={Cloud}/>
        </div>
    )
};

export default Header;