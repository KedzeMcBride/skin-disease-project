import diagnose from '../images/diagnose.png';
import consult from '../images/consult.png';
import treat from '../images/treat.png';
import confidential from '../images/confidential.png';
const Services = () => {
    return ( 
        <div className="service-container">
        {/* Left Side - Service Boxes */}
        <div className="service">
            <div className="diagnose">
                <img src={diagnose} alt="Diagnostics" />
                <h3>Do Your Diagnostics By Yourself</h3>
            </div>
            <div className="treatment">
                <img src={consult} alt="Consult" className="consult" />
                <h3>Book Sessions or Consult Online</h3>
            </div>
            <div className="results">
                <img src={treat} alt="Treatment" className="treat" />
                <h3>Get Effective Solutions to Your Skin Problems</h3>
            </div>
            <div className="secure">
                <img src={confidential} alt="Confidential" className="confidential" />
                <h3>100% Confidential and Secure</h3>
            </div>
        </div>
    
        {/* Right Side - Text Content */}
        <div className="service-text">
            <h3>Our Services</h3>
            <h4>WE PROVIDE DIFFERENT TYPES OF SERVICES</h4>
        </div>
    </div>
    
     );
}
 
export default Services;