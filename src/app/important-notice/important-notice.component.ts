import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface NoticeItem {
  name: string;
  description: string;
  selected: boolean;
  seq: number;
}

@Component({
  selector: 'app-important-notice',
  templateUrl: './important-notice.component.html',
  styleUrls: ['./important-notice.component.css']
})
export class ImportantNoticeComponent implements OnInit {
  @Input() showModal: boolean = true;
  @Output() displayOk = new EventEmitter<void>();
  @Output() backEvent = new EventEmitter<void>();

  showOkBtn: boolean = false;
  
  title = {
    cn: '重要通知設定',
    en: 'Important Notice Settings'
  };

  noticeItems: NoticeItem[] = [
    {
      name: 'systemMaintenance',
      description: '系統維護通知',
      selected: true,
      seq: 1
    },
    {
      name: 'securityUpdate',
      description: '安全更新提醒',
      selected: false,
      seq: 2
    },
    {
      name: 'serviceAnnouncement', 
      description: '服務公告',
      selected: true,
      seq: 3
    },
    {
      name: 'emergencyNotice',
      description: '緊急通知',
      selected: true,
      seq: 4
    },
    {
      name: 'promotionInfo',
      description: '促銷資訊',
      selected: false,
      seq: 5
    }
  ];

  originalNoticeItems: NoticeItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.originalNoticeItems = JSON.parse(JSON.stringify(this.noticeItems));
  }

  switchChange(event: boolean, itemName: string): void {
    const item = this.noticeItems.find(i => i.name === itemName);
    if (item) {
      item.selected = event;
      this.checkForChanges();
    }
  }

  checkForChanges(): void {
    const hasChanges = this.noticeItems.some((item, index) => {
      const originalItem = this.originalNoticeItems[index];
      return item.selected !== originalItem.selected || item.seq !== originalItem.seq;
    });
    this.showOkBtn = hasChanges;
  }

  updateSettings(): void {
    // Simulate saving settings
    console.log('Updating settings:', this.noticeItems);
    this.originalNoticeItems = JSON.parse(JSON.stringify(this.noticeItems));
    this.showOkBtn = false;
    this.displayOk.emit();
  }

  onBack(): void {
     this.backEvent.emit();
   }

  drop(event: CdkDragDrop<NoticeItem[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.noticeItems, event.previousIndex, event.currentIndex);
      // 更新序号
      this.updateSequenceNumbers();
      // 检查变化
      this.checkForChanges();
      console.log(this.noticeItems);
    }
  }

  updateSequenceNumbers(): void {
    this.noticeItems.forEach((item, index) => {
      item.seq = index + 1;
    });
  }

  resetToOriginal(): void {
    this.noticeItems = JSON.parse(JSON.stringify(this.originalNoticeItems));
    this.showOkBtn = false;
  }

  getTranslation(key: string): string {
    const translations: { [key: string]: string } = {
      'systemMaintenance': '系統維護通知',
      'securityUpdate': '安全更新提醒', 
      'serviceAnnouncement': '服務公告',
      'emergencyNotice': '緊急通知',
      'promotionInfo': '促銷資訊'
    };
    return translations[key] || key;
  }
}