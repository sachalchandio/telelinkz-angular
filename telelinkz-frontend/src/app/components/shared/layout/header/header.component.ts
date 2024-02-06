import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ChildComponent0 } from 'src/app/modules/homepage/components/calendar0/child.component';
import { LoginComponent } from 'src/app/modules/login/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router,
    private eRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Close the menu if a click is detected outside of it
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isMobileMenuOpen = false;
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log(this.isMobileMenuOpen);
  }

  logoutOrOpenModal() {
    if (this.isAuthenticated()) {
      // User is authenticated, perform logout
      this.authService.logout(); // Implement the logout function in auth.service if not already done
      this.router.navigate(['']);
    } else {
      // User is not authenticated, open the login modal
      this.openModal();
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '75%', // Set the width of the modal
      // height: '95%',
    });
  }

  openHireDev(): void {
    const dialogRef = this.dialog.open(ChildComponent0, {
      data: { component_name: true },
    });
  }

  viewCV(): void {
    // do something
    const resume_id = localStorage.getItem('resume_id');
    this.router.navigate([`/view-cv/${resume_id}`]);
  }
}
