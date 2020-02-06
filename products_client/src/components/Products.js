import React, {Component} from 'react';


class Products extends Component {
    state = {
        products: []
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
    render(){
        return(
            <div>
                <h1>Federico Clothing Co.</h1>
                <div>
                    <form>
                        <label htmlFor='name'>Item</label>
                        <input type='text' id='name'/><br/>
                        <label htmlFor='price'>Price</label>
                        <input type='number' id='price' /><br/>
                        <label htmlFor='description'>Item Description</label>
                        <input type='text' id='description' /><br/>
                        <label htmlFor='image'>Product Image</label>
                        <input type='text' id='image'/><br/>
                    </form>
                </div>
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