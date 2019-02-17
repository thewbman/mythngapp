import { Program } from './program';
import { RecordedProgramResponse } from './recordedProgramResponse';
import { MOCK_RECORDED, MOCK_RECORDED_RESPONSE } from './mock-recorded';
import { MessageService } from './message.service';

import { WINDOW } from './window.provider';

import { Injectable, Inject } from '@angular/core';
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

  // Need a better way to get actual data, but for now
  private recordedUrl = 'http://' + this.window.location.hostname + ':8580/api/api.php?Host=localhost&Port=6544&Url=/Dvr/GetRecordedList';  // &Count=10';

  constructor(@Inject(WINDOW) private window: Window, private mesService: MessageService, private http: HttpClient) { }

  getRecordeds(): Observable<Program[]> {
    this.log('RecordedService: fetched recorded');
    return of(MOCK_RECORDED_RESPONSE.ProgramList.Programs);

    // return this.getRecordedsUrl().ProgramList.Programs;
  }

  getRecordedsUrl(): Observable<RecordedProgramResponse> {
    return this.http.get<RecordedProgramResponse>(this.recordedUrl)
      .pipe(
        tap(_ => this.log('fetched recorded')),
        catchError(this.handleError<RecordedProgramResponse>('getRecordedsUrl'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
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
    this.mesService.add(`RecordedService: ${message}`);
  }
}
