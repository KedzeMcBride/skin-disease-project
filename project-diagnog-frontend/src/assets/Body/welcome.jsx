import doctor from '../images/doctor.png';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (  
        <div className="welcome">
        <div className="load">
        <p className="text">Be Your Very Own Doctor And Book <em> Appointments</em></p>
        <button className="next-btn"><Link to="/chat">upload</Link></button>
        </div>
        <img src={doctor} alt="" className="doctor" />
        </div>
    );
}
 
export default Welcome;