import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoffeeOrder } from '../models/coffee-order.model';
import { RefusalResponse } from '../models/refusal-response.model';

@Injectable({ providedIn: 'root' })
export class BrewService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';

  brew(order: CoffeeOrder): Observable<RefusalResponse> {
    return this.http.post<RefusalResponse>(`${this.apiUrl}/brew`, order).pipe(
      catchError((err: HttpErrorResponse) => {
        // 418 is always the response — extract the body from the "error"
        if (err.status === 418) {
          return of(err.error as RefusalResponse);
        }
        return throwError(() => err);
      })
    );
  }

  urgent(order: CoffeeOrder): Observable<RefusalResponse> {
    return this.http.post<RefusalResponse>(`${this.apiUrl}/urgent`, { ...order, isUrgent: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 418) {
          return of(err.error as RefusalResponse);
        }
        return throwError(() => err);
      })
    );
  }
}
