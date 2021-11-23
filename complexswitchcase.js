const fs = require('fs')
const complex = require('./complex.json')
const use = complex.use;

// setting use from configs file
if (use == 1) {
    const file = fs.readFileSync('extracted.txt', 'utf-8')

    var arrayed = file.trim().split('\n');

    generateSimpleIfAssign(arrayed, productName=[], productId=[]);
}
else if (use == 2) {
    generateCustomCaseBlockSwitch();
}

function generateSimpleIfAssign(arrayed, productName, productId) {
    // This is to generate a simple if-assign switch-case statement block
    // A utf-8 text file is expected with the format: case-value - assign-value
    for (const elem of arrayed) {
        productName.push(elem.split(' - ')[0])
        productId.push(elem.split(' - ')[1])
    }
    const switchVariable = complex.types['simple-if-assign-switch']['switch-variable-name']
    const assignVariable = complex.types['simple-if-assign-switch']['assign-variable-name']
    console.log(constructSwitchCaseStatement(productName,productId))
    
    function constructSwitchCaseStatement(pn, pi) {
        var codegen = `switch (${switchVariable}) {`
        for (let i=0; i < pn.length; i++) {
            codegen = codegen.concat(`\n\tcase "${pn[i]}":\n\t\t${assignVariable} = ${pi[i]}`)
            if(complex.types['simple-if-assign-switch']['require-break']) codegen = codegen.concat(`\n\t\tbreak`)
        }
        if (complex.types['simple-if-assign-switch']['require-default'])
            codegen = codegen.concat(`\n\tdefault:\n\t\t// add your default code here`)
        codegen = codegen.concat('\n}')
        return codegen;
    }
}

function generateCustomCaseBlockSwitch() {
    // generates a custom code block with content obtained from the config file present in all the case blocks
    // does not require a file by default, but feel free to modify if needed
    const block = complex.types['custom-code-block-switch']['code-skeleton']
    const switchVariable = complex.types['custom-code-block-switch']['switch-variable-name']
    const n = complex.types['custom-code-block-switch']['number-of-repetitions']
    console.log(constructCustomBlock(block))

    function constructCustomBlock(block) {
        var codegen = `switch (${switchVariable}) {`
        for (let i=0; i < n; i++) {
            codegen = codegen.concat(`\n\t case <<expr>>\n\t\t${block}`)
            if(complex.types['custom-code-block-switch']['require-break']) codegen = codegen.concat(`\n\t\tbreak`)
        }
        if (complex.types['custom-code-block-switch']['require-default'])
            codegen = codegen.concat(`\n\tdefault:\n\t\t// add your default code here`)
        codegen = codegen.concat('\n}')
        return codegen;
    }
}