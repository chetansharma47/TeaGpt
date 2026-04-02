import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { switchMap, finalize } from 'rxjs/operators';
import { BrewService } from '../../core/services/brew.service';
import { ScheduleService } from '../../core/services/schedule.service';
import { RefusalCounterService } from '../../core/services/refusal-counter.service';

@Component({
  selector: 'app-urgent-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './urgent-button.component.html',
  styleUrl: './urgent-button.component.scss'
})
export class UrgentButtonComponent {
  selectedCoffee = input<string>('Coffee (unspecified)');

  private brewService    = inject(BrewService);
  private scheduleService = inject(ScheduleService);
  private counter        = inject(RefusalCounterService);

  loading = signal(false);
  meetingLink = signal<string | null>(null);
  earlMessage = signal<string | null>(null);

  onUrgentClick(): void {
    if (this.loading()) return;
    this.loading.set(true);
    this.meetingLink.set(null);

    this.brewService.urgent({
      coffeeType: this.selectedCoffee(),
      isUrgent: true,
      shakeIntensity: 10
    }).pipe(
      switchMap(refusal => {
        this.counter.increment();
        this.earlMessage.set(refusal.message);
        return this.scheduleService.scheduleMeeting({
          coffeeType: this.selectedCoffee(),
          orderNumber: refusal.orderNumber
        });
      }),
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: response => {
        this.meetingLink.set(response.meetingLink);
      },
      error: () => {
        this.earlMessage.set('Earl has refused so hard he broke the internet. Try again.');
      }
    });
  }
}
