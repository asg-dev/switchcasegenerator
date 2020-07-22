const fs = require('fs')
const configs = require('./configs.json')

const file = fs.readFileSync('extracted.txt', 'utf-8')

var arrayed = file.trim().split('\n');
var productName = [];
var productId = [];

for (const elem of arrayed) {
    productName.push(elem.split(' - ')[0])
    productId.push(elem.split(' - ')[1])
}

console.log(constructSwitchCaseStatement(productName,productId))

function constructSwitchCaseStatement(pn, pi) {
    var codegen = `switch (${configs['switch-variable-name']}) {`
    for (let i=0; i < pn.length; i++) {
        codegen = codegen.concat(`\n\tcase "${pn[i]}":\n\t\t${configs['assign-variable-name']} = ${pi[i]}`)
        if(configs['require-break']) codegen = codegen.concat(`\n\t\tbreak`)
    }
    if (configs['require-default'])
        codegen = codegen.concat(`\n\tdefault:\n\t\t// add your default code here`)
    codegen = codegen.concat('\n}')
    return codegen;
}