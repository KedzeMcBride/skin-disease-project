function Validation (values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (values.name ==="" ) {
        error.name = "Name should not be empty";
    }
    else{
        error.name = ""
    }
    if (values.email ==="" ) {
        error.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    }else{
        error.email = ""
    }

    
    if (values.password === "") {
        error.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must be at least 8 characters long and include at least one letter and one number";
    }
    else{
        error.password = ""
    }

    return error;
    
}

export default Validation;