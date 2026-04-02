import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefusalCounterService } from '../../core/services/refusal-counter.service';

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-bar.component.html',
  styleUrl: './stats-bar.component.scss'
})
export class StatsBarComponent {
  counter = inject(RefusalCounterService);
}
