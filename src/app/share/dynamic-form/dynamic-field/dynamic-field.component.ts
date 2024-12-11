import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  OnInit,
  Injector,
  Type,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss'],
  standalone: false,
})
export class DynamicFieldComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() name!: string;
  @Input() config: any;

  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer!: ViewContainerRef;
  private componentCache = new Map<string, Type<any>>();

  constructor(private injector: Injector) {}

  async ngOnInit() {
    const componentType = await this.loadFieldComponent(
      this.config.widget.type
    );
    const componentRef = this.fieldContainer.createComponent(componentType, {
      injector: this.injector,
    });

    // Pass inputs to the dynamically created component
    componentRef.instance.form = this.form;
    componentRef.instance.fieldName = this.name;
    componentRef.instance.fieldConfig = this.config;
  }

  async loadFieldComponent(fieldType: string): Promise<Type<any>> {
    if (this.componentCache.has(fieldType)) {
      return this.componentCache.get(fieldType)!;
    }

    let component: Type<any>;

    switch (fieldType) {
      case 'text':
        component = (await import('../../../components/input/input.component'))
          .InputComponent;
        break;
      case 'select':
        component = (
          await import('../../../components/select/select.component')
        ).SelectComponent;
        break;
      case 'date':
        component = (
          await import('../../../components/datepicker/datepicker.component')
        ).DatepickerComponent;
        break;
      case 'textarea':
        component = (
          await import('../../../components/textarea/textarea.component')
        ).TextareaComponent;
        break;
      case 'checkbox':
        component = (
          await import('../../../components/checkbox/checkbox.component')
        ).CheckboxComponent;
        break;
      default:
        throw new Error(`Unknown field type: ${fieldType}`);
    }

    this.componentCache.set(fieldType, component);
    return component;
  }
}
