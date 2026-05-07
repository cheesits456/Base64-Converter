const action = process.argv[2];
let input = process.argv.slice(3).join(" ");
const base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";


if (!["encode", "decode"].includes(action)) return console.log("Error: First arg must be one of 'encode' or 'decode'");
if (!input) return console.log("Error: Missing input");


switch (action) {

	case "encode":
		encodeBase64();
		break;

	case "decode":
		decodeBase64();
		break;
};


function convertToBinary(text) {
	let binary = "";
	for (let i = 0; i < text.length; i++) {
		let data = text[i].charCodeAt(0).toString(2);
		while (data.length < 8) data = `0${data}`;
		binary += data;
	};
	return binary;
};

function decodeBase64() {
	// Check if all chars are valid
	for (const char of input.split("")) {
		if (!base64Alphabet.includes(char) && char !== "=") return invalidBase64String();
	};

	// Add pad chars if missing
	while (input.length % 4) input += "=";

	// Set variable for # pad chars, check if valid, remove chars from input string
	const padCharCount = input.split("=").length - 1;
	if (padCharCount > 2) return invalidBase64String();
	input = input.replace(/=/g, "");

	// Build binary string by fetching index of each char and converting to binary, if last char pad if necessary,
	// front-pad with zeros until length=6
	let decodingBinaryData = "";
	for (let i = 0; i < input.length; i++) {
		const char = input.charAt(i);
		let binary = base64Alphabet.indexOf(char).toString(2);
		if (i === input.length && padCharCount) {
			for (let j = 0; j < padCharCount; j++) binary += "00";
		};
		while (binary.length < 6) binary = `0${binary}`;
		decodingBinaryData += binary;
	};

	// Split binary string every 8 chars, remove final element if padded, convert each set to its ASCII
	// representation and combine together for final output
	const binaryArray = decodingBinaryData.match(/.{1,8}/g);
	if (binaryArray[binaryArray.length - 1].length < 8) binaryArray.pop();
	let decodingOutput = "";
	for (const eightBitSequence of binaryArray) {
		decodingOutput += String.fromCharCode(parseInt(Number(eightBitSequence), 2));
	};

	// Print decodingOutput to console
	console.log(decodingOutput);
};

function encodeBase64() {
	let encodingOutput = "";
	let padding = "";

	// Convert input to binary, split every 6 characters
	const encodingBinaryData = convertToBinary(input).match(/.{1,6}/g);

	// Pad last array element and set pad string with appropriate number of '='
	let lastChar = encodingBinaryData[encodingBinaryData.length - 1];
	while (lastChar.length < 6) {
		lastChar += "00";
		padding += "=";
	};
	encodingBinaryData[encodingBinaryData.length - 1] = lastChar;

	// Convert binary sets back to characters using the base64Alphabet variable as reference
	for (const element of encodingBinaryData) encodingOutput += base64Alphabet.charAt(parseInt(element, 2));

	// Print encodingOutput to console with pad char(s)
	console.log(encodingOutput + padding);
};

function invalidBase64String() {
	console.log("Error: Input string is not a valid base64 string");
};