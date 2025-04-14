
import { Link } from 'react-router-dom';
import black_logo from '../images/blacklogo.png';
import { useState } from 'react';
import Validation from './loginValidation';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit =(event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }

    return ( 
        <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
       <div className="register">
            <img className='black-logo' src={black_logo} alt="" />
        <h2>Diag<span>N</span>og</h2>
        </div>
          {/* This the input for Email */}
  <div className="form-group">
  <div className="flex-column">
    <label>Email</label>
  </div>
  <div className="inputForm">
    <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
      {/* Your SVG path here */}
    </svg>
    <input 
      type="text" 
      className={`input ${errors.email ? 'input-error' : ''}`}
      placeholder="Enter your Email" 
      onChange={handleInput} 
      name='email'
    />
  </div>
  {errors.email && (
    <div className="error-message">
      {errors.email}
    </div>
  )}
  </div>
        
          {/* This the input for Password */}
  <div className="form-group">
    <div className="flex-column">
      <label>Password</label>
    </div>
    <div className="inputForm">
      <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
        {/* Your password SVG path */}
      </svg>
      <input
        type="password"
        className={`input ${errors.password ? 'input-error' : ''}`}
        placeholder="Enter your Password"
        onChange={handleInput}
        name='password'
      />
      <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
        {/* Your visibility toggle SVG */}
      </svg>
    </div>
    {errors.password && (
      <div className="error-message">
        {errors.password}
      </div>
    )}
</div>
        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button className="button-submit" type='submit'>Sign In</button>
        <p className="p"> Do not have an account? <span className="span"><Link to="/register">Sign Up</Link></span>
        </p><p className="p line">Or With</p>
        <div className="flex-row">
          <button className="btn google">
            <svg version="1.1" width={20} id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve">
              <path style={{fill: '#FBBB00'}} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
      	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
      	C103.821,274.792,107.225,292.797,113.47,309.408z" />
              <path style={{fill: '#518EF8'}} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
      	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
      	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" />
              <path style={{fill: '#28B446'}} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
      	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
      	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
              <path style={{fill: '#F14336'}} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
      	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
      	C318.115,0,375.068,22.126,419.404,58.936z" />
            </svg>
            Google 
          </button>
          </div></form>
  
        </div>
     );
}
 
export default Login;