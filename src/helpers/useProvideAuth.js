import { useState } from 'react';
import Axios from 'axios';
import { parseStringPromise } from 'xml2js';

const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const xmlReq = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">
        <soapenv:Header/>
        <soapenv:Body>
           <impl:Login>
              <!--Optional:-->
              <username>${username}</username>
              <!--Optional:-->
              <password>${password}</password>
           </impl:Login>
        </soapenv:Body>
     </soapenv:Envelope>`;

        const xmlRes = await Axios.post(
            'http://localhost:8080/ws-factory/user?wsdl',
            xmlReq,
            { headers: { 'Content-Type': 'text/xml' } }
        );

        const xmlResJson = await parseStringPromise(xmlRes.data);
        const valid =
            xmlResJson['S:Envelope']['S:Body'][0]['ns2:LoginResponse'][0]
                .return[0];

        if (valid === 'true') {
            setUser(username);
        }
    };

    const register = async (username, email, password) => {
        const xmlReq = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:impl="http://impl.service.factory.ww.com/">
        <soapenv:Header/>
        <soapenv:Body>
           <impl:Register>
              <!--Optional:-->
              <username>${username}</username>
              <!--Optional:-->
              <email>${email}</email>
              <!--Optional:-->
              <password>${password}</password>
           </impl:Register>
        </soapenv:Body>
     </soapenv:Envelope>`;

        const xmlRes = await Axios.post(
            'http://localhost:8080/ws-factory/user?wsdl',
            xmlReq,
            { headers: { 'Content-Type': 'text/xml' } }
        );

        const xmlResJson = await parseStringPromise(xmlRes.data);
        const valid =
            xmlResJson['S:Envelope']['S:Body'][0]['ns2:RegisterResponse'][0]
                .return[0];

        if (valid === 'true') {
            setUser(username);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return {
        user,
        login,
        register,
        logout,
    };
};

export default useProvideAuth;
