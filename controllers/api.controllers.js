const request = require('request');
const xpath = require('xpath');
var DOMParser = new (require('xmldom')).DOMParser;
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

function replaceAll(str, find, replace) {
    return str.toString().replace(new RegExp(find, 'g'), replace);
}

exports.receivePayment = async function(req, res) {
    var phoneNumber = '861401090';
    var messageText = 'Test e-Mola API';
    var amount = 1;
    var transId = randomString(30, 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890');
    var language = 'pt';
    var refNo = '9876543210';

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
                var document = DOMParser.parseFromString(resp.body);

                var responseError = xpath.select("//error", document); //document.getElementById('error');
                //var responseDescription = xpath.select("//description", document); //document.getElementsByTagName('description');
                //var responseReturn = xpath.select("//return", document); //document.getElementsByTagName('return');
                var responseOriginal = xpath.select("//original", document); //document.getElementsByTagName('original');
                var responseTransaction = xpath.select("//gwtransid", document); //document.getElementsByTagName('gwtransid');
                var originalResponse = responseOriginal[0].firstChild;
                originalResponse = replaceAll(originalResponse, '&lt;', '<'); //originalResponse.toString().replaceAll('&lt;', '<');

                var original = DOMParser.parseFromString(originalResponse);
                var originalError = xpath.select("//errorCode", original); 
                var originalMessage = xpath.select("//message", original); 
                var originalRequest = xpath.select("//reqeustId", original); 

                console.log('*** SUCCESS ***\n' + resp.body + '\nOriginal Response: ' + originalResponse + '\n*** END SUCCESS ***');

                var response = 'Error: ' + responseError[0].firstChild +
                //'\nDescription: ' + responseDescription[0].firstChild + 
                //'\nReturn: ' + responseReturn[0].firstChild + 
                //'\nOriginal: ' + responseOriginal[0].firstChild + 
                '\nTransactio ID: ' + responseTransaction[0].firstChild +
                '\n\n*** ORIGINAL RESPONSE ***' + 
                '\nError Code: ' + originalError[0].firstChild +
                '\nMessage: ' + originalMessage[0].firstChild +
                '\nRequest ID:' + originalRequest[0].firstChild;

                console.log('*** SUCCESS ***\n' + originalResponse + '\n*** END SUCCESS ***');
                res.send(response);
            }
        });
};

exports.sendPayment = async function(req, res) {
    var phoneNumber = '861401090';
    var messageText = 'Test e-Mola API';
    var amount = 2;
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
                var document = DOMParser.parseFromString(resp.body);

                var responseError = xpath.select("//error", document); //document.getElementById('error');
                //var responseDescription = xpath.select("//description", document); //document.getElementsByTagName('description');
                //var responseReturn = xpath.select("//return", document); //document.getElementsByTagName('return');
                var responseOriginal = xpath.select("//original", document); //document.getElementsByTagName('original');
                var responseTransaction = xpath.select("//gwtransid", document); //document.getElementsByTagName('gwtransid');
                var originalResponse = responseOriginal[0].firstChild;
                originalResponse = replaceAll(originalResponse, '&lt;', '<'); //originalResponse.toString().replaceAll('&lt;', '<');

                var original = DOMParser.parseFromString(originalResponse);
                var originalError = xpath.select("//errorCode", original); 
                var originalMessage = xpath.select("//message", original); 
                var originalRequest = xpath.select("//reqeustId", original); 

                var response = 'Error: ' + responseError[0].firstChild +
                //'\nDescription: ' + responseDescription[0].firstChild + 
                //'\nReturn: ' + responseReturn[0].firstChild + 
                '\nTransactio ID: ' + responseTransaction[0].firstChild +
                '\n\n*** ORIGINAL RESPONSE ***' + 
                '\nError Code: ' + originalError[0].firstChild +
                '\nMessage: ' + originalMessage[0].firstChild +
                '\nRequest ID: ' + originalRequest[0].firstChild;

                console.log('*** SUCCESS ***\n' + originalResponse + '\n*** END SUCCESS ***');
                res.send(response);
            }
        });

};

