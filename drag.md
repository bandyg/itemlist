# Angular CDK 拖拽功能实现指南

本文档介绍如何使用 Angular CDK 实现基本的拖拽排序功能。

## 📦 安装依赖

```bash
npm install @angular/cdk
```

## 🔧 模块导入

在 `app.module.ts` 中导入拖拽模块：

```typescript
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    // 其他模块...
    DragDropModule
  ],
  // ...
})
export class AppModule { }
```

## 📝 组件代码 (TypeScript)

```typescript
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-list',
  templateUrl: './drag-list.component.html',
  styleUrls: ['./drag-list.component.css']
})
export class DragListComponent {
  items = [
    { id: 1, title: '项目 1', content: '这是第一个项目' },
    { id: 2, title: '项目 2', content: '这是第二个项目' },
    { id: 3, title: '项目 3', content: '这是第三个项目' }
  ];

  // 拖拽结束时的处理函数
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
```

## 🎨 HTML 模板

```html
<div class="drag-container">
  <h2>可拖拽列表</h2>
  
  <!-- CDK 拖拽容器 -->
  <div 
    class="drag-list" 
    cdkDropList 
    (cdkDropListDropped)="drop($event)">
    
    <!-- 可拖拽项目 -->
    <div 
      class="drag-item" 
      *ngFor="let item of items" 
      cdkDrag>
      
      <!-- 拖拽把手 -->
      <div class="drag-handle" cdkDragHandle>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M9 3h2v2H9V3zm0 4h2v2H9V7zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-16h2v2h-2V3zm0 4h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" fill="currentColor"/>
        </svg>
      </div>
      
      <!-- 项目内容 -->
      <div class="item-content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</div>
```

## 🎨 CSS 样式

```css
/* 容器样式 */
.drag-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

/* 拖拽列表容器 */
.drag-list {
  min-height: 60px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
}

/* 拖拽项目样式 */
.drag-item {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 8px;
  padding: 12px;
  cursor: move;
  transition: all 0.2s ease;
}

.drag-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 拖拽把手样式 */
.drag-handle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  margin-right: 12px;
  cursor: grab;
}

.drag-handle:hover {
  color: #333;
}

.drag-handle:active {
  cursor: grabbing;
}

/* 项目内容样式 */
.item-content {
  flex: 1;
}

.item-content h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
}

.item-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* 拖拽预览样式 */
.drag-item.cdk-drag-preview {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: rotate(2deg);
  border-radius: 6px;
}

/* 拖拽动画样式 */
.drag-item.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

/* 拖拽进行中的其他项目动画 */
.drag-list.cdk-drop-list-dragging .drag-item:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

/* 占位符样式 */
.cdk-drag-placeholder {
  opacity: 0.4;
  background: #e0e0e0;
  border: 2px dashed #ccc;
}
```

## 🔑 关键要点

### 1. 必需的指令
- `cdkDropList`: 标记拖拽容器
- `cdkDrag`: 标记可拖拽元素
- `cdkDragHandle`: 标记拖拽把手（可选）

### 2. 必需的事件处理
- `(cdkDropListDropped)`: 拖拽结束事件
- `moveItemInArray()`: 重新排列数组元素

### 3. 重要的CSS类
- `.cdk-drag-preview`: 拖拽预览样式
- `.cdk-drag-animating`: 拖拽动画样式
- `.cdk-drag-placeholder`: 占位符样式
- `.cdk-drop-list-dragging`: 拖拽进行中的容器样式

## 🚀 使用方法

1. 确保已安装 `@angular/cdk`
2. 在模块中导入 `DragDropModule`
3. 复制上述代码到对应文件
4. 根据需要调整样式和数据结构

## 📋 扩展功能

- **跨列表拖拽**: 使用 `cdkDropListGroup` 和 `transferArrayItem()`
- **拖拽约束**: 使用 `cdkDragBoundary` 限制拖拽范围
- **自定义预览**: 使用 `*cdkDragPreview` 自定义拖拽预览
- **拖拽数据**: 使用 `[cdkDragData]` 传递额外数据

这就是实现基本拖拽功能所需的全部代码！