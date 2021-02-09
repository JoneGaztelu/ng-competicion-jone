import {Component, Input} from '@angular/core';
import {Competicion} from '../shared/competicion';

@Component({
  selector: 'app-competicion-item',
  templateUrl: './competicion-item.component.html',
  styleUrls: ['./competicion-item.component.css']
})
export class CompeticionItemComponent {

  @Input() competicion: Competicion;
}
