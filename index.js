const str = 'abc123';
const regex = /^([a-z]{3})([1-3]{3})$/;
const wordRegex = regex.test(str);
console.log(wordRegex);