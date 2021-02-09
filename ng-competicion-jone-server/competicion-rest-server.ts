var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Competicion {
  constructor(
    public id: number,
    public lugar: string,
    public competiciones: string[],
  ) { }
}

const competiciones: Competicion[] = [
  new Competicion(
    0,
    "Madrid",
    ["Liga Nacional Cadetes y menores", "1 GP de España","1 Liga Nacional de Campo"]
  ),
  new Competicion(
    1,
    "Pamplona",
    ["Cto. España Sala","2 Liga Nacional de Campo"]
  ),
  new Competicion(
    2,
    "Sevilla",
    ["1 Liga Nacional 3D"]
  ),
  new Competicion(
    3,
    "Tudela",
    ["2 Liga Nacional 3D", "3 Liga Nacional de Campo"]
  ),
  new Competicion(
    4,
    "Almeria",
    ["Cto. España Aire Libre", "Cto. España Campo","Cto. España 3D"]
  ),
  new Competicion(
    5,
    "Toledo",
    ["2 GP España"]
  )
]





function getCompeticiones(): any[] {
  return competiciones;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/competiciones', bodyParser.json(), (req: any, res: any) => {

  let cNew = new Competicion(
    competiciones.length + 1,
    req.body.lugar,
    req.body.competiciones
  );
  competiciones.push(cNew);
  res.status(200).send({ 
    id: cNew.id,
    title: cNew.lugar,
    categories: cNew.competiciones,
   });
 
})

app.get('/', (req: any, res: any) => {
  res.send('The URL of competiciones is http://localhost:8000/competiciones');
});

app.get('/competiciones', (req: any, res: any) => {
  res.json(getCompeticiones());
});


function getCompeticionesById(competicionId: number): any {
  let c: any;
  c = competiciones.find(c => c.id == competicionId);
  return c;
}

app.get('/competiciones/:id', (req: any, res: any) => {
  res.json(getCompeticionesById(parseInt(req.params.id)));
});



function updateCompeticionesById(req:any, competicionId: number): any {
  let c: any;
  c = competiciones.find(c => c.id == competicionId);
  let index = competiciones.indexOf(c);

  c.lugar =  req.body.lugar,
  c.competiciones =  req.body.competiciones,
  
  competiciones[index] = c;
  return c;
}

app.put('/competiciones/:id', function (req:any, res:any) {
  res.json(updateCompeticionesById(req, parseInt(req.params.id)));
  res.send('Got a UPDATE request at /user');
});


function deleteCompeticionesById(competicionId: number): any {
  let c: any;
  c = competiciones.find(c => c.id == competicionId);
  let index = competiciones.indexOf(c);
  delete competiciones[index];
  return c;
}

app.delete('/competiciones/:id', function (req:any, res:any) {
  res.json(deleteCompeticionesById(parseInt(req.params.id)));
  res.send('Got a DELETE request at /user');
});



const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});




