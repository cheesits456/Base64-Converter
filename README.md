# Base64-Converter
A zero-dependecy JavaScript converter for base64 and binary

Just a small side project for me to learn how base64 encoding and decoding works, got bored and added a binary converter as well (binary decoding is still a WIP)

## Encoding

### Input:

```bash
node ./base64-converter.js encode base64 Hello, my name is Quin
```

### Output:

```
SGVsbG8sIG15IG5hbWUgaXMgUXVpbg==
```

### Input:

```bash
node ./base64-converter.js encode binary Hello, my name is Quin
```

### Output:

```
01101000 01100101 01101100 01101100 01101111 00101100 00100000 01101101 01111001 00100000 01101110 01100001 01101101 01100101 00100000 01101001 01110011 00100000 01010001 01110101 01101001 01101110
```

## Decoding

### Input:

```bash
node ./base64-converter.js decode base64 SGVsbG8sIG15IG5hbWUgaXMgUXVpbg==
```

### Output:

```
Hello, my name is Quin
```


### Input:

```bash
node ./base64-converter.js decode binary 01101000 01100101 01101100 01101100 01101111 00101100 00100000 01101101 01111001 00100000 01101110 01100001 01101101 01100101 00100000 01101001 01110011 00100000 01010001 01110101 01101001 01101110
```

### Output:

```
Hello, my name is Quin
```
