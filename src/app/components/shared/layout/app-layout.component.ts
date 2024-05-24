import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent {
  constructor() {}
  isSidebarActive = false;

  onToggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  isRightSidebarActive = false;

  onToggleRightSidebar() {
    this.isRightSidebarActive = !this.isRightSidebarActive;
  }
}
