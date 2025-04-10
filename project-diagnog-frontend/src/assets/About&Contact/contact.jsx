import Navbar from "../Body/Nav";
import Footer from "../Body/footer";

const Contact = () => {
  return (
    <div className="contact">
      <Navbar />
      <div className="form-y-container">
        <form className="form-y">
          <div className="title">Contact us</div>
          <input type="text" placeholder="Your email" className="input" />
          <textarea placeholder="Your message" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
