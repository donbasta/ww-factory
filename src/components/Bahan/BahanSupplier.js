import React, { Component } from 'react';
import axios from 'axios';
// import { styles } from '../../styles/bahan.module.css';

class BahanSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const instance = axios.create({
            baseURL: "http://localhost:3030/"
        });
        instance.get('/supply?harga=1')
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch ((error) => {
                console.log("error fetching from api", error);
                return []
            })
    }

    renderTableData() {
        return this.state.data.map((bahan, index) => {
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
            <div className="container bg-light mx-auto mt-5 p-5">
                <h1 className="text-center m-2"> Daftar Bahan di Supplier </h1>
                <table id='bahanSupplier' className="table-hover mx-auto">
                    <thead className="thead-dark">
                        <tr>
                            <td>ID Bahan</td>
                            <td>Nama Bahan</td>
                            <td>Harga Satuan</td>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableData() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BahanSupplier;