import React, {Component} from 'react';
import './Products.css';

class Products extends Component {
    state = {
        products: [],
        formInputs: {
            name: '',
            price: '',
            description: '',
            image: ''
          }
    }
    componentDidMount(){
        this.getProducts();
    }
    getProducts = () => {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(json => this.setState({products: json}))
        .catch(error => console.log(error));
    }
    handleChange = (event) => {
        const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
        this.setState(updateInput)
      }
      handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/products', {
            body: JSON.stringify(this.state.formInputs),
            method: 'POST',
            headers: {
                'Accept' : 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            }
        })
        .then(createdProduct => {
            return createdProduct.json()
        })
        .then(jsonedProduct => {
            this.setState({
                formInputs: {
                    name: '',
                    price: '',
                    description: '',
                    image: ''
                },
                products: [jsonedProduct, ...this.state.products]
            })
        })
        .catch(error => console.log(error));
      }
    render(){
        return(
            <div>
                <h1>Federico Clothing Co.</h1>
                <div>
                    <h2>List an item</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Item</label>
                        <input type='text' id='name' value={this.state.formInputs.name} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='price'>Price</label>
                        <input type='number' id='price' value={this.state.formInputs.price} onChange={this.handleChange} /><br/><br/>
                        <label htmlFor='description'>Item Description</label>
                        <input type='text' id='description' value={this.state.formInputs.description} onChange={this.handleChange}/><br/><br/>
                        <label htmlFor='image'>Product Image</label>
                        <input type='text' id='image' value={this.state.formInputs.image} onChange={this.handleChange}/><br/><br/>
                        <input type='submit'/>
                    </form>
                </div>
                {/* {this.state.formInputs.name} */}
                {this.state.products.map(product => {
                    return(
                        <div>
                            <div>
                                <h2>{product.name}</h2>
                                <h4>{product.price}</h4>
                                <h4>{product.description}</h4>
                            </div>
                        </div>    
                        )
                })}
            </div>
        )
    }
}

export default Products;