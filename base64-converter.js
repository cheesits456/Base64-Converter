const action = process.argv[2];
const input = process.argv.slice(3).join(" ");
const base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

if (!["encode", "decode"].includes(action)) return console.log("Error: First arg must be one of 'encode' or 'decode'");

switch (action) {

    case "encode":

        // Convert input to binary, split every 6 characters
        const binaryData = convertToBinary(input).match(/.{1,6}/g);

        // Pad last array element and set pad string with appropriate number of '='
        let lastChar = binaryData[binaryData.length - 1];
        let padding = "";
        while (lastChar.length < 6) {
            lastChar += "00";
            padding += "=";
        }
        binaryData[binaryData.length - 1] = lastChar;

        console.log(binaryData);
        console.log(padding);

        break;

    case "decode":

        console.log("decode");

        break;

}

function convertToBinary(text) {
    let binary = "";
    for (let i = 0; i < text.length; i++) {
        let data = text[i].charCodeAt(0).toString(2);
        while (data.length < 8) data = `0${data}`;
        binary += data;
    }
    return binary;
}