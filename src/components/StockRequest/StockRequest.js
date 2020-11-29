//import logo from './logo.svg';
//import './StockRequest.css';
import axios from 'axios';
import React, {Component} from 'react';
import {parseStringPromise} from 'xml2js';

class StockRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requeststok: []
    };
  }

  componentDidMount() {
    const xmls1 ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
        '<impl:getAllRequest/>' +
      '</soapenv:Body>' +
    '</soapenv:Envelope>';
    axios.post('http://localhost:8080/ws-factory/request?wsdl', xmls1,
    {headers: {
      'Content-Type': 'text/xml'
      }
  }).then((res)=>{
    console.log(res.data);
    return parseStringPromise(res.data);
  })
  .then((result) => {
    return JSON.parse(JSON.stringify(result));
  })
  .then((result) => {
    return result["S:Envelope"]["S:Body"][0]["ns2:getAllRequestResponse"][0]["return"];
  })  
  .then(result => result.map(item => (
      {
        id_request: `${item.idRequest}`,
        id_coklat: `${item.idCoklat}`,
        jumlah: `${item.jumlah}`,
        status: `${item.status}`,
      }
    )))
    .then(requeststok => this.setState({
      requeststok
    }))
    .catch(error => console.log('parsing failed', error))
  }

  handleClick = (e) => {
      e.preventDefault();
      let data = e.target.value.split(',')
      // console.log(data);
      let id_req = data[0];
      let id_cok = data[1];
      let jumlah = data[2];
      let status = data[3];
      const xmls2 ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">' +
       '<soapenv:Header/>' +
       '<soapenv:Body>' +
            '<impl:updateRequestStatus>' +
                    '<arg0>' +
                        '<idCoklat>'+ id_cok +'</idCoklat>' +
                        '<idRequest>'+ id_req + '</idRequest>' +
                        '<jumlah>'+ jumlah +'</jumlah>' +
                        '<status>'+ status +'</status>' +
                    '</arg0>' +
            '</impl:updateRequestStatus>' +
       '</soapenv:Body>' +
   '</soapenv:Envelope>';
    axios.post('http://localhost:8080/ws-factory/request?wsdl', xmls2,
    {headers: {
      'Content-Type': 'text/xml'
      }
  }).then((res)=>{
    //console.log(res.data);
    return parseStringPromise(res.data);
  })
  .then((result) => {
    return JSON.parse(JSON.stringify(result));
  })
  .then((result) => {
    return result["S:Envelope"]["S:Body"][0]["ns2:updateRequestStatusResponse"][0]["return"][0]
  }) 
  .then((result) => {
    if (result === 'true') {
      let message = "Berhasil approve request dengan id: " + id_req;
      alert(message);
      window.location.replace('http://localhost:3000/');
    } else {
        let message2 = "Stok di factory tidak cukup. Akan dibuat coklat terlebih dahulu jika bahan cukup";
        alert(message2);
        // buat request buat coklat dari bahan
        const xmls3 ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
              '<impl:addStockCoklat>' +
                      '<arg0>' +
                          '<idCoklat>'+ id_cok +'</idCoklat>' +
                          '<idRequest>'+ id_req + '</idRequest>' +
                          '<jumlah>'+ jumlah +'</jumlah>' +
                          '<status>'+ status +'</status>' +
                      '</arg0>' +
              '</impl:addStockCoklat>' +
        '</soapenv:Body>' +
    '</soapenv:Envelope>';
      axios.post('http://localhost:8080/ws-factory/coklat?wsdl', xmls3,
      {headers: {
        'Content-Type': 'text/xml'
      }}).then((res)=>{
        console.log(res.data);
      })
        //window.location.replace('http://localhost:3000/');
      }
  })
  }

  render() {
    const {requeststok} = this.state;
    return (
      <div>
        <div className="flex-container">
          <h3> Lihat Add Stock Request </h3>
        </div> <center>
        {
          requeststok.length > 0 ? requeststok.map(request => {
            const {id_request, id_coklat, jumlah , status} = request;
            return (
              <div key={id_request}>
                <table border="1" className="table">
                  <thead>
                    <tr> 
                      <td> <b> ID Request </b></td>
                      <td> <b> ID Coklat </b></td>
                      <td> <b> Jumlah </b></td> 
                      <td> <b>Status </b></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {id_request} </td> 
                      <td> {id_coklat} </td>
                      <td> {jumlah} </td>
                      <td> {status} </td> 
                      <td> <button className="btn-add" value={[id_request, id_coklat, jumlah, status]} onClick={this.handleClick}> <b>Approve</b> </button> </td> 
                    </tr>
                  </tbody>
                </table>
                <br/>
              </div>
            );
          }) : null 
        } </center>
      </div>
    );
  }
}

export default StockRequest;
