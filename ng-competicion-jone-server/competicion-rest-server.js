var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Competicion = /** @class */ (function () {
    function Competicion(id, lugar, competiciones) {
        this.id = id;
        this.lugar = lugar;
        this.competiciones = competiciones;
    }
    return Competicion;
}());
var competiciones = [
    new Competicion(0, "Madrid", ["Liga Nacional Cadetes y menores", "1 GP de España", "1 Liga Nacional de Campo"]),
    new Competicion(1, "Pamplona", ["Cto. España Sala", "2 Liga Nacional de Campo"]),
    new Competicion(2, "Sevilla", ["1 Liga Nacional 3D"]),
    new Competicion(3, "Tudela", ["2 Liga Nacional 3D", "3 Liga Nacional de Campo"]),
    new Competicion(4, "Almeria", ["Cto. España Aire Libre", "Cto. España Campo", "Cto. España 3D"]),
    new Competicion(5, "Toledo", ["2 GP España"])
];
function getCompeticiones() {
    return competiciones;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/competiciones', bodyParser.json(), function (req, res) {
    var cNew = new Competicion(competiciones.length + 1, req.body.lugar, req.body.competiciones);
    competiciones.push(cNew);
    res.status(200).send({
        id: cNew.id,
        title: cNew.lugar,
        categories: cNew.competiciones,
    });
});
app.get('/', function (req, res) {
    res.send('The URL of competiciones is http://localhost:8000/competiciones');
});
app.get('/competiciones', function (req, res) {
    res.json(getCompeticiones());
});
function getCompeticionesById(competicionId) {
    var c;
    c = competiciones.find(function (c) { return c.id == competicionId; });
    return c;
}
app.get('/competiciones/:id', function (req, res) {
    res.json(getCompeticionesById(parseInt(req.params.id)));
});
function updateCompeticionesById(req, competicionId) {
    var c;
    c = competiciones.find(function (c) { return c.id == competicionId; });
    var index = competiciones.indexOf(c);
    c.lugar = req.body.lugar,
        c.competiciones = req.body.competiciones,
        competiciones[index] = c;
    return c;
}
app.put('/competiciones/:id', function (req, res) {
    res.json(updateCompeticionesById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteCompeticionesById(competicionId) {
    var c;
    c = competiciones.find(function (c) { return c.id == competicionId; });
    var index = competiciones.indexOf(c);
    delete competiciones[index];
    return c;
}
app.delete('/competiciones/:id', function (req, res) {
    res.json(deleteCompeticionesById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
