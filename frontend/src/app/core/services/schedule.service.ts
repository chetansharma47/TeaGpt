import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ScheduleMeetingRequest {
  coffeeType: string;
  orderNumber: number;
}

export interface ScheduleMeetingResponse {
  meetingLink: string;
  eventId: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';

  scheduleMeeting(request: ScheduleMeetingRequest): Observable<ScheduleMeetingResponse> {
    return this.http.post<ScheduleMeetingResponse>(`${this.apiUrl}/schedule-meeting`, request);
  }
}
