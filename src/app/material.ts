import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule} from '@angular/material';

import { NgModule } from '@angular/core';



@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule],
})
export class MaterialModule { }
