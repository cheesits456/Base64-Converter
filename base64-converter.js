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
    for (let i = 0; i < input.length; i++) {
        binary += input[i].charCodeAt(0).toString(2);
    }
    return binary;
}