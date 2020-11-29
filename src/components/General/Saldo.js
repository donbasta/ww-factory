import { parseStringPromise } from 'xml2js';
import Axios from 'axios';
import { useEffect, useState } from 'react';

const Saldo = (props) => {
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        const fetchSaldo = async () => {
            const xmlReq = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/"><soapenv:Header/><soapenv:Body><impl:getCurrentSaldo/></soapenv:Body></soapenv:Envelope>`;
            const xmlRes = await Axios.post(
                'http://localhost:8080/ws-factory/saldo?wsdl',
                xmlReq,
                { headers: { 'Content-Type': 'text/xml' } }
            );
            const xmlResJson = await parseStringPromise(xmlRes.data);
            setSaldo(
                xmlResJson['S:Envelope']['S:Body'][0][
                    'ns2:getCurrentSaldoResponse'
                ][0].return[0]
            );
        };

        fetchSaldo();
    }, []);

    return (
        <button type='button' className='btn btn-primary'>
            Saldo <span className='badge badge-light'>{saldo}</span>
        </button>
    );
};

export default Saldo;
