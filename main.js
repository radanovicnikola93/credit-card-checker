// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
/*
Create a function, validateCred() that has a parameter of an array. 
The purpose of validateCred() is to return true when an array 
contains digits of a valid credit card number and false when it is invalid. 
This function should NOT mutate the values of the original array.
*/
const validateCred = array => {
    // return true if contains numbers from valid arrays
    // return false if not
    /* We will use the Luhn alghoritm
        Steps:
        1) 
            - From the rightmost digit (excluding the check digit) and moving left, double the value of every second digit.
            - If the result of this doubling operation is greater than 9 (e.g., 8 × 2 = 16), then add the digits of the result (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9) or, equivalently, subtract 9 from the result (e.g., 16: 16 − 9 = 7, 18: 18 − 9 = 9
        2)
            - Take the sum of all the digits (including the check digit).
        3)
            - If the total modulo 10 is equal to 0 (if the total ends in zero) then the number is valid according to the Luhn formula; otherwise it is not valid.
            - The check digit (x) is obtained by computing the sum of the sum digits then computing 9 times that value modulo 10 (in equation form, ((67 × 9) mod 10)). In algorithm form:
                - Compute the sum of the sum digits (67).
                - Multiply by 9 (603).
                - 603 mod 10 is then 3, which is the check digit. Thus, x=3.
    */
    let arrLength = array.length - 2; // starting the loop at the second digit
    let sum = 0;
    let sumOfDoubled = 0;
    let sumOfNonDoubled = 0;
    for (let i = arrLength; i >= 0; i = i - 2) { // start the loop from the rightmost element and moving left every second element.
        let doubledElement = array[i] * 2 // double the value of every second digit
        if (doubledElement > 9) { // if the doubled number is bigger than 9
            doubledElement = doubledElement.toString().split('').map(digit => parseInt(digit)) // first we split the double number in 2 string digits and than convert them into numbers
            doubledElement = doubledElement.reduce((current, accumulator) => current + accumulator); // we sum the numbers of the splitted digits;
        }
        sumOfDoubled += doubledElement; // we store the sum of the doubled digits to apply them in the total sum later
    }
    
    for (let j = array.length - 1; j >= 0; j -= 2) { // we will sum all other numbers
        sumOfNonDoubled += array[j];
    }
    sum = sumOfDoubled + sumOfNonDoubled; // we sum the number of all doubled and nondoubled numbers
    let validCard = sum % 10 === 0;
    return (validCard ? true : false);
}

console.log('VALID CARDS')
console.log(validateCred(valid1));
console.log(validateCred(valid2));
console.log(validateCred(valid3));
console.log(validateCred(valid4));
console.log(validateCred(valid5));

console.log('INVALID CARDS')
console.log(validateCred(invalid1));
console.log(validateCred(invalid2));
console.log(validateCred(invalid3));
console.log(validateCred(invalid4));
console.log(validateCred(invalid5));

console.log('MYSTERY CARDS')
console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5));

/*
Create another function, findInvalidCards() that has one parameter 
for a nested array of credit card numbers. 
The role of findInvalidCards() is to check through the nested 
array for which numbers are invalid, and return another 
nested array of invalid cards.
*/

console.log(" ")

const findInvalidCards = arr => {
    const invalidCards = arr.filter(card => { // we will return a new array of invalid cards
        const falseCard = validateCred(card); // declaring a new variable with the value of calling validateCard function
        return falseCard === false; // if the result of calling the function validateCard equals to false return this elements
    });
    return invalidCards;
}

const invalidCards = findInvalidCards(batch);
console.log("ARRAY OF INVALID CARDS")
console.log(invalidCards);

/*
After finding all the invalid credit card numbers, it’s also necessary to identify the credit card 
companies that have possibly issued these faulty numbers. 
Create a function, idInvalidCardCompanies() that has one parameter for a nested array of invalid 
numbers and returns an array of companies.
*/

console.log(" ");
console.log("ARRAY OF COMPANIES")
const companies = {
    'american express': 3,
    'visa': 4,
    'mastercard': 5,
    'discover': 6 
};

let companiesArr = []; // declaring an empty array for storing companies
const idInvalidCardCompanies = array => {
    for (let i = 0; i < array.length; i++) { // looping through the argument array
        for (let [key, value] of Object.entries(companies)) {
            if (array[i][0] === value) { // checking if the number at index 0 equals to the value of the companies object
                companiesArr.push(key); // push only the key from the object companies into the companiesArr
            };
        };
    };

    let removeDuplicates = companiesArr.reduce((accumulator, currentValue) => { // we remove duplicates from the companiesArr
        if (accumulator.indexOf(currentValue) === -1) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);

    return removeDuplicates;
}

console.log(idInvalidCardCompanies(invalidCards))