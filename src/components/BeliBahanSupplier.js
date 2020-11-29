import React, { Component } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import '../styles/bahan.css';

class BeliBahanSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            namaBahan: "",
            jumlahBahan: 0,
            jumlahPembayaran: 0,
            saldo: 0
        }
        this.tambahBahan = this.tambahBahan.bind(this);
        this.kurangBahan = this.kurangBahan.bind(this);
        this.handleInputJumlahPembayaran = this.handleInputJumlahPembayaran.bind(this);
        this.handleInputNamaBahan = this.handleInputNamaBahan.bind(this);
        this.sendPembelianRequestToSupplier = this.sendPembelianRequestToSupplier.bind(this);
    }

    componentDidMount() {
        const xmlPayload = `\
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">\
    <soapenv:Header/>\
    <soapenv:Body>\
        <impl:getCurrentSaldo/>\
    </soapenv:Body>\
</soapenv:Envelope>`;
        const parser = xml2js.parseString;
        const instance = axios.create({
            baseURL: "http://localhost:8080/"
        });

        instance
            .post('/ws-factory/saldo?wsdl', 
                    xmlPayload,
                    { headers:
                        { 
                            'Content-Type': 'text/xml'
                        }
                    }
                )
            .then(res => {
                    console.log(res.data);
                    parser(res.data, (err, res) => {
                        const currentSaldo = res["S:Envelope"]["S:Body"][0]["ns2:getCurrentSaldoResponse"][0]["return"];
                        this.setState({ saldo: currentSaldo });
                    })
                })
            .catch(err => {
                console.log(err);
            });
    }

    handleInputJumlahPembayaran = event => {
        this.setState({ jumlahPembayaran: event.target.value });
    }

    handleInputNamaBahan = event => {
        this.setState({ namaBahan: event.target.value });
    }

    tambahBahan = event => {
        this.setState({ jumlahBahan: this.state.jumlahBahan + 1 });
    }
    
    kurangBahan = event => {
        this.setState({ jumlahBahan: Math.max(0, this.state.jumlahBahan - 1) });
    }

    createRequestPayload() {
        const buyListData = [{
            nama: this.state.namaBahan,
            amount: this.state.jumlahBahan,
        }]
        const payAmountData = this.state.saldo;
        return {
            buyList: buyListData,
            payAmount: payAmountData,
        }
    }

    async sendHasilPembelianToPabrik(data, pembayaran, callback) {
        const instance = axios.create({
            baseURL: "http://localhost:8080/"
        });
        const parser = xml2js.parseString;
        let msg = "";

        const sisaSaldo = this.state.saldo - pembayaran;
        console.log("Saldo saat ini: ", this.state.saldo);
        console.log("Pembayaran: ", pembayaran)
        const xmlPayloadSaldo =`
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">\
   <soapenv:Header/>\
   <soapenv:Body>\
      <impl:addSaldo>\
         <newSaldo>${sisaSaldo}</newSaldo>\
      </impl:addSaldo>\
   </soapenv:Body>\
</soapenv:Envelope>`;

        const xmlPayloadBahan = `\
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">\
   <soapenv:Header/>\
   <soapenv:Body>\
      <impl:addBahan>\
         <nama>${data.nama}</nama>\
         <jumlah>${data.amount}</jumlah>\
         <tanggalKadaluarsa>2021-11-24 00:00:00</tanggalKadaluarsa>\
      </impl:addBahan>\
   </soapenv:Body>\
</soapenv:Envelope>`;

        const [bahanResponse, saldoResponse] = await Promise.all([
            instance
            .post('/ws-factory/bahan?wsdl', 
                    xmlPayloadBahan,
                    { headers:
                        { 
                            'Content-Type': 'text/xml'
                        }
                    }
                ),
            instance
                .post('/ws-factory/saldo?wsdl', 
                        xmlPayloadSaldo,
                        { headers:
                            { 
                                'Content-Type': 'text/xml'
                            }
                        }
                    )
        ]);

        parser(bahanResponse.data, (err, res) => {
            const items = res["S:Envelope"]["S:Body"][0]["ns2:addBahanResponse"][0]["return"];
            console.log(items);
            if (items === false) {
                msg = "Terdapat error pada pabrik sehingga transaksi bahan dibatalkan.";
            } else {
                msg = "Transaksi Berhasil";
            }
        })

        parser(saldoResponse.data, (err, res) => {
            const status = res["S:Envelope"]["S:Body"][0]["ns2:addSaldoResponse"][0]["return"];
            if (status === false) {
                msg = "Terdapat kesalahan saat update saldo, transaksi dibatalkan";
            } else {
                msg = "Transaksi Berhasil";
            }
        })
        
        callback(msg);
    }

    sendPembelianRequestToSupplier = event => {
        if (this.state.saldo < this.state.jumlahPembayaran) {
            alert(
                'Uang pada saldo tidak mencukupi untuk melakukan pembayaran'
            );
            return;
        }
        const requestPayload = this.createRequestPayload();
        const instance = axios.create({
            baseURL: "http://localhost:3030/"
        });
        instance.post('/transactions', requestPayload)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "failed") {
                    throw `Transaksi gagal karena uang tidak cukup. Dibutuhkan tambahan ${res.data.need} rupiah.`
                } else {
                    this.sendHasilPembelianToPabrik(requestPayload.buyList[0], res.data.value, (status) => {
                        console.log("statusnya: ", status);
                        if (status === "Transaksi Berhasil") {
                            alert(status)
                        } else {
                            throw status;
                        }
                    })
                }
            })
            .catch ((error) => {
                alert("Error: ", error);
            })
    }

    render() {
        return (
            <div>
                <h1> Beli Bahan from Supplier! </h1>
                <div className="form-beli">
                    <h3> Nama Bahan </h3>
                    <input
                        type="text"
                        placeholder="Masukkan nama bahan yang ingin dibeli"
                        value={this.state.namaBahan}
                        onChange={this.handleInputNamaBahan}
                    />
                </div>
                <div className="form-beli">
                    <h3> Jumlah Pembayaran </h3>
                    <input
                        type="text"
                        placeholder="Masukkan jumlah uang untuk melakukan pembelian"
                        value={this.state.jumlahPembayaran}
                        onChange={this.handleInputJumlahPembayaran}
                    />
                    <h4> Sisa Saldo anda: </h4>
                    <input
                        type="text"
                        value={this.state.saldo}
                        readOnly
                    />
                </div>
                <div className="form-beli">
                    <h3> Jumlah Bahan yang Ingin dibeli </h3>
                    <button onClick={this.kurangBahan}> - </button>
                    <input
                        type="text"
                        value={this.state.jumlahBahan}
                        readOnly
                    />
                    <button onClick={this.tambahBahan}> + </button>
                </div>
                <h3></h3>
                <button className="button-submit"
                    onClick={this.sendPembelianRequestToSupplier}
                >
                    Beli Bahan!
                </button>

            </div>
        )
    }
}

export default BeliBahanSupplier;