import React, { Component } from 'react';
import 'jquery';
import 'jquery.soap';
// import 'soap';
import axios from 'axios';
import xml2js from 'xml2js';
// import soap from 'soap';

class BahanPabrik extends React.Component {
    lihatBahanPabrik() {
        const payload = 
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
                payload,
                {headers:
                    { 
                        'Content-Type': 'text/xml'
                    }
                }
            )
        .then(res => {
                console.log(res.data);
                parser(res.data, (err, res) => {
                    console.log(res);
                })
                // let dataJson = parser.toJson(res.data);
                // console.log("to json -> %s", dataJson);
            })
        .catch(err => {
            console.log(err)
        });
    }
    render() {
        this.lihatBahanPabrik();
        return <h1>test, lihat 'console' </h1>;
    }
}

export default BahanPabrik;