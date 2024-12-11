import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFieldComponent } from './dynamic-form/dynamic-field/dynamic-field.component';

@NgModule({
  declarations: [DynamicFormComponent, DynamicFieldComponent],
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  exports: [
    DynamicFormComponent,
    DynamicFieldComponent,
    MatCardModule,
    MatButtonModule,
  ],
})
export class ShareModule {}
