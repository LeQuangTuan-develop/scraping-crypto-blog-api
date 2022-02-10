const CryptoJS = require("crypto-js");
const privateKey = config.privateKey;

module.exports.btoa = function (rawString) {
  return new Buffer(rawString).toString("base64");
};

module.exports.atob = function (encodedString) {
  return new Buffer(encodedString, "base64").toString();
};

module.exports.encryptAES = function (pass) {
  var encrypted = CryptoJS.AES.encrypt(pass, privateKey).toString();
  return encrypted;
};

module.exports.decryptAES = function (hashPass) {
  var bytes = CryptoJS.AES.decrypt(hashPass, privateKey);
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};
