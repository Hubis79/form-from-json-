import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { FormSchema } from 'src/app/models/main.model';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  constructor(private http: HttpClient) {}

  loadSchema(): Observable<FormSchema | null> {
    return this.http.get('./assets/schema.json', { responseType: 'text' }).pipe(
      map((data) => {
        try {
          const parsedData: FormSchema = JSON.parse(data);
          console.log('Schema parsed and loaded successfully:', parsedData);
          return parsedData;
        } catch (error) {
          console.error('Error parsing schema JSON:', error);
          return null; // Reset schema to null if parsing fails
        }
      }),
      catchError((err) => {
        console.error('Error loading schema:', err);
        return of(null); // Return null if an error occurs
      })
    );
  }
}
