import React from 'react';
import Chart from "react-google-charts";
import './dashboard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            mobiles: 0,
            laptops: 0,
            cameras: 0,
            brandData:[[]],
            stockData:[[]],
            priceData:[[]]
        }
    }

    UNSAFE_componentWillMount() {
        console.log("Component Mounting")
        this.getAllProducts()
    }

    getAllProducts = () => {
        axios.get("http://localhost:3000/products")
            .then(response => {
                console.log(response)
                console.log(response.data)
                this.setState({ products: response.data })
                this.data()
                this.datab(this.state.products)
                this.datas(this.state.products)
                this.datap(this.state.products)
                console.log("Components loaded")
            }, error => {
                console.log(error)
            })
    }

    data = () => {
        this.state.products.map(product => {
            if (product.category === "Mobiles") {
                this.setState({ mobiles: this.state.mobiles + parseInt(product.stock) })
            }
            if (product.category === "Laptops") {
                this.setState({ laptops: this.state.laptops + parseInt(product.stock) })
            }
            if (product.category === "Cameras") {
                this.setState({ cameras: this.state.cameras + parseInt(product.stock) })
            }
        })
    }

    datab = (products) => {
        let brand=[["Brand","Stock"]]
        for(const data of products){
            if(brand.includes(data.brand)){
                var a=brand.indexOf(brand.name)
                console.log(a)
            }
            else{
                brand.push([data.brand,parseInt(data.stock)])
            }
            
        }
        console.log(brand)
        this.setState({brandData:brand})
    }

    datas = (products) => {
        let stock=[["Product","Stock"]]
        for(const data of products){
               stock.push([data.name,parseInt(data.stock)])
            
        }
        console.log(stock)
        this.setState({stockData:stock})
    }

    datap = (products) => {
        let price=[["Product","Price"]]
        for(const data of products){
                price.push([data.name,parseInt(data.price)])            
        }
        console.log(price)
        this.setState({priceData:price})
    }

    render() {
        return (
            <div className="row">
                <Link to="/category">
                    <section id="category">
                        <p>Category</p>
                        <Chart
                            chartType="BarChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ['Category', 'Stock'],
                                ['Mobiles', this.state.mobiles],
                                ['Cameras', this.state.cameras],
                                ['Laptops', this.state.laptops],
                            ]}
                            options={{
                                title: 'Category-wise stock',
                                legend: { position: 'none' },
                                colors: ['green'],
                            }}
                        />
                    </section>
                </Link>
                <Link to="/vendor">
                    <section id="vendor">
                        <p>Vendor</p>
                        <Chart
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={this.state.brandData}
                            options={{
                                title: 'Brand-based Stock',
                                // Just add this option
                                is3D: true,
                            }}
                        />
                    </section>
                </Link>
                <Link to="/stock">
                    <section id="stock">
                        <p>Stock</p>
                        <Chart
                            chartType="Histogram"
                            loader={<div>Loading Chart...</div>}
                            data={this.state.stockData}
                            options={{
                                title: 'Brand-based Stock',
                                legend: { position: 'top', maxLines: 2 },
                                colors: ['#5C3292'],
                                interpolateNulls: false,
                            }}
                        />
                    </section>
                </Link>
                <Link to="/price">
                    <section id="priceDashboard">
                        <p>Price</p>
                        <Chart
                            chartType="ScatterChart"
                            loader={<div>Loading Chart...</div>}
                            data={this.state.priceData}
                            options={{
                                title: 'Charges of subatomic particles',
                                legend: { position: 'top', maxLines: 2 },
                                colors: ['#871B47'],
                                interpolateNulls: false,
                            }}
                        />
                    </section>
                </Link>
            </div>
        );
    }
}

export default Dashboard;