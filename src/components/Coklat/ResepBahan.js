//import './StockRequest.css';
import axios from 'axios';
import React, { Component } from 'react';
import { parseStringPromise } from 'xml2js';

class ResepBahan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resepbahan: [],
        };
    }

    componentDidMount() {
        const xmls1 =
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">' +
            '<soapenv:Header/>' +
            '<soapenv:Body>' +
            '<impl:getResepBahan>' +
            `<arg0>${this.props.id}</arg0>` +
            '</impl:getResepBahan>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';
        axios
            .post('http://localhost:8080/ws-factory/coklat?wsdl', xmls1, {
                headers: {
                    'Content-Type': 'text/xml',
                },
            })
            .then((res) => {
                console.log(res.data);
                return parseStringPromise(res.data);
            })
            .then((result) => {
                console.log(result);
                return JSON.parse(JSON.stringify(result));
            })
            .then((result) => {
                console.log(result);
                return result['S:Envelope']['S:Body'][0][
                    'ns2:getResepBahanResponse'
                ][0]['return'];
            })
            .then((result) => {
                console.log(result);
                result.map((item) => ({
                    nama_bahan: `${item.namaBahan}`,
                    jumlah_bahan: `${item.jumlahBahan}`,
                }));
            })
            .then((resepBahan) =>
                this.setState({
                    resepbahan: resepBahan,
                })
            )
            .catch((error) => console.log('parsing failed', error));
    }

    renderTableData() {
        return this.state.resepbahan.map((resep, index) => {
            const { nama_bahan, jumlah_bahan } = resep;
            return (
                <tr key={index}>
                    <td>{nama_bahan}</td>
                    <td>{jumlah_bahan}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className='my-3'>
                {' '}
                <center>
                    <table border='1' className='table'>
                        <thead>
                            <tr>
                                <td>
                                    {' '}
                                    <b>Nama Bahan</b>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <b>Jumlah</b>{' '}
                                </td>
                            </tr>
                        </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>
                </center>
            </div>
        );
    }
}

export default ResepBahan;
