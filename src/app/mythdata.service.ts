import { Program } from './classes/program';
import { RecordedProgramResponse, UpcomingProgramResponse,ConflictProgramResponse } from './classes/recordedProgramResponse';
import { MOCK_RECORDED, MOCK_RECORDED_RESPONSE } from './classes/mock-recorded';
import { MessageService } from './message.service';
import { CookieService } from './cookie.service';

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
export class MythDataService {

  constructor(@Inject(WINDOW) private window: Window, private mesService: MessageService, private http: HttpClient, private cookieService: CookieService) {  }

  getRecordeds(): Observable<Program[]> {
    this.log('RecordedService: fetched recorded');
    return of(MOCK_RECORDED_RESPONSE.ProgramList.Programs);

    // return this.getRecordedsUrl().ProgramList.Programs;
  }

 getConflictsUrl(): Observable<ConflictProgramResponse> {
    return this.http.get<ConflictProgramResponse>(this.conflictUrl())
      .pipe(
        tap(_ => this.log('fetched conflict')),
        catchError(this.handleError<ConflictProgramResponse>('getConflictsUrl'))
      );
  }

  getRecordedsUrl(): Observable<RecordedProgramResponse> {
    return this.http.get<RecordedProgramResponse>(this.recordedUrl())
      .pipe(
        tap(_ => this.log('fetched recorded')),
        catchError(this.handleError<RecordedProgramResponse>('getRecordedsUrl'))
      );
  }

  getUpcomingUrl(): Observable<UpcomingProgramResponse> {
    return this.http.get<UpcomingProgramResponse>(this.upcomingUrl())
      .pipe(
        tap(_ => this.log('fetched upcoming')),
        catchError(this.handleError<UpcomingProgramResponse>('getUpcomingUrl'))
      );
  }

  getStatusUrl(): Observable<string> {
    return this.http.get(this.statusUrl(), {responseType: 'text'})
      .pipe(
        tap(_ => this.log('fetched status')),
        catchError(this.handleError<string>('getStatusUrl'))
      );
  }
  getStatusHtmlUrl(): Observable<string> {
    return this.http.get(this.statusHtmlUrl(), {responseType: 'text'})
      .pipe(
        tap(_ => this.log('fetched status thml')),
        catchError(this.handleError<string>('getStatusHtmlUrl'))
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

  getPreviewImageUrl(rec: Program) {
    return this.baseUrl() + '/Content/GetPreviewImage&ChanId=' + rec.Channel.ChanId + '&StartTime=' + rec.Recording.StartTs;
  }
  getPreviewImageUrlHeight(rec: Program, ht: number) {
    return this.getPreviewImageUrl(rec) + '&Height=' + ht.toString();
  }
  getPreviewImageUrlWidth(rec: Program, wd: number) {
    return this.getPreviewImageUrl(rec) + '&Width=' + wd.toString();
  }

  baseUrl() {
    return this.cookieService.get('rootApiUrl');
  }

  conflictUrl() {
    return this.baseUrl() + '/Dvr/GetConflictList'; 
  }
  recordedUrl() {
    return this.baseUrl() + '/Dvr/GetRecordedList';  // &Count=10';
  }
  upcomingUrl() {
    return this.baseUrl() + '/Dvr/GetUpcomingList&ShowAll=true&Count=10000';
  }
  statusUrl() {
    return this.baseUrl() + '/Status/xml';
  }
  statusHtmlUrl() {
    return this.baseUrl() + '/Status/GetStatusHTML';
  }


  private log(message: string) {
    this.mesService.add(`MythDataService: ${message}`);
  }
}
