import {Component, OnInit} from '@angular/core';
import {CompeticionService} from '../shared/competicion.service';
import {Competicion} from '../shared/competicion';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-competicion-detail',
  templateUrl: './competicion-detail.component.html',
  styleUrls: ['./competicion-detail.component.css']
})
export class CompeticionDetailComponent implements OnInit {

  competicion: Competicion;
  competicionId: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private competicionService: CompeticionService) {}

  ngOnInit() {
    this.competicionId = parseInt(this.activatedroute.snapshot.params['competicionId']);
    this.competicionService.getCompeticionById(this.competicionId).subscribe(
      (data: Competicion) => this.competicion = data
    );
  }
  goEdit():void{
    this.router.navigate(['/competicions', this.competicionId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }

}