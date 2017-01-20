const express = require('express'),
      app = express(),
      handlebars = require('express-handlebars')
      	.create({ defaultLayout:'main'}),
      fortune = require('./lib/fortune.js')

app.engine('handlebars', handlebars.engine)
   .set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

const fortunes = [
    'aaaaaaa',
    'bbbbbb',
    'cccccc',
    'dddddd',
    'eeeeee'
];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about',{fortune: fortune.getFortune()});
});

// 404
app.use((req, res, next) => {
	res.status(404);
    res.render('404');
});

// 500 error handler
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl+C to terminate.');
});
