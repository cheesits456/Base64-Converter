const debug = true;

const action = process.argv[2];
const input = process.argv.slice(3).join(" ");

if (!["encode", "decode"].includes(action)) return console.log("Error: First arg must be one of 'encode' or 'decode'");

switch (action) {


    case "encode":
        const binaryData = convertToBinary(input);
        console.log(binaryData);
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