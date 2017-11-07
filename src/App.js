import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
        products: []
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        fetch('http://localhost:7777/v1/product/')
            .then(res => res.json())
            .then(( res ) => {
                console.log(res)
                this.setState({
                    products: res
                })
            })
    }

    createProduct() {
        const title = document.getElementById("title").value;
        let data = {
            "description": "",
            "logo_url": "",
            "title": title
        }
        
        fetch('http://localhost:7777/v1/product/',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(( res ) => {
                this.getData()
            })
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>
                        <a className="rainbow" href="https://www.facebook.com/gucodelive/">#กูโค้ด</a>
                    </h2>
                </div>
                <input type="text" id="title"/>
                <button onClick={this.createProduct.bind(this)}>ok</button>

                {
                    this.state.products.map(( item, index ) => {
                        return (
                            <div>
                                <h1 key={index} style={{color: '#fff', paddingTop: '10px'}}>{`${item.title} :::  ${item.description}  ---  ${item.logo_url}`}</h1>
                                <p onClick={() => {
                                    console.log("delete");}}>X</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
