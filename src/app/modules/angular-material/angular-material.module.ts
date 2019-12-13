import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatStepperModule,
  MatButtonModule,
  MatTooltipModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatCheckboxModule,
  MatMenuModule,
  MatDialogModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatPaginatorModule,
  MatChipsModule,
  MatSliderModule,
  MatTreeModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ]
})
export class AngularMaterialModule { }
