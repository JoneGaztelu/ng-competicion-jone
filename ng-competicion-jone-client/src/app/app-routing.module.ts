import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompeticionDetailComponent } from './competicion-detail/competicion-detail.component';
import { CompeticionEditComponent } from './competicion-edit/competicion-edit.component';
import { CompeticionNewComponent } from './competicion-new/competicion-new.component';

const routes: Routes = [
    {path: '',                    component: HomeComponent},
    {path: 'competicions/:id/new', component: CompeticionNewComponent},
    {path: 'competicions/:competicionId', component: CompeticionDetailComponent},
    {path: 'competicions/:id/edit', component: CompeticionEditComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ], 
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
