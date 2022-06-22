const request = require('request');
const strongSoap = require('strong-soap').soap;
const xpath = require('xpath');
//    , var XMLHandler = strongSoap.XMLHandler;
var DOMParser = new (require('xmldom')).DOMParser;
const parseString = require('xml2js').parseString;
const url = 'http://localhost:5000/';
const apiUrl = 'http://10.229.16.29:8520/BCCSGateway/BCCSGateway?wsdl'; 
const userName = 'd609baa5ba374a7e89f74f99c33ad761';
const passWord = '09671efad19a4d85f2960fde2812339e';
const partnerCode = '904533';
const key = 'LZEW3q2RDfJ231xnYie38';
const crypto = require('crypto');

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

exports.receivePayment = async function(req, res) {
    var phoneNumber = '861401090';
    var messageText = 'Test e-Mola API';
    var amount = 1;
    var transId = randomString(30, 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890');
    var language = 'pt';
    var refNo = '9876543210';

    var xmlHandler = new XMLHandler();

    var reqText = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' " +
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
                res.send(error);
            } else {
                console.log('*** SUCCESS ***\n' + resp.body + '\n*** END SUCCESS ***');
                var document = DOMParser.parseFromString(resp.body);
                var originalResponse = document.getElementsByTagName('original');

                //var nodeById = document.getElementById('someId');
                var responseError = xpath.select("//error", document); //document.getElementById('error');
                var responseDescription = xpath.select("//description", document); //document.getElementsByTagName('description');
                var responseReturn = xpath.select("//return", document); //document.getElementsByTagName('return');
                var responseOriginal = xpath.select("//original", document); //document.getElementsByTagName('original');
                var responseTransaction = xpath.select("//gwtransid", document); //document.getElementsByTagName('gwtransid');

                //document = DOMParser.parseFromString(responseOriginal);

                /*
                parseString(req.body, function (err, result) {
                    response = result;
                    res.send(result);
                });
                //var response = xmlHandler.xmlToJson(null, req.body, null);
                */

                var response = 'Error: ' + responseError +
                '\nDescription: ' + responseDescription + 
                '\nReturn: ' + responseReturn + 
                '\nOriginal: ' + responseOriginal + 
                '\nTransactio ID: ' + responseTransaction/* +
                '\n\n*** ORIGINAL DETAILS ***' + 
                '\nError Code: ' + document.getElementById('errorCode') +
                '\nMessage: ' + document.getElementById('message') +
                '\nRequest ID:' + document.getElementById('reqeustid')*/;

                res.send(response);
            }
        });
};

exports.sendPayment = async function(req, res) {
    var phoneNumber = '861401090';
    var messageText = 'Test e-Mola API';
    var amount = 1;
    var transId = randomString(30, 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890');;

    var reqText = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' " +
        "xmlns:web='http://webservice.bccsgw.viettel.com/'>" +
        "<soapenv:Header/>" +
        "<soapenv:Body>" +
        "<web:gwOperation>" +
        "<Input>" +
        "<username>" + userName + "</username>" +
        "<password>" + passWord + "</password>" +
        "<wscode>pushUssdDisbursementB2C</wscode>" +
        "<param name='partnerCode' value='" + partnerCode + "'/>" +
        "<param name='msisdn' value='" + phoneNumber + "'/>" +
        "<param name='smsContent' value='" + messageText + "'/>" +
        "<param name='transAmount' value='" + amount + "'/>" +
        "<param name='transId' value='" + transId + "'/>" +
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
                res.send(error);
            } else {
                console.log('*** SUCCESS ***\n' + resp.body + '\n*** END SUCCESS ***');
                var response = '';
                parseString(req.body, function (err, result) {
                    response = result;
                    res.send(result);
                });
                //var response = xmlHandler.xmlToJson(null, req.body, null);
            }
        });

};

exports.paymentStatus = async function(req, res) {

};

exports.accountName = async function(req, res) {
    var phoneNumber = '861401090';

    var reqText = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' " +
        "xmlns:web='http://webservice.bccsgw.viettel.com/'>" +
        "<soapenv:Header/>" +
        "<soapenv:Body>" +
        "<web:gwOperation>" +
        "<Input>" +
        "<username>" + userName + "</username>" +
        "<password>" + passWord + "</password>" +
        "<wscode>queryBeneficiaryName</wscode>" +
        "<param name='partnerCode' value='" + partnerCode + "'/>" +
        "<param name='msisdn' value='" + phoneNumber + "'/>" +
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
                res.send(error);
            } else {
                console.log('*** SUCCESS ***\n' + resp.body + '\n*** END SUCCESS ***');
                var response = '';
                parseString(req.body, function (err, result) {
                    response = result;
                    res.send(result);
                });
                //var response = xmlHandler.xmlToJson(null, req.body, null);
            }
        });

};

exports.approvalStatus = async function(req, res) {

};

exports.getBalance = async function(req, res) {
    var transId = randomString(30, 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890');;

    var reqText = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' " +
        "xmlns:web='http://webservice.bccsgw.viettel.com/'>" +
        "<soapenv:Header/>" +
        "<soapenv:Body>" +
        "<web:gwOperation>" +
        "<Input>" +
        "<username>" + userName + "</username>" +
        "<password>" + passWord + "</password>" +
        "<wscode>queryAccountBalance</wscode>" +
        "<param name='partnerCode' value='" + partnerCode + "'/>" +
        "<param name='transId' value='" + transId + "'/>" +
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
                res.send(error);
            } else {
                console.log('*** SUCCESS ***\n' + resp.body + '\n*** END SUCCESS ***');
                var response = '';
                parseString(req.body, function (err, result) {
                    response = result;
                    res.send(result);
                });
                //var response = xmlHandler.xmlToJson(null, req.body, null);
            }
        });

};