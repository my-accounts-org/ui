import { NgModule } from '@angular/core';
import * as Material from '@angular/material';

const material = [
  Material.MatButtonModule,
  Material.MatCardModule,
  Material.MatFormFieldModule,
  Material.MatSelectModule,
  Material.MatInputModule,
  Material.MatIconModule,
  Material.MatSidenavModule,
  Material.MatToolbarModule,
  Material.MatListModule,
  Material.MatGridListModule,
  Material.MatMenuModule,
  Material.MatTooltipModule,
  Material.MatDialogModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatCheckboxModule,
  Material.MatProgressSpinnerModule,
  Material.MatTableModule,
  Material.MatSortModule,
  Material.MatPaginatorModule,
  Material.MatRadioModule,
  Material.MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
