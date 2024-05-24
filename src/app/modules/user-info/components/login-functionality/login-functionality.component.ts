import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { UsernameService } from '../../../../services/loginInfo/username.service'; // Adjust the path accordingly

@Component({
  selector: 'sideBar-login-functionality',
  standalone: true,
  imports: [NgClass],
  templateUrl: './login-functionality.component.html',
  styleUrl: './login-functionality.component.css',
})
export class SideBarLoginComponent implements OnInit {
  isSettingsMenuActive: boolean = false;
  username: string = '';

  constructor(private usernameService: UsernameService) {}

  ngOnInit(): void {
    this.usernameService.username$.subscribe((username) => {
      this.username = username;
    });
  }

  toggleSettingsMenu(): void {
    this.isSettingsMenuActive = !this.isSettingsMenuActive;
  }

  logout(): void {
    // Implement your logout logic here
    console.log('User logged out');
  }
}
