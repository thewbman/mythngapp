import { Program } from './program';
import { MOCK_RECORDED } from './mock-recorded';
import { MessageService } from './message.service';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RecordedService {

  private recordedUrl = 'api/heroes';  // URL to web api


  constructor(private mesService: MessageService, private http: HttpClient) { }

  getRecordeds(): Observable<Program[]> {
	this.log('RecordedService: fetched recorded');
	return of(MOCK_RECORDED);

	return this.http.get<Program[]>(this.recordedUrl)
      .pipe(
        tap(_ => this.log('fetched recorded')),
        catchError(this.handleError('getRecordeds', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  private log(message: string) {
    this.mesService.add(`HeroService: ${message}`);
  }
}
