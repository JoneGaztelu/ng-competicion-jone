import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Competicion } from './competicion';

@Injectable({
  providedIn: 'root'
})
export class CompeticionService {
  private competicionesUrl = 'localhost:8000/competiciones';

  constructor(private http: HttpClient) { }

  getCompeticiones(): Observable<Competicion[]> {
    return this.http.get<Competicion[]>(this.competicionesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxCompeticionId(): Observable<Competicion> {
    return this.http.get<Competicion[]>(this.competicionesUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getCompeticionById(id: number): Observable<Competicion> {
    const url = `${this.competicionesUrl}/${id}`;
    return this.http.get<Competicion>(url)
      .pipe(
        tap(data => console.log('getcompeticiones: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCompeticion(competicion: Competicion): Observable<Competicion> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    competicion.id = null;
    return this.http.post<Competicion>(this.competicionesUrl, competicion, { headers: headers })
      .pipe(
        tap(data => console.log('createCompeticion: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteCompeticion(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.competicionesUrl}/${id}`;
    return this.http.delete<Competicion>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteCompeticion: ' + id)),
        catchError(this.handleError)
      );
  }

  updateCompeticion(competicion: Competicion): Observable<Competicion> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.competicionesUrl}/${competicion.id}`;
    return this.http.put<Competicion>(url, competicion, { headers: headers })
      .pipe(
        tap(() => console.log('updateCompeticion: ' + competicion.id)),
        // Return the competicion on an update
        map(() => competicion),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
