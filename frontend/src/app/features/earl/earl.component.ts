import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarlMood } from '../../core/models/refusal-response.model';

@Component({
  selector: 'app-earl',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earl.component.html',
  styleUrl: './earl.component.scss'
})
export class EarlComponent {
  mood = input<EarlMood>('mildly_annoyed' as EarlMood);
  isShaking = input<boolean>(false);

  earlClass = computed(() => {
    const classes = ['earl-wrapper'];
    if (this.isShaking()) classes.push('earl-shaking');
    classes.push(`earl-mood-${this.mood()}`);
    return classes.join(' ');
  });

  mouthPath = computed(() => {
    const paths: Record<EarlMood, string> = {
      mildly_annoyed:             'M 82 136 Q 100 140 118 136',
      deeply_offended:            'M 78 142 Q 100 132 122 142',
      dramatically_outraged:      'M 72 148 Q 100 128 128 148',
      existentially_disappointed: 'M 80 138 L 120 138'
    };
    return paths[this.mood()] ?? paths['mildly_annoyed'];
  });

  leftEyePath = computed(() => {
    if (this.mood() === 'dramatically_outraged') return 'M 80 114 L 90 108 L 80 108';
    if (this.mood() === 'existentially_disappointed') return 'M 82 114 L 88 118 L 82 118';
    return null;
  });

  rightEyePath = computed(() => {
    if (this.mood() === 'dramatically_outraged') return 'M 120 114 L 110 108 L 120 108';
    if (this.mood() === 'existentially_disappointed') return 'M 118 114 L 112 118 L 118 118';
    return null;
  });

  steamVisible = computed(() => this.mood() !== 'existentially_disappointed');

  earlColor = computed(() => {
    const colors: Record<EarlMood, string> = {
      mildly_annoyed:             '#b8860b',
      deeply_offended:            '#cd853f',
      dramatically_outraged:      '#c0392b',
      existentially_disappointed: '#6b5a3e'
    };
    return colors[this.mood()] ?? '#b8860b';
  });
}
