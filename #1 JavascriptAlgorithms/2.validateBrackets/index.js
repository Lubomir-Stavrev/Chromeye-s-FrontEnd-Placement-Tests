// Start the app with => node ./2.validateBrackets inex.js

function isValid(str) {
    let stack = [];

    let bracketsValue = {
        "(": 1,
        "[": 2,
        "{": 3
    }

    let result = ""
    for (let i = 0; i < str.length; i++) {
        let char = stack[stack.length - 1];

        if (str[i] == "(" || str[i] == "{" || str[i] == "[" ||
            str[i] == ")" || str[i] == "}" || str[i] == "]") {
            stack.push(str[i]);
            if (bracketsValue[char] < bracketsValue[str[i]]) {

                result = `${str} - ${false}`
                console.log(result);
                return;
            }

        }
        if ((char == "(" && str[i] == ")") ||
            (char == "{" && str[i] == "}") ||
            (char == "[" && str[i] == "]")) {
            stack.pop()
            stack.pop()
        }
    }

    result = `${str} - ${stack.length ? "false" : "true"}`
    console.log(result);
}

isValid("{asd}");
isValid("{asd}");
isValid("[{asd}]");
isValid("[(asd])");
isValid("{aaa[bbb(ccc)ddd]eee}");