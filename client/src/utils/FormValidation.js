
export default function FormValidation(values, err) {

    let errors = {}

    console.log(err)

    if (err === "UserExistsError") {
        errors.usernameExists = "Username already exists! Please try a new one."
    }
    // if (err.email !== undefined) {
    //     errors.emailExists = "Email already exists! Please try a new one."
    // }
    if (!values.username) {
        errors.username = "Username is required."
    }
    if (!values.name) {
        errors.name = "Name is required."
    }
    if (!values.email) {
        errors.email = "Email required."
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email address is invalid."
    }
    if (!values.password) {
        errors.password = "Password is required."
    } else if (values.password.length < 6) {
        errors.password = "Password must be 6 characters or more."
    }
    if (!values.password2) {
        errors.password2 = "Please repeat password."
    } else if (values.password2 !== values.password) {
        errors.password2 = "Password does not match"
    }
    if (!values.phone) {
        errors.phone = "Phone Number is required."
    } else if (values.phone.length < 10) {
        errors.phone = "Please enter a valid phone number. (United States ONLY)"
    }
    if (!values.year) {
        errors.year = "Birth Date is required."
    } else if (new Date().getFullYear() - values.year < 13) {
        errors.year = "You must be 13 years or older to register on this site."
    }

    return errors
}