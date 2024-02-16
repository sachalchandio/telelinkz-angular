import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
// import { ChildComponent0 } from 'src/app/modules/homepage/components/calendar0/child.component';
// import { LoginComponent } from 'src/app/modules/login/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  providersOpen = true;
  isMobileMenuOpen = false;

  constructor(private authService: AuthenticationService) {}

  // @HostListener('#myElementId:click', ['$event'])
  // @HostListener('.my-class:click', ['$event'])
  // handleElementClick(event: Event) {
  //   // Handle click on elements with the class 'my-class'
  // }

  toggleProviders() {
    this.providersOpen = !this.providersOpen;
  }
}
