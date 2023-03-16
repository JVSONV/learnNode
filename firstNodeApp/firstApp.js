console.log("Hello from Node.js");

import { writeFileSync } from "fs";
// const fs = require("fs"); This is the same as the impot that is above (done in ES modules)

writeFileSync("hello.txt", "Hello from Node.js Again");
