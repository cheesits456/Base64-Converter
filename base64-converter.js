const action = process.argv[2];
const conversionType = process.argv[3];
let input = process.argv.slice(4).join(" ");
const base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";


if (!["encode", "decode"].includes(action)) return console.log("Error: First arg must be one of 'encode' or 'decode'");
if (!["base64", "binary"].includes(conversionType)) return console.log("Error: Second arg must be one of 'base64' or 'binary'")
if (!input) return console.log("Error: Missing input");


switch (action) {

	case "encode":
		encode(conversionType);
		break;

	case "decode":
		decode(conversionType);
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

function decode(type) {
	switch (type) {

		case "base64":
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
			const base64BinaryArray = decodingBinaryData.match(/.{1,8}/g);
			if (base64BinaryArray[base64BinaryArray.length - 1].length < 8) base64BinaryArray.pop();
			let decodingOutput = "";
			for (const eightBitSequence of base64BinaryArray) {
				decodingOutput += String.fromCharCode(parseInt(Number(eightBitSequence), 2));
			};

			// Print decodingOutput to console
			console.log(decodingOutput);

			break;


		case "binary":
			let binaryArray = input.split(" ");
			for (const binary of binaryArray) {
				if (!binary.match(/[01]{8}/)) return console.log("Error: Input is not valid binary - must be in groups of 8 digits long and only use the digits 0 and 1");
			};
			let binaryOutput = "";
			for (const binary of binaryArray) binaryOutput += String.fromCharCode(parseInt(Number(binary), 2));
			console.log(binaryOutput);
			break;
	};
};

function encode(type) {
	switch (type) {

		case "base64":
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
			console.log();
			console.log(encodingOutput + padding);

			break;


			case "binary":
				let binaryArray = [];
				for (let i = 0; i < input.length; i++) binaryArray.push(input[i].charCodeAt(0).toString(2));
				for (let i = 0; i < binaryArray.length; i++) while (binaryArray[i].length < 8) binaryArray[i] = `0${binaryArray[i]}`;
				console.log();
				console.log(binaryArray.join(" "));
			break;
	};
};

function invalidBase64String() {
	console.log("Error: Input string is not a valid base64 string");
};