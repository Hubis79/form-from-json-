import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FormSchema } from 'src/app/models/main.model';
import { SchemaService } from 'src/app/share/sevices/schema.service';

@Component({
  selector: 'app-recruitment-form',
  templateUrl: './recruitment-form.component.html',
  styleUrls: ['./recruitment-form.component.scss'],
  standalone: false,
})
export class RecruitmentFormComponent implements OnInit {
  public schema$: Observable<FormSchema | null> = of(null);
  public schema: FormSchema | null = null;

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.loadSchema();
  }

  private loadSchema(): void {
    this.schemaService.loadSchema().subscribe((response) => {
      this.schema = response;
    });
  }
}
