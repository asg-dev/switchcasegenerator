# switchcasegenerator

Generates a simple case-assign block based on configs provided in the configs.json file.

## configs.json

```json
{
    "use": 1,
    "types": {
        "simple-if-assign-switch" : {
            "switch-variable-name": "<switch-var-name>",
            "assign-variable-name": "<assign-var-name>",
            "require-break": true,
            "require-default": true
        },
        "custom-code-block-switch": {
            "switch-variable-name": "<switch-var-name>",
            "code-skeleton": "",
            "number-of-repetitions": 17,
            "require-break": true,
            "require-default": true
        }
    }
}
```

## options in configs.json

```
use - 1, if you need a simple case-assign switch block.
    - 2, if you need repetitive case blocks.
    
require-break - true, by default. Will add a break statement at the end of each case block.
require-default - true, by  default. Will add the default statement at the end of all case blocks.
```

