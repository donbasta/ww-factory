import React, { Component } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
// import { styles } from '../../styles/bahan.module.css';

class BahanPabrik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const xmlPayload = 
'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">\
    <soapenv:Header/>\
        <soapenv:Body>\
            <impl:getAllBahanInFactory/>\
        </soapenv:Body>\
</soapenv:Envelope>';
        const parser = xml2js.parseString;
        const instance = axios.create({
            baseURL: "http://localhost:8080/"
        });
    instance
        .post('/ws-factory/bahan?wsdl', 
                xmlPayload,
                {headers:
                    { 
                        'Content-Type': 'text/xml'
                    }
                }
            )
        .then(res => {
                console.log(res.data);
                parser(res.data, (err, res) => {
                    const items = res["S:Envelope"]["S:Body"][0]["ns2:getAllBahanInFactoryResponse"][0]["return"];
                    console.log(items);
                    this.setState({data: items});
                })
            })
        .catch(err => {
            console.log(err)
        });
    }

    renderTableData() {
        return this.state.data.map((bahan, index) => {
            const { jumlah, nama, tanggalKadaluarsa } = bahan;
            return (
                <tr key={ index }>
                    <td>{ index }</td>
                    <td>{ nama[0] }</td>
                    <td>{ jumlah[0] }</td>
                    <td>{ tanggalKadaluarsa[0] }</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container bg-light mx-auto mt-5 p-5">
                <h1 className="text-center m-2"> Daftar Bahan di Pabrik </h1>
                <table id='bahanPabrik' className="table-hover mx-auto">
                    <thead className="thead-dark">
                        <tr>
                            <td>No</td>
                            <td>Nama Bahan</td>
                            <td>Jumlah Bahan</td>
                            <td>Tanggal Kadaluarsa</td>
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

export default BahanPabrik;