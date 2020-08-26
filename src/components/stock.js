import React from 'react';
import "./headerfooter.css";
import axios from "axios";
import ProductDetail from './productdetail';

class Stock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            filteredProducts: [],
            stocked: [],
            deleted: false,
            pid: 0,
            searchValue: ""
        }
    }

    initializeState = () => {
        setTimeout(() => {
            this.setState({ deleted: false })
        }, 3000)
    }
    UNSAFE_componentWillMount() {
        console.log("Component Mounting")
        this.getAllProducts()
    }

    componentDidMount() {
        console.log(this.props)
    }

    getAllProducts = () => {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                console.log(response.data)
                this.setState({ products: response.data })
                this.sortByKey(this.state.products)
                console.log("Components loaded")
            }, error => {
                console.log(error)
            })
    }

    deleteCurrentId = (id) => {
        console.log("Delete product with received id: " + id)
        axios.delete("http://localhost:3000/products/" + id)
            .then(response => {
                console.log(response)
                console.log(response.data)
                this.setState({ deleted: true })
                this.getAllProducts()
                this.initializeState()
            }, error => {
                console.log(error)
            })
    }

    goToAddProduct = () => {
        this.props.history.push("/addproduct")
    }

    updCurrentId = (id) => {
        this.setState({ pid: id })
        this.props.history.push({
            pathname: "/updateproduct",
            state: { pid: id }
        })
    }

    sortByKey=(products)=>{
        products.sort((a,b)=>{return a.stock-b.stock})
        this.setState({stocked:products})
    }

    reverse=()=>{
        this.setState({stocked:this.state.stocked.sort((a,b)=>{return b.stock-a.stock})})
    }

    sort=()=>{
        this.setState({stocked:this.state.stocked.sort((a,b)=>{return a.stock-b.stock})})
    }

    renderAllProducts = () => {
        return this.state.stocked.map(product => {
            return (
                <ProductDetail
                    key={product.id}
                    imageURL={product.imageURL}
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    description={product.description}
                    category={product.category}
                    price={product.price}
                    stock={product.stock}
                    delete={this.deleteCurrentId}
                    update={this.updCurrentId}
                ></ProductDetail>
            )
        })
    }

    render() {
        return (
            <div className="row">
                <button data-testid="sort" className="inventoryButton" onClick={this.sort}>Sort</button>
                <button data-testid="reverse" className="inventoryButton" onClick={this.reverse}>Reverse Sort</button>
                <table id="product">
                    <tbody>
                        {this.renderAllProducts()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Stock;