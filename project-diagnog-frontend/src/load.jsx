import { useEffect, useState } from "react";
import Loader from "./assets/loader/loader";
import Registration from "./registration";

const Load = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRegistration(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showRegistration ? <Registration /> : <Loader />}
    </>
  );
};
 
export default Load;