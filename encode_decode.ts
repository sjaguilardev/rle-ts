export function encode(decodedCode: string): string {
    let result = '';
    for (let i = 0; i < decodedCode.length; i++) {
        let j = i + 1;
        let count = 1;
        while (decodedCode[i] === decodedCode[j]) {
            count++;
            j++;
        }
        result = result+count+decodedCode[i];
        i = j - 1;
    } 
    return result;
}

export function decode(encodedCode: string): string {
    let result = '';
    for (let i=0; i<encodedCode.length; i+=2) {
        const numberOfLetters = parseInt(encodedCode[i])
        for (let j=0; j<numberOfLetters; j++) {
            result = result + encodedCode[i+1];
        }
    }
    return result;
}