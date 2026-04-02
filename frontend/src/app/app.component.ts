import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EarlComponent } from './features/earl/earl.component';
import { MenuComponent } from './features/menu/menu.component';
import { RefusalModalComponent } from './features/refusal-modal/refusal-modal.component';
import { StatsBarComponent } from './features/stats-bar/stats-bar.component';
import { CaptchaSliderComponent } from './features/captcha-slider/captcha-slider.component';
import { UrgentButtonComponent } from './features/urgent-button/urgent-button.component';

import { BrewService } from './core/services/brew.service';
import { ScheduleService } from './core/services/schedule.service';
import { RefusalCounterService } from './core/services/refusal-counter.service';
import { ShakeDetectorService } from './core/services/shake-detector.service';

import { CoffeeItem } from './core/models/coffee-item.model';
import { EarlMood, RefusalResponse } from './core/models/refusal-response.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    EarlComponent,
    MenuComponent,
    RefusalModalComponent,
    StatsBarComponent,
    CaptchaSliderComponent,
    UrgentButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private brewService    = inject(BrewService);
  private scheduleService = inject(ScheduleService);
  private counter        = inject(RefusalCounterService);
  shakeDetector          = inject(ShakeDetectorService);

  // App state signals
  showModal          = signal(false);
  currentRefusal     = signal<RefusalResponse | null>(null);
  currentMood        = signal<EarlMood>('mildly_annoyed');
  lastOrderedCoffee  = signal('Coffee');
  loadingItemId      = signal<string | null>(null);
  meetingLink        = signal<string | null>(null);

  private readonly moodProgression: EarlMood[] = [
    'mildly_annoyed',
    'deeply_offended',
    'dramatically_outraged',
    'existentially_disappointed'
  ];

  constructor() {
    // Escalate Earl's mood when phone is shaken
    effect(() => {
      if (this.shakeDetector.isShaking()) {
        this.escalateMood();
      }
    });
  }

  ngOnInit(): void {
    this.shakeDetector.startListening();
  }

  onOrder(item: CoffeeItem): void {
    if (this.loadingItemId()) return;
    this.loadingItemId.set(item.id);
    this.lastOrderedCoffee.set(item.name);
    this.meetingLink.set(null);

    this.brewService.brew({
      coffeeType: item.name,
      isUrgent: false,
      shakeIntensity: this.shakeDetector.shakeIntensity()
    }).subscribe({
      next: refusal => {
        this.currentRefusal.set(refusal);
        this.currentMood.set(refusal.earlMood as EarlMood);
        this.counter.increment();
        this.showModal.set(true);
        this.loadingItemId.set(null);
      },
      error: () => {
        this.loadingItemId.set(null);
      }
    });
  }

  onScheduleMeeting(): void {
    const refusal = this.currentRefusal();
    if (!refusal) return;

    this.scheduleService.scheduleMeeting({
      coffeeType: this.lastOrderedCoffee(),
      orderNumber: refusal.orderNumber
    }).subscribe({
      next: response => {
        this.meetingLink.set(response.meetingLink);
        window.open(response.meetingLink, '_blank', 'noopener');
      }
    });
  }

  private escalateMood(): void {
    const current = this.moodProgression.indexOf(this.currentMood());
    if (current < this.moodProgression.length - 1) {
      this.currentMood.set(this.moodProgression[current + 1]);
    }
  }
}
