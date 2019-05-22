import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatTreeModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

import { NgModule } from '@angular/core';



@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatTreeModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatTreeModule, MatInputModule],
})
export class MaterialModule { }
