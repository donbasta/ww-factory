import React, { Component } from 'react';
import axios from 'axios';

class BahanSupplier extends React.Component {
    lihatBahanSupplier() {
        const instance = axios.create({
            baseURL: "http://localhost:3030/"
        });
        instance.get('/supply?harga=1')
            .then(res => {
                const data = res.data;
                console.log(data);
            })
            .catch ((error) => {
                console.log("error fetching from api", error);
            })
    }
    render() {
        this.lihatBahanSupplier();
        return <h1>test, lihat 'console' </h1>;
    }
}

export default BahanSupplier;