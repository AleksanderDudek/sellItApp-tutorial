const validation = (rules, value, form) => {
    let valid = true;

    // console.log(value)
    // console.log(rules)

    for(let rule in rules){
        switch(rule)
        {
            case "isRequired":
                valid = valid && validateRequired(value)
                break;
            case "isEmail":
                valid = valid && validateEmail(value)
                break;
            case "minLength":
                valid = valid && validateMinLength(value,rules[rule])
                break;
            case "confirmPass":
                valid = valid && validateConfirmPass(value,form[rules.confirmPass].value)
                break;
            default:
                valid = true;
        }
    }
    return valid;
}

const validateRequired = value => {
    if(value !== ''){
        return true;
    }
    return false;
}

const validateEmail = email => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLowerCase());
}

const validateMinLength = (value, ruleVal) => {
    if(value.length >= ruleVal){
        return true;
    }
    return false;
}

const validateConfirmPass = (confirmPass,pass) => {
    if(confirmPass === pass){
        return true;
    }
    return false;
}

export default validation;