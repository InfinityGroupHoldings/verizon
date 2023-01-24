import { pass1, pass2 } from './key1.js'

const crypto = require('crypto');

var encryptedData = "+3L52bG3jfc/PIGMSR9mzHhe1EgxB0ixBG6iEcRfZOZfHd1+xYkkt3N6KZ5ZOWRg64Jgvac5VOWE0C2nHhxABGfFR2se/7B424hbvqo0BzmUf5/lNj3QI/SMIXzn04OX7UkUHBI1WplFo8vs2m0PCjdy1kP8pNtP+4BVaPJwInykD9sAfMyEVp1OlL5Cza5yUNpdmEzEzVFE9o0zSveDdOYOcMR6O4TQ93kULWnvL1ioAxf1CAJrZGVu2HPtV6dY3NBJYHx7UO18i+kNFsvlW/lAaaA4AnjVkYmyQVp68nnM/dVF0ngvlf55HWSwqsocA8CqN/LP8Sw2ylxFQ1RAPV5oqzJztIVHkBzCsnOOink="

const password = pass1 + "RqcEqmC8m2BZ5dPd3phV9mAGyVQcqzN288fk8PjCttKznmP3xPMZYqcbxBpk" + pass2

export var decryptedData = "";

const decipher = crypto.createDecipher("aes-256-cbc", password);

decryptedData += decipher.update(encryptedData, "hex", "utf-8")

decryptedData += decipher.final('utf-8')

console.log(decryptedData);