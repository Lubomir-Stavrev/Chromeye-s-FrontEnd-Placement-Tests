// Start the app with => node ./1.primeDividers inex.js

function primeDividers(n) {

    let primeDividers = [];
    let divider = 2;
    let sum = 0;

    while (divider <= Math.sqrt(n) + 10) {

        sum += divider;
        if (sum == n && isPrimeNum(divider)) {

            primeDividers.push(divider);
            divider++;
            sum = 0;
        }
        if (divider > n) {
            break;
        } else if (sum > n) {
            divider++;
            sum = 0;
        }
    }
    let result = `n = ${n} => ${primeDividers}`
    console.log(result);
}

function isPrimeNum(num) {

    if (num == 2) {
        return true;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false
        } else {
            return num > 1;
        }
    }
}

primeDividers(15);
primeDividers(11);
primeDividers(12);