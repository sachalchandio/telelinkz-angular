import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChildComponent0 } from 'src/app/modules/homepage/components/calendar0/child.component';
import { DRAWER_DEV_PROFILES_HOME } from 'src/app/modules/homepage/utils/placeholder-devs';
import {
  DrawerDevProfile,
  shuffleArrayDrawer,
} from 'src/app/utils/randomGenerator';

@Component({
  selector: 'talent-pool-main',
  templateUrl: './talent-pool-main.component.html',
  styleUrls: ['./talent-pool-main.component.css'],
})
export class TalentPoolMain implements OnInit {
  companySize: string = '';
  drawer_profiles = DRAWER_DEV_PROFILES_HOME;
  found_match_index = 8;

  constructor(
    private dialog: MatDialog,
    private el: ElementRef,
    private router: Router
  ) {}

  openHireDev(): void {
    const dialogRef = this.dialog.open(ChildComponent0, {
      data: { component_name: true },
    });
  }

  ngOnInit(): void {
    this.drawer_profiles = this.randomizeDrawer(this.drawer_profiles);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = (event.target as HTMLElement).getAttribute(
      'appScrollTo'
    );
    if (targetElement) {
      const target = document.querySelector(targetElement);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  handleLangClick(lang: string): void {
    let modified_lang = lang.toLowerCase().trim();
    console.log(modified_lang);
    this.router.navigate([modified_lang]);
  }

  randomizeDrawer(array: DrawerDevProfile[]): DrawerDevProfile[] {
    return shuffleArrayDrawer(array).slice(0, this.found_match_index);
  }

  handleEventClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.tagName === 'H4') {
      const stack = clickedElement.textContent?.trim();
      this.handleLangClick(stack ? stack : '');
    }
  }
}
