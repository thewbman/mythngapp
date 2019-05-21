import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

import { NgModule } from '@angular/core';



@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatInputModule],
})
export class MaterialModule { }
