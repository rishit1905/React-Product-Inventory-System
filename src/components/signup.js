import React from 'react';
import './signup.css';
import axios from 'axios';

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            username: "",
            password: "",
            confirmpassword: "",
            errors: {
                image: "",
                username: "",
                password: "",
                confirmpassword: ""
            },
            buttonStatus: true
        };
    }
    getImage = (event) => {
        let errors = this.state.errors
        errors.image = event.target.value.substr(12) === "" ? "Upload Image !" : ""
        this.setState({ image: event.target.value.substr(12) })
    }

    getUsername = (event) => {
        let errors = this.state.errors
        errors.username = "" || (!event.target.value.trim().match(/^([a-zA-Z0-9_\- \.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) ? "Invalid email" : ""
        this.setState({ username: event.target.value })
    }

    getPassword = (event) => {
        let errors = this.state.errors
        errors.password = (!event.target.value.trim().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) ? "Password must have atleast a letter, a number and should be equal to or greater than 8 digits" : ""
        this.setState({ password: event.target.value })
    }

    confirmPassword = (event) => {
        let errors = this.state.errors
        errors.confirmpassword = (!event.target.value.trim().match(this.state.password)) ? "Password doesn't match !!" : ""
        this.setState({ confirmpassword: event.target.value })
    }

    checkValidation = () => {
        let errors = this.state.errors;
        if (this.state.image === "") {
            this.setState({ buttonStatus: true })
            errors.image = "Image required!"
            return false
        }
        if (this.state.username === "") {
            this.setState({ buttonStatus: true })
            errors.username = "Username required!"
            return false
        }
        if (this.state.password === "") {
            this.setState({ buttonStatus: true })
            errors.password = "Password required!"
            return false
        }
        if (this.state.confirmpassword === "") {
            this.setState({ buttonStatus: true })
            errors.confirmpassword = "Confirm your password!"
            return false
        }
        return true;
    }

    authorize = (e) => {
        if (this.checkValidation()) {
            e.preventDefault()
            let signupRequestBody = {
                "image":this.state.image,
                "username": this.state.username,
                "password": this.state.password,
                "confirmpassword": this.state.confirmpassword
            }
            axios.post('http://localhost:3000/users', signupRequestBody)
                .then(response => {
                    console.log(response.data);
                    console.log("Signup successful!!");
                    this.props.history.push('/')
                }, error => {
                    console.error(error)
                })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
            this.setState({ buttonStatus: false })
        } else {
            console.error('Invalid Form')
            this.setState({ buttonStatus: true })
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="logsign">
                    <form onChange={this.handleSubmit} noValidate>
                        <input type="file" onChange={this.getImage} placeholder="Choose profile picture !" accept="image/*" alt="profile-icon-9.png" />
                        {errors.image.length > 0 && <span className='error'>{errors.image}</span>}
                        <input id="username" type="email" onChange={this.getUsername} noValidate placeholder="Email" required />
                        {errors.username.length > 0 && <span className='error'>{errors.username}</span>}
                        <br />
                        <input id="password" type="password" onChange={this.getPassword} noValidate placeholder="Password" required />
                        {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
                        <br />
                        <input id="confirmpassword" type="password" onChange={this.confirmPassword} noValidate placeholder="Confirm Password" required />
                        {errors.confirmpassword.length > 0 && <span className='error'>{errors.confirmpassword}</span>}
                        <br />
                        <button data-testid="signup" onClick={this.authorize} className="centersign" disabled={this.state.buttonStatus}>Create Account</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Signup;