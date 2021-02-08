import {Component, OnInit} from '@angular/core';
import {Competicion} from '../shared/competicion';
import {CompeticionService} from '../shared/competicion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  competicions: Competicion[]=[];
  constructor(private competicionService: CompeticionService) { }

  ngOnInit() {
   this.competicionService.getCompeticiones().subscribe(
    (data: Competicion[]) => this.competicions = data
   );
  }
}













