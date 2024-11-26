// Building the server by importing the packagees 

const express = require ("express")
const app = express();
const port =3000;

//  Creating route 

app.get('/', (request, response) => {
response.send('Hello, you are  using express'); 
});


app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`); 
});

const db=require('./database')