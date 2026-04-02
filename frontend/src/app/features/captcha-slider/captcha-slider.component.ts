import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-captcha-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha-slider.component.html',
  styleUrl: './captcha-slider.component.scss'
})
export class CaptchaSliderComponent {
  a = signal(Math.ceil(Math.random() * 9));
  b = signal(Math.ceil(Math.random() * 9));
  captchaSolved = signal(false);
  captchaFailed = signal(false);
  failCount = signal(0);
  volume = signal(50);
  userAnswer = '';

  checkCaptcha(): void {
    const answer = parseInt(this.userAnswer, 10);
    if (answer === this.a() * this.b()) {
      this.captchaSolved.set(true);
      this.captchaFailed.set(false);
    } else {
      this.captchaFailed.set(true);
      this.failCount.update(n => n + 1);
      // Regenerate with harder numbers after failures
      const max = Math.min(9, 4 + this.failCount());
      this.a.set(Math.ceil(Math.random() * max));
      this.b.set(Math.ceil(Math.random() * max));
      this.userAnswer = '';
    }
  }

  onVolumeChange(event: Event): void {
    this.volume.set(+(event.target as HTMLInputElement).value);
  }

  failMessage = (): string => {
    const n = this.failCount();
    if (n >= 5) return 'Earl has generated a harder problem. You have disappointed him.';
    if (n >= 3) return 'Still wrong. Earl questions your mathematical abilities.';
    if (n >= 1) return 'Incorrect. Earl is judging you.';
    return '';
  };
}
