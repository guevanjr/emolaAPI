const request = require('request');
const url = 'http://localhost:5000/';
const apiUrl = 'http://10.229.16.29:8520/BCCSGateway/BCCSGateway?wsdl'; 
const userName = 'd609baa5ba374a7e89f74f99c33ad761';
const passWord = '09671efad19a4d85f2960fde2812339e';
const partnerCode = '904533';
const key = 'LZEW3q2RDfJ231xnYie38';

exports.receivePayment = async function(req, res) {
    var phoneNumber = '258861401090';
    var messageText = 'Test e-Mola API';
    var amount = 1;
    var transId = '0123456789';
    var language = 'pt';
    var refNo = '9876543210';

    var reqText = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'" +
        "xmlns:web='http://webservice.bccsgw.viettel.com/'>" +
        "<soapenv:Header/>" +
        "<soapenv:Body>" +
        "<web:gwOperation>" +
        "<Input>" +
        "<username>" + userName + "</username>" +
        "<password>" + passWord + "</password>" +
        "<wscode>pushUssdMessage</wscode>" +
        "<param name='partnerCode' value='" + partnerCode + "'/>" +
        "<param name='msisdn' value='" + phoneNumber + "'/>" +
        "<param name='smsContent' value='" + messageText + "'/>" +
        "<param name='transAmount' value='" + amount + "'/>" +
        "<param name='transId' value='" + transId + "'/>" +
        "<param name='language' value='" + language + "'/>" +
        "<param name='refNo' value='" + refNo + "'/>" +
        "<param name='key' value='" + key + "'/>" +
        "<rawData>?</rawData>" +
        "</Input>" +
        "</web:gwOperation>" +
        "</soapenv:Body>" +
        "</soapenv:Envelope>";

        request.post({
            headers: {'content-type': 'text/xml;charset=UTF-8'},
            url:     apiUrl,
            body:    reqText
        }, function(error, resp, body){
            if (error) {
                console.log('*** ERROR ***\n ' + error + '\n *** END ERROR ***');
            } else {
                console.log('*** SUCCESS ***\n' + resp.body + '\n*** END SUCCESS ***');
            }
        });
};

exports.sendPayment = async function(req, res) {

};

exports.paymentStatus = async function(req, res) {

};

exports.accountName = async function(req, res) {

};

exports.approvalStatus = async function(req, res) {

};

exports.getBalance = async function(req, res) {

};