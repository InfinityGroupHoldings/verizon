import { pass1, pass2 } from './key1.js'

const crypto = require('crypto');

const password = pass1 + "RqcEqmC8m2BZ5dPd3phV9mAGyVQcqzN288fk8PjCttKznmP3xPMZYqcbxBpk" + pass2

let decryptedData = "";

const decipher = crypto.createDecipher("aes-256-cbc", password);

decryptedData += decipher.update(encryptedData, "hex", "utf-8")

decryptedData += decipher.final('utf-8')