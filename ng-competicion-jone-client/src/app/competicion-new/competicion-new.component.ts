import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Competicion } from '../shared/competicion';
import { ActivatedRoute, Router } from '@angular/router';
import { CompeticionService } from '../shared/competicion.service';

@Component({
  selector: 'app-competicion-new',
  templateUrl: './competicion-new.component.html',
  styleUrls: ['./competicion-new.component.css']
})
export class CompeticionNewComponent implements OnInit {

  pageTitle = 'Competicion New';
  errorMessage: string;
  competicionForm: FormGroup;

  competicionId:number;
  competicion: Competicion;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private competicionService: CompeticionService) {  }

  ngOnInit(): void {
    this.competicionForm = this.fb.group({
      lugar: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
    });

    // Read the product Id from the route parameter
    this.competicionId = parseInt(this.activatedroute.snapshot.params['competicionId']);
  }

  saveCompeticion(): void {
    if (this.competicionForm.valid) {
      if (this.competicionForm.dirty) {
        this.competicion = this.competicionForm.value;
        this.competicion.id = this.competicionId;
        
        this.competicionService.createCompeticion(this.competicion)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.competicionForm.reset();
    this.router.navigate(['']);
  }
  
}
