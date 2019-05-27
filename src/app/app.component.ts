import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

import { CookieService } from './cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild('drawer') drawer: MatSidenav;
  mobileQuery: MediaQueryList;
  _mobileQueryListener: any;
  title = 'Myth-ng App';
  private _rootApiUrl: string;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public cookieService: CookieService) {

  this._rootApiUrl = cookieService.get('rootApiUrl');
  if (this._rootApiUrl === '') {
    this.setCookie('http://myRootUrl:8080/api/api.php?Host=localhost&Port=6544&Url=');
  }

  this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);

  router.events.subscribe( (event: Event) => {

            if (event instanceof NavigationStart) {
                if (this.mobileQuery.matches) {
                  this.drawer.close();
                }
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator

                // Present error to user
                console.log(event.error);
            }
        });

    }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public setCookie(value: string) {
    this._rootApiUrl = value;
    this.cookieService.setWithExpiryInYears('rootApiUrl', value, 1);
  }

}
