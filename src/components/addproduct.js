import React from 'react';
import "./addproduct.css";
import axios from "axios";

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageURL: "",
            name: "",
            brand: "",
            description: "",
            category: "",
            price: 0,
            stock: 0,
            errors: {
                imageError: "",
                nameError: "",
                brandError: "",
                descriptionError: "",
                categoryError: "",
                priceError: "",
                stockError: ""
            },
            buttonStatus: true
        }
    }

    getUrl = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value.substr(12))
        let errors = this.state.errors
        errors.imageURL = event.target.value.substr(12) === "" ? "Upload Image !" : ""
        this.setState({ imageURL: event.target.value.substr(12) })

    }

    getName = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.nameError = "" || (!event.target.value.trim().match(/^([a-zA-Z0-9 _-]+)$/)) ? "Only non-empty alphanumeric values allowed !!" : ""
        this.setState({
            name: event.target.value
        })

    }
    getBrand = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.brandError = "" || (!event.target.value.trim().match(/^([a-zA-Z0-9 _-]+)$/)) ? "Only non-empty alphanumeric values allowed !!" : ""
        this.setState({
            brand: event.target.value
        })

    }
    getDescription = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.descriptionError = "" || event.target.value.trim().length === 0 ? "Description is required !!" : ""
        this.setState({
            description: event.target.value
        })

    }
    getCategory = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.categoryError = event.target.value === "" ? "Select a category !!" : ""
        this.setState({ category: event.target.value })

    }
    getPrice = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.priceError = (!event.target.value.match(/^(?:[1-9]\d*)(?:\.(?!.*000)\d+)?$/)) ? "Invalid price !!" : ""
        this.setState({
            price: event.target.value
        })

    }
    getStock = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.stockError = (!event.target.value.match(/^[1-9]+[0-9]*$/)) ? "Invalid stock amount !!" : ""
        this.setState({
            stock: event.target.value
        })

    }

    addProduct = (e) => {
        if (this.checkValidation()) {
            e.preventDefault()
            console.log("Adding product..")
            let productRequestBody = {
                "imageURL": this.state.imageURL,
                "name": this.state.name,
                "brand": this.state.brand,
                "description": this.state.description,
                "category": this.state.category,
                "price": this.state.price,
                "stock": this.state.stock,
            }
            axios.post("http://localhost:3000/products", productRequestBody)
                .then(response => {
                    console.log(response)
                    console.log("Done")
                    this.props.history.push("/inventory")
                }, error => {
                    console.log(error)
                })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (validateForm(this.state.errors)) {
            console.log("Valid")
            this.setState({ buttonStatus: false })
        } else {
            console.log("Not Valid")
            this.setState({ buttonStatus: true })
        }
    }

    checkValidation = () => {
        let errors = this.state.errors;
        if (this.state.imageURL === "") {
            this.setState({ buttonStatus: true })
            errors.imageError = "Kindly upload the image!"
            return false
        }
        if (this.state.name === "") {
            this.setState({ buttonStatus: true })
            errors.nameError = "Product name required!"
            return false
        }
        if (this.state.brand === "") {
            this.setState({ buttonStatus: true })
            errors.brandError = "Product brand required!"
            return false
        }
        if (this.state.description === "") {
            this.setState({ buttonStatus: true })
            errors.descriptionError = "Product description required!"
            return false
        }
        if (this.state.category === "") {
            this.setState({ buttonStatus: true })
            errors.categoryError = "Product category required!"
            return false
        }
        if (this.state.price === 0) {
            this.setState({ buttonStatus: true })
            errors.priceError = "Product price required!"
            return false
        }
        if (this.state.stock === 0) {
            this.setState({ buttonStatus: true })
            errors.stockError = "Product stock required!"
            return false
        }

        return true;
    }

    render() {
        const { errors } = this.state;
        return (
            <div id="add">
                <form onChange={this.handleSubmit} noValidate>
                    <fieldset>
                        <legend>ADD PRODUCT</legend>
                        <div className="columns">
                            <label>Image:</label>
                            <input type="file" id="imageURL" onChange={this.getUrl} multiple accept="image/*" noValidate />
                            {errors.imageError.length > 0 && <span className="error">{errors.imageError}</span>}
                            <br /><br />
                            <label>Product Name:</label>
                            <input type="text" id="name" onChange={this.getName} noValidate />
                            {errors.nameError.length > 0 && <span className="error">{errors.nameError}</span>}
                            <br /><br />
                            <label>Brand:</label>
                            <input type="text" id="brand" onChange={this.getBrand} noValidate />
                            {errors.brandError.length > 0 && <span className="error">{errors.brandError}</span>}
                            <br /><br />
                            <label>Description:</label>
                            <input type="text" id="description" onChange={this.getDescription} noValidate />
                            {errors.descriptionError.length > 0 && <span className="error">{errors.descriptionError}</span>}
                            <br /><br />
                            <label>Category:</label>
                            <select defaultValue={this.state.category} id="category" onChange={this.getCategory}>
                                <option value="">--select--</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Cameras">Cameras</option>
                                <option value="Laptops">Laptops</option>
                            </select><br /><br />
                            {errors.categoryError.length > 0 && <span className="error">{errors.categoryError}</span>}
                            <label>Price:</label>
                            <input type="text" id="price" onChange={this.getPrice} noValidate />
                            {errors.priceError.length > 0 && <span className="error">{errors.priceError}</span>}
                            <br /><br />
                            <label>Stock:</label>
                            <input type="text" id="stock" onChange={this.getStock} noValidate />
                            {errors.stockError.length > 0 && <span className="error">{errors.stockError}</span>}
                            <br /><br />
                        </div>
                        <button data-testid="addbutton" onClick={this.addProduct} disabled={this.state.buttonStatus}>Add</button>
                    </fieldset>
                </form>
            </div>

        );
    }
}

export default AddProduct;