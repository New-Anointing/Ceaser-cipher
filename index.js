

//get the encrypt and decrypt button
let encryptButton = document.getElementById("encryptButton");
let decryptButton = document.getElementById("decryptButton");

//initialize the dictionaries

let dictionaryWithUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let Dictionary = "abcdefghijklmnopqrstuvwxyz";


//encription logic
encryptButton.addEventListener("click", (e) => {

    e.preventDefault();

    //get the text and the shift value from the user

    let text = document.getElementById("Text").value;
    let shift = document.getElementById("ShiftCode").value;
    //check for ascii
    let checkedForAscii = document.getElementById("checkBox").checked;
    //chech if uppercase is enabled
    let checkedForUpper = document.getElementById("checkBoxForUpper").checked;

    //parse the shift value to an integer
    shift = parseInt(shift);
    //get the result p tag
    let resultText = document.getElementById("secreteResult");
    //instantiate result
    let result
    //logic to switch from either ascii or normal
    if(checkedForAscii){
        result = caesarCipherWithFullAscii(text, shift)
    }else{
        if(checkedForUpper){
            result = caesarCipher(text, shift, dictionaryWithUpper)
        }else{
            result = caesarCipher(text.toLowerCase(), shift, Dictionary);
        }
    }

    resultText.innerHTML = result;
})

//Decryption logic
decryptButton.addEventListener("click", (e) => {

    e.preventDefault();

    //get the text and the shift value from the user

    let text = document.getElementById("secretText").value;
    let shift = document.getElementById("secretShiftCode").value;

    //check for ascii
    let checkedForAscii = document.getElementById("checkBox").checked;
    //chech if uppercase is enabled
    let checkedForUpper = document.getElementById("checkBoxForUpper").checked;

    //parse the shift value to an integer
    shift = parseInt(shift);
    //get the result p tag
    let resultText = document.getElementById("result");

    //instantiate result
    let result;

    //logic to switch from either ascii or normal
    if(checkedForAscii){
        result = decryptCipherWithFullAscii(text, shift)
    }else{
        if(checkedForUpper){
            result = decryptCipher(text, shift, dictionaryWithUpper);
        }else{
            result = decryptCipher(text.toLowerCase(), shift, Dictionary);
        }
    }
    console.log(result);
    resultText.innerHTML = result;
})















//all major functions for encription and decription
let caesarCipherWithFullAscii = (text, shift) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let ascii = char.charCodeAt(0);
        let shifted = ascii + shift;
        result += String.fromCharCode(shifted);     
    }
    return result;
}


let decryptCipherWithFullAscii = (text, shift) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let ascii = char.charCodeAt(0);
        let shifted = ascii - shift;
        result += String.fromCharCode(shifted);     
        
    }
    return result;
}

let caesarCipher = (text, shift, dictionary) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if(char == ' '){
            result += ' ';
            continue;
        }
        let index = dictionary.indexOf(char);
        let shifted = (index + shift) % dictionary.length;
        result += dictionary[shifted];
    }
    return result;
}

let decryptCipher = (text, shift, dictionary) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if(char == ' '){
            result += ' ';
            continue;
        }
        let index = dictionary.indexOf(char);
        let shifted = (index - shift) % dictionary.length;
        if(Math.sign(shifted) == -1){
            shifted = shifted + dictionary.length;
        }
        result += dictionary[shifted];
    }
    return result;
}
