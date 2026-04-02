import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeCardComponent } from '../coffee-card/coffee-card.component';
import { CoffeeItem, COFFEE_MENU } from '../../core/models/coffee-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CoffeeCardComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  loadingItemId = input<string | null>(null);
  orderPlaced = output<CoffeeItem>();

  readonly menuItems = COFFEE_MENU;

  onOrder(item: CoffeeItem): void {
    this.orderPlaced.emit(item);
  }
}
