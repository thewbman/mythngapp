import { Component, OnInit } from '@angular/core';
import { CookieService } from '../cookie.service';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public _rootApiUrl: string;

  constructor(private cookieService: CookieService) {
   this._rootApiUrl = cookieService.get('rootApiUrl');
 }

  ngOnInit() {
  }

  onClickSave(): void {
    this.cookieService.setWithExpiryInYears('rootApiUrl', this._rootApiUrl, 1);
  }

}
