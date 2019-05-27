import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatTreeModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatTreeModule, MatInputModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatTableModule, MatTreeModule, MatInputModule
  ]
})
export class MaterialModule { }
