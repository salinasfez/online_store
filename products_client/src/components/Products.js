import React, {Component} from 'react';
import './Products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Jumbotron } from 'react-bootstrap';


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
        // console.log(event.target.value)
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
            <div className='main-container'>
                <h1 className='header'>Federico Clothing Co.</h1>
                {/* <Jumbotron>
                    Hello World
                </Jumbotron> */}
                <div className='flex-container'/>
                <div className='form'>
                    <h2>List an item</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>&nbsp;&nbsp;Item</label>&nbsp;&nbsp;
                        <input type='text' id='name' value={this.state.formInputs.name} onChange={this.handleChange}/>
                        <label htmlFor='price'>&nbsp;&nbsp;Price</label>&nbsp;&nbsp;
                        <input type='number' id='price' value={this.state.formInputs.price} onChange={this.handleChange} /><br/><br/>
                        <label htmlFor='description'>&nbsp;&nbsp;Description</label>&nbsp;&nbsp;
                        <input type='text' id='description' value={this.state.formInputs.description} onChange={this.handleChange}/>
                        <label htmlFor='image'>&nbsp;&nbsp;Image</label>&nbsp;&nbsp;
                        <input type='text' id='image' value={this.state.formInputs.image} onChange={this.handleChange}/><br/><br/>
                        <Button variant="primary" id='button' type="submit">
                        Submit
                        </Button>
                    </form>
                    
                </div>
                <section className='products'>
                    
                    {/* {this.state.formInputs.name} */}
                    {this.state.products.map(product => {
                        return(
                            <div className='product-card'>
                                <div className='product-image'>
                                    <img src={product.image} alt=''/>
                                </div>
                                <div className='product-info'>
                                    <h2>{product.name}</h2>
                                    {/* <h4>{product.description}</h4> */}
                                    <h4>${product.price}</h4>
                                </div>
                            </div>    
                            )
                    })}
                </section>
            </div>
            
        )
    }
}

export default Products;