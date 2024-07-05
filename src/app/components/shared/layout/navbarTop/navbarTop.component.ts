import {
  Component,
  ElementRef,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
// import { ChildComponent0 } from 'src/app/modules/homepage/components/calendar0/child.component';
// import { LoginComponent } from 'src/app/modules/login/components';

@Component({
  selector: 'navbarTop',
  templateUrl: './navbarTop.component.html',
  styleUrls: ['./navbarTop.component.css'],
})
export class NavbarTopComponent {
  providersOpen = true;
  isMobileMenuOpen = false;
  constructor(private authService: AuthenticationService) {}
  @Output() toggleSidebar = new EventEmitter<void>();

  @Output() toggleRightSidebar = new EventEmitter<void>();

  onButtonClick() {
    this.toggleSidebar.emit();
  }
  onRightButtonClick() {
    this.toggleRightSidebar.emit();
  }
}
