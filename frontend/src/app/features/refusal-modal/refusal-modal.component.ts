import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { RefusalResponse, STYLE_LABELS, EARL_MOOD_LABELS } from '../../core/models/refusal-response.model';

@Component({
  selector: 'app-refusal-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refusal-modal.component.html',
  styleUrl: './refusal-modal.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.96)' }),
        animate('280ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.97)' }))
      ])
    ])
  ]
})
export class RefusalModalComponent {
  refusal = input<RefusalResponse | null>(null);
  close = output<void>();
  scheduleClicked = output<void>();

  styleLabel = computed(() => {
    const style = this.refusal()?.style ?? 'dramatic';
    return STYLE_LABELS[style] ?? 'Dramatically';
  });

  moodInfo = computed(() => {
    const mood = this.refusal()?.earlMood;
    if (!mood) return null;
    return EARL_MOOD_LABELS[mood] ?? null;
  });
}
