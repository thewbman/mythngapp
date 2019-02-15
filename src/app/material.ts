import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule,MatTabsModule} from '@angular/material';

import { NgModule } from '@angular/core';



@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule,MatTabsModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule,MatTabsModule],
})
export class MaterialModule { }
