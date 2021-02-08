import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Competicion } from '../shared/competicion';
import { CompeticionService } from '../shared/competicion.service';

@Component({
  templateUrl: './competicion-edit.component.html'
})
export class CompeticionEditComponent implements OnInit{

  pageTitle = 'Competicion Edit';
  errorMessage: string;
  competicionForm: FormGroup;

  competicionId:number;
  competicion: Competicion;
  tmpFechaRetorno: string;
  tmpFechaPartida: string;
  visualize: boolean;

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
    this.competicionId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getCompeticion(this.competicionId);
  }

  getCompeticion(id: number): void {
    this.competicionService.getCompeticionById(id)
      .subscribe(
        (competicion: Competicion) => {
          this.displayCompeticion(competicion)
          this.visualize = true;
        },
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayCompeticion(competicion: Competicion): void {
    if (this.competicionForm) {
      this.competicionForm.reset();
    }
    this.competicion = competicion;
    this.pageTitle = `Edit Competicion: ${this.competicion.lugar}`;



    // Update the data on the form
    this.competicionForm.patchValue({
      lugar: this.competicion.lugar,
      competiciones: this.competicion.competiciones
    });
  }

  deleteCompeticion(): void {
    if (this.competicion.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the competicion: ${this.competicion.lugar}?`)) {
        this.competicionService.deleteCompeticion(this.competicion.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveCompeticion(): void {
    if (this.competicionForm.valid) {
      if (this.competicionForm.dirty) {
        this.competicion = this.competicionForm.value;
        this.competicion.id = this.competicionId;
        
        this.competicionService.updateCompeticion(this.competicion)
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
