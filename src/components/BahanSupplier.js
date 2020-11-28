import React, { Component } from 'react';
import axios from 'axios';

class BahanSupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bahanInSupplier: []
        };
    }

    componentDidMount() {
        const instance = axios.create({
            baseURL: "http://localhost:3030/"
        });
        instance.get('/supply?harga=1')
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({ bahanInSupplier: data });
            })
            .catch ((error) => {
                console.log("error fetching from api", error);
                return []
            })
    }

    renderTableData() {
        return this.state.bahanInSupplier.map((bahan, index) => {
            const { id_bahan, nama_bahan, harga_satuan } = bahan;
            return (
                <tr key={ id_bahan }>
                    <td>{ id_bahan }</td>
                    <td>{ nama_bahan }</td>
                    <td>{ harga_satuan }</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1> Daftar Bahan di Supplier </h1>
                <table id='bahanSupplier'>
                    <tbody>
                        <tr>
                            <td>ID Bahan</td>
                            <td>Nama Bahan</td>
                            <td>Harga Satuan</td>
                        </tr>
                        { this.renderTableData() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BahanSupplier;