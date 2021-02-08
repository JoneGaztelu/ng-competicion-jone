import { Component, OnInit } from '@angular/core';
import { CompeticionService } from '..//shared/competicion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id : any;

  constructor(private competicionService: CompeticionService, private router: Router) { }

  ngOnInit() {
  }

  newCompeticion(){
      // Get max product Id from the product list
      this.competicionService.getMaxCompeticionId().subscribe(data =>{
        this.id = data;
        this.router.navigate(['/competicions', this.id, 'new']);
      }

        
      );
      
  }

}
