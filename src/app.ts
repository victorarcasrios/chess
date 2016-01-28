declare function require(name:string) : any;

const express = require('express');
const app = express();

app.use('css', express.static(__dirname + '/css'));

app.get('/', (req: any, res: any) => res.sendFile(__dirname + '/html/views/index.html'));

app.listen(3000, () => console.log("Yaay!! Express server built on TypeScript and compiled with Gulp!"));