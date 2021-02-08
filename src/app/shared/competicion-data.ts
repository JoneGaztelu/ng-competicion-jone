import { InMemoryDbService } from 'angular-in-memory-web-api';

export class CompeticionData implements InMemoryDbService {

  createDb() {
    let competiciones = [
      {
        "id": 0,
        "lugar": "Madrid",
        "competiciones":  ["Liga Nacional Cadetes y menores", "1 GP de España","1 Liga Nacional de Campo"],
      },
      {
        "id": 1,
        "lugar": "Pamplona",
        "competiciones":  ["Cto. España Sala","2 Liga Nacional de Campo"],
      },
      {
        "id": 2,
        "lugar": "Sevilla",
        "competiciones":  ["1 Liga Nacional 3D"],
      },
      {
        "id": 3,
        "lugar": "Tudela",
        "competiciones":  ["2 Liga Nacional 3D", "3 Liga Nacional de Campo"],
      },
      {
        "id": 4,
        "lugar": "Almeria",
        "competiciones":  ["Cto. España Aire Libre", "Cto. España Campo","Cto. España 3D"],
      },
      {
        "id": 5,
        "lugar": "Toledo",
        "competiciones":  ["2 GP España"],
      }
    ];
    return { competiciones: competiciones };
  }
}
