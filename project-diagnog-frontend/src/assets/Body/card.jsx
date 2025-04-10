import ring from '../images/ring.png';
import ec from '../images/ec.png';
import derm from '../images/derm.png';
const Card = () => {
    return ( 
<div className="containery">
<h2>Top <em>FAQs</em> Of the Week</h2>
<div className="card">
<p><span>
<div className="cardy">
  <img className="img" src={ring} alt="Person suffering from ringworm" />

  <div className="textBox">
    <h2 className="text head">Ringworm</h2>
    <span>is ringworm transmitted by a worm?</span>
    <h2 className="text price">Truth Or Myth</h2>
  </div>
</div>
</span></p>
<p><span>
<div className="cardy">
  <img className="img" src={ec} alt="Person suffering from eczema" />

  <div className="textBox">
    <h2 className="text head">Eczema</h2>
    <span>Can Eczema be treated using engine oil?</span>
    <h2 className="text price">Truth Or Myth</h2>
  </div>
</div>
</span></p>
<p><span>
<div className="cardy">
  <img className="img" src={derm} alt="Person suffering from eczema" />

  <div className="textBox">
    <h2 className="text head">Doctors</h2>
    <span>Dermatologyst treating skin issues are at high risk of contracting the disease?</span>
    <h2 className="text price">Truth Or Myth</h2>
  </div>
</div>
</span></p>
</div>
</div>
     );
}
 
export default Card;