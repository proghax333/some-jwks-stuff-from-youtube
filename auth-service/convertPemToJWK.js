
const fs = require("fs");
const rsaPemToJWK = require("rsa-pem-to-jwk");

const privateKey = fs.readFileSync("./certs/private.pem");

const jwk = rsaPemToJWK(privateKey, {use: "sig"}, "public");

console.log(jwk);
