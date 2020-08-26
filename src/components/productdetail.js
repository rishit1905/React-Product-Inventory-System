import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    updCurrentProduct = () => {
        console.log("Update product with id: " + this.props.id);
        this.props.update(this.props.id)
    }

    delCurrentProduct = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui">
                        <h1 id="h">Are you sure ?</h1>
                        <p id="p">You want to delete this product?</p>
                        <button className="delete" onClick={onClose}>No</button>
                        &nbsp;
                        <button className="delete" onClick={() => {
                            console.log("delete product with id: " + this.props.id)
                            this.props.delete(this.props.id)
                            onClose()
                        }}>Yes, Delete It</button>
                    </div>
                )
            }
        })

    }
    render() {
        let titleStyle={
            textDecoration:"underline",
            textTransform:"uppercase",
            fontFamily:"Arial, Helvetica, sans-serif",
            marginBottom:"1.5rem"
        }
        return (
            <tr>
                <td><img src={"image/"+this.props.imageURL} alt=""></img></td>
                <td style={titleStyle}>{this.props.name}</td>
                <td>ID: {this.props.id}</td>
                <td>BRAND: {this.props.brand}</td>
                <td>DESCRIPTION: {this.props.description}</td>
                <td>CATEGORY: {this.props.category}</td>
                <td>PRICE: {this.props.price}</td>
                <td>STOCK: {this.props.stock}</td>
                <td><button onClick={this.updCurrentProduct}>Update</button></td>
                <td><button id="deleteButton" onClick={this.delCurrentProduct}>Delete</button></td>
            </tr>
        );
    }
}

export default ProductDetail;