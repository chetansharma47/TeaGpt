import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShakeDetectorService {
  readonly shakeIntensity = signal<number>(0);
  readonly isShaking = signal<boolean>(false);

  private readonly threshold = 15; // m/s²
  private lastShakeTime = 0;

  startListening(): void {
    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) return;

    // iOS 13+ requires explicit permission
    const dme = DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof dme.requestPermission === 'function') {
      dme.requestPermission().then((state: string) => {
        if (state === 'granted') this.attachListener();
      }).catch(() => { /* permission denied — shake feature unavailable */ });
    } else {
      this.attachListener();
    }
  }

  private attachListener(): void {
    window.addEventListener('devicemotion', (event: DeviceMotionEvent) => {
      const acc = event.acceleration;
      if (!acc) return;

      const total = Math.sqrt(
        Math.pow(acc.x ?? 0, 2) +
        Math.pow(acc.y ?? 0, 2) +
        Math.pow(acc.z ?? 0, 2)
      );

      if (total > this.threshold) {
        const now = Date.now();
        if (now - this.lastShakeTime > 500) {
          this.lastShakeTime = now;
          const intensity = Math.min(10, Math.round(total / 3));
          this.shakeIntensity.set(intensity);
          this.isShaking.set(true);
          setTimeout(() => this.isShaking.set(false), 1000);
        }
      }
    });
  }
}
