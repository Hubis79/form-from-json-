import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormGeneratorService {
  constructor(private fb: FormBuilder) {}

  public generateForm(schema: any): FormGroup | null {
    const group: any = {};

    if (schema) {
      for (const key in schema.properties) {
        if (schema.properties.hasOwnProperty(key)) {
          const field = schema.properties[key];
          const validators = [];

          // Add required validator if field is required
          if (schema.required?.includes(key)) {
            validators.push(Validators.required);
          }

          // Add pattern validator if field has a pattern
          if (field.pattern) {
            validators.push(Validators.pattern(new RegExp(field.pattern)));
          }

          group[key] = this.fb.control('', validators);
        }
      }

      return this.fb.group(group);
    }

    return null;
  }
}
