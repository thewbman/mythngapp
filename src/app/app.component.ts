import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

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

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

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
}
