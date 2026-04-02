import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RefusalCounterService {
  private readonly STORAGE_KEY = 'teagpt_refusal_count';
  readonly count = signal<number>(this.loadCount());

  increment(): void {
    const next = this.count() + 1;
    this.count.set(next);
    localStorage.setItem(this.STORAGE_KEY, String(next));
  }

  reset(): void {
    this.count.set(0);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private loadCount(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  }
}
