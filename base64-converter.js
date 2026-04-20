const action = process.argv[2];
const input = process.argv.slice(3).join(" ");

if (!["encode", "decode"].includes(action)) return console.log("Error: First arg must be one of 'encode' or 'decode'");

switch (action) {


    case "encode":

        console.log("encode");

        break;


    case "decode":

        console.log("decode");

        break;

        
}