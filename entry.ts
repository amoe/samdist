import mymodule from './src/mymodule';

document.addEventListener("DOMContentLoaded", e => {
    console.log("Hello, world!");
    console.log("The answer is: %o", mymodule.meaningOfLife());
});
