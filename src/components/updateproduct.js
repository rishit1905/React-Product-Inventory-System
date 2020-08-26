import React from 'react';
import "./updateproduct.css";
import axios from "axios";

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

class UpdateProduct extends React.Component {
    constructor(props) {
        super(props)
        console.group(this.props.location)
        this.state = {
            imageURL: "",
            id: 0,
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

    UNSAFE_componentWillMount() {
        if (this.props.location.state !== undefined) {
            axios.get("http://localhost:3000/products/" + this.props.location.state.pid)
                .then(response => {
                    console.log(response)
                    this.setState({
                        imageURL: response.data.imageURL,
                        id: response.data.id,
                        name: response.data.name,
                        brand: response.data.brand,
                        description: response.data.description,
                        category: response.data.category,
                        price: response.data.price,
                        stock: response.data.stock
                    })
                }, error => {
                    console.log(error);
                })
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
        this.setState({ name: event.target.value })

    }
    getBrand = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.brandError = "" || (!event.target.value.trim().match(/^([a-zA-Z0-9 _-]+)$/)) ? "Only non-empty alphanumeric values allowed !!" : ""
        this.setState({ brand: event.target.value })

    }
    getDescription = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.descriptionError = "" || event.target.value.trim().length === 0 ? "Description is required !!" : ""
        this.setState({ description: event.target.value })

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
        this.setState({ price: event.target.value })

    }
    getStock = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.value)
        let errors = this.state.errors
        errors.stockError = (!event.target.value.match(/^[1-9]+[0-9]*$/)) ? "Invalid stock amount !!" : ""
        this.setState({ stock: event.target.value })

    }

    updateProduct = (e) => {
        if (this.checkValidation()) {
            e.preventDefault()
            console.log("Updating Product..")
            let productRequestBody = {
                "imageURL": this.state.imageURL,
                "name": this.state.name,
                "brand": this.state.brand,
                "description": this.state.description,
                "category": this.state.category,
                "price": this.state.price,
                "stock": this.state.stock,
            }
            axios.put("http://localhost:3000/products/" + this.state.id, productRequestBody)
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

        if (this.props.location.state === undefined) {
            return (
                <div>
                    Not found!!
                </div>
            );
        }
        return (
            <div id="update">
                <form onChange={this.handleSubmit} noValidate>
                    <fieldset>
                        <legend>UPDATE PRODUCT</legend>
                        <div className="column">
                            <label>Image:</label>
                            <input type="file" id="imageURL" onChange={this.getUrl} multiple accept="image/*" noValidate />
                            {errors.imageError.length > 0 && <span className="error">{errors.imageError}</span>}
                            <br />
                            <label>Product ID:</label>
                            <input type="text" value={this.state.id} readOnly /><br />
                            <label>Product Name:</label>
                            <input type="text" id="name" value={this.state.name} onChange={this.getName} noValidate />
                            {errors.nameError.length > 0 && <span className="error">{errors.nameError}</span>}
                            <br />
                            <label>Brand:</label>
                            <input type="text" id="brand" value={this.state.brand} onChange={this.getBrand} noValidate />
                            {errors.brandError.length > 0 && <span className="error">{errors.brandError}</span>}
                            <br />
                            <label>Description:</label>
                            <input type="text" id="description" value={this.state.description} onChange={this.getDescription} noValidate />
                            {errors.descriptionError.length > 0 && <span className="error">{errors.descriptionError}</span>}
                            <br /><br />
                            <label>Category:</label>
                            <select value={this.state.category} id="category" onChange={this.getCategory}>
                                <option value="">--select--</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Cameras">Cameras</option>
                                <option value="Laptops">Laptops</option>
                            </select>
                            {errors.categoryError.length > 0 && <span className="error">{errors.categoryError}</span>}
                            <br /><br />
                            <label>Price:</label>
                            <input type="text" id="price" value={this.state.price} onChange={this.getPrice} noValidate />
                            {errors.priceError.length > 0 && <span className="error">{errors.priceError}</span>}
                            <br /><br />
                            <label>Stock:</label>
                            <input type="text" id="stock" value={this.state.stock} onChange={this.getStock} noValidate />
                            {errors.stockError.length > 0 && <span className="error">{errors.stockError}</span>}
                            <br /><br />
                        </div>
                        <button onClick={this.updateProduct} disabled={this.state.buttonStatus}>Update</button>
                    </fieldset>
                </form>
            </div>

        );
    }
}

export default UpdateProduct;