exports.paymentStatus = async function(req, res) {
    var transactionNumber = '904533220623000000085131';
    var transactionType = 'C2B';

    var reqText = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' " +
        "xmlns:web='http://webservice.bccsgw.viettel.com/'>" +
        "<soapenv:Header/>" +
        "<soapenv:Body>" +
        "<web:gwOperation>" +
        "<Input>" +
        "<username>" + userName + "</username>" +
        "<password>" + passWord + "</password>" +
        "<wscode>pushUssdQueryTrans</wscode>" +
        "<param name='partnerCode' value='" + partnerCode + "'/>" +
        "<param name='transId' value='" + transactionNumber + "'/>" +
        "<param name='key' value='" + key + "'/>" +
        "<param name='transType' value='" + transactionType + "'/>" +
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

            var responseError = xpath.select("//error", document); //document.getElementById('error');
            //var responseDescription = xpath.select("//description", document); //document.getElementsByTagName('description');
            //var responseReturn = xpath.select("//return", document); //document.getElementsByTagName('return');
            var responseOriginal = xpath.select("//original", document); //document.getElementsByTagName('original');
            var responseTransaction = xpath.select("//gwtransid", document); //document.getElementsByTagName('gwtransid');
            var originalResponse = responseOriginal[0].firstChild;
            originalResponse = replaceAll(originalResponse, '&lt;', '<'); //originalResponse.toString().replaceAll('&lt;', '<');

            var original = DOMParser.parseFromString(originalResponse);
            var originalError = xpath.select("//errorCode", original); 
            var originalMessage = xpath.select("//message", original); 
            var originalRespCode = xpath.select("//orgResponseCode", original); 
            var originalRespMessage = xpath.select("//orgResponseMessage", original); 
            var originalRequest = xpath.select("//reqeustId", original); 

            var response = 'Error: ' + responseError[0].firstChild +
            //'\nDescription: ' + responseDescription[0].firstChild + 
            //'\nReturn: ' + responseReturn[0].firstChild + 
            '\nTransactio ID: ' + responseTransaction[0].firstChild +
            '\n\n*** ORIGINAL RESPONSE ***' + 
            '\nError Code: ' + originalError[0].firstChild +
            '\nMessage: ' + originalMessage[0].firstChild +
            '\nResponse Code: ' + originalRespCode[0].firstChild +
            '\nResponse Message: ' + originalRespMessage[0].firstChild +
            '\nRequest ID: ' + originalRequest[0].firstChild;

            console.log('*** SUCCESS ***\n' + originalResponse + '\n*** END SUCCESS ***');
            res.send(response);
        }
    });
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
                var document = DOMParser.parseFromString(resp.body);

                var responseError = xpath.select("//error", document); //document.getElementById('error');
                //var responseDescription = xpath.select("//description", document); //document.getElementsByTagName('description');
                //var responseReturn = xpath.select("//return", document); //document.getElementsByTagName('return');
                var responseOriginal = xpath.select("//original", document); //document.getElementsByTagName('original');
                var responseTransaction = xpath.select("//gwtransid", document); //document.getElementsByTagName('gwtransid');
                var originalResponse = responseOriginal[0].firstChild;
                originalResponse = replaceAll(originalResponse, '&lt;', '<'); //originalResponse.toString().replaceAll('&lt;', '<');

                var original = DOMParser.parseFromString(originalResponse);
                var originalError = xpath.select("//errorCode", original); 
                var originalMessage = xpath.select("//message", original); 
                var originalRequest = xpath.select("//reqeustId", original); 

                var response = 'Error: ' + responseError[0].firstChild +
                //'\nDescription: ' + responseDescription[0].firstChild + 
                //'\nReturn: ' + responseReturn[0].firstChild + 
                '\nTransactio ID: ' + responseTransaction[0].firstChild +
                '\n\n*** ORIGINAL RESPONSE ***' + 
                '\nError Code: ' + originalError[0].firstChild +
                '\nMessage: ' + originalMessage[0].firstChild +
                '\nRequest ID: ' + originalRequest[0].firstChild;

                console.log('*** SUCCESS ***\n' + originalResponse + '\n*** END SUCCESS ***');
                res.send(response);
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
                var document = DOMParser.parseFromString(resp.body);

                var responseError = xpath.select("//error", document); //document.getElementById('error');
                //var responseDescription = xpath.select("//description", document); //document.getElementsByTagName('description');
                //var responseReturn = xpath.select("//return", document); //document.getElementsByTagName('return');
                var responseOriginal = xpath.select("//original", document); //document.getElementsByTagName('original');
                var responseTransaction = xpath.select("//gwtransid", document); //document.getElementsByTagName('gwtransid');
                var originalResponse = responseOriginal[0].firstChild;
                originalResponse = replaceAll(originalResponse, '&lt;', '<'); //originalResponse.toString().replaceAll('&lt;', '<');

                var original = DOMParser.parseFromString(originalResponse);
                var originalError = xpath.select("//errorCode", original); 
                var originalMessage = xpath.select("//message", original); 
                var originalBalance = xpath.select("//balance", original); 
                var originalRequest = xpath.select("//reqeustId", original); 

                var response = 'Error: ' + responseError[0].firstChild +
                //'\nDescription: ' + responseDescription[0].firstChild + 
                //'\nReturn: ' + responseReturn[0].firstChild + 
                '\nTransactio ID: ' + responseTransaction[0].firstChild +
                '\n\n*** ORIGINAL RESPONSE ***' + 
                '\nError Code: ' + originalError[0].firstChild +
                '\nMessage: ' + originalMessage[0].firstChild +
                '\nBalance: ' + originalBalance[0].firstChild +
                '\nRequest ID: ' + originalRequest[0].firstChild;

                console.log('*** SUCCESS ***\n' + originalResponse + '\n*** END SUCCESS ***');
                res.send(response);
            }
        });

};