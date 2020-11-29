import Axios from 'axios';
import { useEffect, useState } from 'react';
import { parseStringPromise } from 'xml2js';
import CoklatCard from '../components/Coklat/CoklatCard';
import Auxiliary from '../components/hoc/Auxiliary';

const CoklatPage = () => {
    const [listCoklat, setListCoklat] = useState([]);

    useEffect(() => {
        const fetchListCoklat = async () => {
            const xmlReq = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">
            <soapenv:Header/>
            <soapenv:Body>
               <impl:getAllCoklatInFactory/>
            </soapenv:Body>
         </soapenv:Envelope>`;

            const xmlRes = await Axios.post(
                'http://localhost:8080/ws-factory/coklat?wsdl',
                xmlReq,
                { headers: { 'Content-Type': 'text/xml' } }
            );
            const xmlResJson = await parseStringPromise(xmlRes.data);

            const arrCoklat = [
                ...xmlResJson['S:Envelope']['S:Body'][0][
                    'ns2:getAllCoklatInFactoryResponse'
                ][0].return,
            ];

            const arrCoklatFix = arrCoklat.map((coklat, idx) => {
                return {
                    id: coklat['ID'][0],
                    jumlah: coklat['jumlah'][0],
                    nama: coklat['nama'][0],
                };
            });

            setListCoklat((coklat) => [...coklat, ...arrCoklatFix]);
        };

        fetchListCoklat();
    }, []);

    const theList = listCoklat.map((coklat) => (
        <CoklatCard
            key={coklat.id}
            id={coklat.id}
            nama={coklat.nama}
            jumlah={coklat.jumlah}
        />
    ));

    return <Auxiliary>{theList}</Auxiliary>;
};

export default CoklatPage;
