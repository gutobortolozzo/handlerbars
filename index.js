const express = require('express');
const HandlerBars = require('handlebars');
const fs = require('fs');
const app = express();


const template = fs.readFileSync('./templates/main.html').toString();
const templateCompiled = HandlerBars.compile(template);

const bold = fs.readFileSync('./templates/bold.html').toString();
HandlerBars.registerPartial('bold', bold);

const h1 = fs.readFileSync('./templates/h1.html').toString();
HandlerBars.registerPartial('h1', h1);


app.get('/:name/:type/:store', (req, res) => {

    const data = {
        name        : req.params.name,
        storeName   : req.params.store,
        partialName : () => req.params.type
    };

    console.log(data);

    res.set('Content-Type', 'text/html');
    res.send(templateCompiled(data));
});

app.listen(process.env.PORT || 3000);