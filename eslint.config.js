/*
 Copyright 2008-present Shaiksphere, Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            "**/.*",
            "node_modules/**"
        ]
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module"
        }
    },
    {
        rules: {
            "comma-dangle": [
                "error",
                "never"
            ],
            eqeqeq: [
                "error",
                "smart"
            ],
            indent: [
                "error",
                4,
                {
                    SwitchCase: 1,
                    VariableDeclarator: 1,
                    MemberExpression: 1
                }
            ],
            "no-dupe-class-members": "error",
            "no-eval": "error",
            "no-extra-semi": "error",
            "no-else-return": "error",
            "no-implied-eval": "error",
            "no-iterator": "error",
            "no-mixed-spaces-and-tabs": [
                "error",
                "smart-tabs"
            ],
            "no-proto": "error",
            "no-redeclare": [
                "error",
                {
                    builtinGlobals: true
                }
            ],
            "no-return-assign": [
                "error",
                "always"
            ],
            "no-script-url": "error",
            "no-self-assign": "error",
            "no-throw-literal": "error",
            "no-unused-vars": [
                "error",
                {
                    caughtErrors: "none"
                }
            ],
            "no-var": "error",
            quotes: [
                "error",
                "double",
                {
                    avoidEscape: true
                }
            ],
            semi: [
                "error",
                "always"
            ]
        }
    }
]);
