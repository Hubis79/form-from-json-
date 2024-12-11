import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormSchema } from 'src/app/models/main.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: false,
})
export class DynamicFormComponent implements OnInit {
  @Input() schema: FormSchema | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  async ngOnInit(): Promise<any> {
    // Initialize the form group dynamically based on schema
    this.form = new FormGroup({});

    if (this.schema) {
      await this.buildForm();
    }
  }

  public getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('pattern')) {
      return 'Invalid format';
    }
    return '';
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Mark all controls as touched
      this.form.updateValueAndValidity(); // Trigger validation
      console.error('Form Invalid!');
      return;
    } else {
      // console.log('Form Group:', this.form);
      console.log('Form Data:', this.form.value);
    }
  }

  private async buildForm(): Promise<void> {
    // Iterate through schema properties and add form controls
    for (const key in this.schema?.properties) {
      if (this.schema.properties.hasOwnProperty(key)) {
        const fieldConfig = this.schema.properties[key];
        const pattern = fieldConfig?.pattern ?? null;

        // Combine required and pattern validators into an array
        const validators = [];
        if (this.schema.required?.includes(key)) {
          validators.push(Validators.required);
        }
        if (pattern) {
          validators.push(Validators.pattern(new RegExp(pattern)));
        }

        // Create a FormControl with initial value '' and combined validators
        const control = new FormControl('', validators);

        // Add the form control to the FormGroup
        this.form.addControl(key, control);
      }
    }
  }
}
