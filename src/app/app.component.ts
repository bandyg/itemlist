import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ItemList App';
  currentView: string = 'welcome';

  showWelcome() {
    this.currentView = 'welcome';
  }

  showItemList() {
    this.currentView = 'itemList';
  }

  showNotice() {
    this.currentView = 'notice';
  }

  onNoticeOk() {
    console.log('Notice settings updated');
    this.showWelcome();
  }
}
