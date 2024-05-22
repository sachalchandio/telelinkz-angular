import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sideBar-login-functionality',
  standalone: true,
  imports: [NgClass],
  templateUrl: './login-functionality.component.html',
  styleUrl: './login-functionality.component.css',
})
export class SideBarLoginComponent implements OnInit {
  ngOnInit(): void {
    this.getUsername();
  }

  isSettingsMenuActive: boolean = false;
  username: string = '';

  toggleSettingsMenu(): void {
    this.isSettingsMenuActive = !this.isSettingsMenuActive;
  }

  getUsername(): void {
    this.username = localStorage.getItem('agent') || '';
  }

  logout(): void {
    // Implement your logout logic here
    console.log('User logged out');
  }
}
