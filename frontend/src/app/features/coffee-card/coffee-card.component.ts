import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeItem } from '../../core/models/coffee-item.model';

@Component({
  selector: 'app-coffee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-card.component.html',
  styleUrl: './coffee-card.component.scss'
})
export class CoffeeCardComponent {
  item = input.required<CoffeeItem>();
  loading = input<boolean>(false);
  orderPlaced = output<CoffeeItem>();

  onOrder(): void {
    this.orderPlaced.emit(this.item());
  }
}
