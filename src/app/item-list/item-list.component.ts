import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  cartItems: CartItem[] = [
    { id: '1', name: 'Apple iPhone 14', price: 999, quantity: 1 },
    { id: '2', name: 'Samsung Galaxy S23', price: 899, quantity: 2 },
    { id: '3', name: 'Google Pixel 7', price: 699, quantity: 1 },
    { id: '4', name: 'OnePlus 11', price: 799, quantity: 1 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }

  increaseQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  moveItemUp(index: number): void {
    if (index > 0) {
      const temp = this.cartItems[index];
      this.cartItems[index] = this.cartItems[index - 1];
      this.cartItems[index - 1] = temp;
    }
  }

  moveItemDown(index: number): void {
    if (index < this.cartItems.length - 1) {
      const temp = this.cartItems[index];
      this.cartItems[index] = this.cartItems[index + 1];
      this.cartItems[index + 1] = temp;
    }
  }

  drop(event: CdkDragDrop<CartItem[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.cartItems, event.previousIndex, event.currentIndex);
    }
  }
}