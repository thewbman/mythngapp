import { Program } from '../classes/program';
import { RecordedProgramResponse, UpcomingProgramResponse, ConflictProgramResponse, ProgramGuideResponse } from '../classes/api-responses';
import { MOCK_RECORDED_RESPONSE, MOCK_CONFLICT_RESPONSE, MOCK_UPCOMING_RESPONSE, MOCK_GUIDE_RESPONSE, MOCK_GUIDE_RESPONSE_2, MOCK_PROGRAMDETAILS_RESPONSE } from '../classes/mock-data';
import { MOCK_STATUSXML_RESPONSE } from '../classes/mock-statusxml';
import { MessageService } from './message.service';
import { CookieService } from './cookie.service';

import { environment } from '../../environments/environment';

import { WINDOW } from '../window.provider';

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

  baseUrlOverride: string;		//want to leave undefined, but can set during testing

  //Persist data in service so dont need to reload on each router change for Recorded and Upcoming; all others reload each time
  private myRecordeds: RecordedProgramResponse;
  private myUpcoming: UpcomingProgramResponse;

  constructor(@Inject(WINDOW) private window: Window, private mesService: MessageService, private http: HttpClient, private cookieService: CookieService) {
    //this.baseUrlOverride = '/assets/mock';
  }

  getConflictsUrl(): Observable<ConflictProgramResponse> {
    if(this.useMockData()) {
      return of(MOCK_CONFLICT_RESPONSE);
    }
    else {
      return this.http.get<ConflictProgramResponse>(this.conflictUrl())
        .pipe(
          tap(_ => this.log('fetched conflict')),
          catchError(this.handleError<ConflictProgramResponse>('getConflictsUrl'))
        );
    }
  }

  getRecordedsUrl(): Observable<RecordedProgramResponse> {
    //if cache data send it
    if(this.myRecordeds) {
      return of(this.myRecordeds);
    }
    if(this.useMockData()) {
      return of(MOCK_RECORDED_RESPONSE);
    }
    else {
      return this.http.get<RecordedProgramResponse>(this.recordedUrl())
        .pipe(
          tap(_ => this.log('fetched recorded')),
          catchError(this.handleError<RecordedProgramResponse>('getRecordedsUrl'))
        );
    }
  }

  getUpcomingUrl(): Observable<UpcomingProgramResponse> {
    //if cache data send it
    if(this.myUpcoming) {
      return of(this.myUpcoming);
    }
    if(this.useMockData()) {
      return of(MOCK_UPCOMING_RESPONSE);
    }
    else {
      return this.http.get<UpcomingProgramResponse>(this.upcomingUrl())
        .pipe(
          tap(_ => this.log('fetched upcoming')),
          catchError(this.handleError<UpcomingProgramResponse>('getUpcomingUrl'))
        );
    }
  }

  getGuideUrl(startTime: string, endTime: string, chanId: string): Observable<ProgramGuideResponse> {
    if(this.useMockData()) {
      if(( typeof chanId === undefined ) || (chanId === null)) {
        return of(MOCK_GUIDE_RESPONSE);
      } 
      else {
        return of(MOCK_GUIDE_RESPONSE_2);
      }
    }
    else {
      return this.http.get<ProgramGuideResponse>(this.guideUrl(startTime, endTime, chanId))
        .pipe(
          tap(_ => this.log('fetched guide')),
          catchError(this.handleError<ProgramGuideResponse>('getGuideUrl'))
        );
    }
  }

  getProgramDetailsUrl(chanId: string, startTime: string): Observable<Program> {
    if(this.useMockData()) {
      return of(MOCK_PROGRAMDETAILS_RESPONSE);
    }
    else {
        return this.http.get<Program>(this.programDetailsUrl(chanId, startTime))
        .pipe(
          tap(_ => this.log('fetched program details')),
          catchError(this.handleError<Program>('getProgramDetailsUrl'))
        );
    }
  }

  getStatusUrl(): Observable<string> {
    if(this.useMockData()) {
      return of(MOCK_STATUSXML_RESPONSE);
    }
    else {
      return this.http.get(this.statusUrl(), {responseType: 'text'})
        .pipe(
          tap(_ => this.log('fetched status')),
          catchError(this.handleError<string>('getStatusUrl'))
        );
    }
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
    if(this.useMockData()) {
      return './assets/mythtv.png';
    }
    else {
      return this.baseUrl() + '/Content/GetPreviewImage'+this.firstSeperator()+'ChanId=' + rec.Channel.ChanId + '&StartTime=' + rec.Recording.StartTs;
    }
  }
  getPreviewImageUrlHeight(rec: Program, ht: number) {
    if(this.useMockData()) {
      return './assets/mythtv.png';
    }
    else {
      return this.getPreviewImageUrl(rec) + '&Height=' + ht.toString();
    }
  }
  getPreviewImageUrlWidth(rec: Program, wd: number) {
    if(this.useMockData()) {
      return './assets/mythtv.png';
    }
    else {
      return this.getPreviewImageUrl(rec) + '&Width=' + wd.toString();
    }
  }

  getChannelIcon(iconUrl: string) {
    if(this.useMockData()) {
      return './assets/channelIcon.jpg';
    }
    else {
      return this.baseUrl() + iconUrl;
    }
  }


  useMockData() {
    if(this.baseUrl() === environment.defaultRootUrl) {
      return true;
    } 
    else if(this.baseUrl() === "") {
      return true;
    }
    else {
      return false;
    }
  }



  baseUrl() {
    return this.baseUrlOverride ? this.baseUrlOverride : this.cookieService.get('rootApiUrl');
  }
  firstSeperator() {
    if(this.baseUrl().includes("?")) {
      return "&";
    }
    else {
      return "?";
    }
  }
  conflictUrl() {
    return this.baseUrl() + '/Dvr/GetConflictList';
  }
  recordedUrl() {
    return this.baseUrl() + '/Dvr/GetRecordedList';  // &Count=10';
  }
  upcomingUrl() {
    return this.baseUrl() + '/Dvr/GetUpcomingList'+this.firstSeperator()+'ShowAll=true&Count=10000';
  }
  guideUrl(startTime: string, endTime: string, chanId: string) {
    if (( typeof chanId === undefined ) || (chanId === null)) {
      return this.baseUrl() + '/Guide/GetProgramGuide'+this.firstSeperator()+'Details=false&StartTime=' + startTime + '&EndTime=' + endTime;
    } else {
      return this.baseUrl() + '/Guide/GetProgramList'+this.firstSeperator()+'Details=false&StartTime=' + startTime + '&EndTime=' + endTime + '&ChanId=' + chanId;
    }
  }
  programDetailsUrl(chanId: string, startTime: string) {
    return this.baseUrl() + '/Guide/GetProgramDetails'+this.firstSeperator()+'StartTime=' + startTime + '&ChanId=' + chanId;
  }
  statusUrl() {
    return this.baseUrl() + '/Status/xml';
  }

  storeMyRecordeds(myData: RecordedProgramResponse) {
    this.myRecordeds = myData;
  }
  storeMyUpcoming(myData: UpcomingProgramResponse) {
    this.myUpcoming = myData;
  }

  private log(message: string) {
    this.mesService.add(`MythDataService: ${message}`);
  }
}
