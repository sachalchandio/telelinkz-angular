import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  language_array,
  languageFrameworks,
  all_frameworks,
} from './util/langData';
import {
  getLanguageByFramework,
  frameworkExists,
  hasDashInName,
  getActualFrameworkName,
} from './util/helper_functions';
import { ChildComponent0 } from 'src/app/modules/homepage/components/calendar0/child.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent {
  image_path: string = '';
  language: string = '';
  actual_name: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.language = params['language'];
      this.image_path = this.language;
      this.actual_name = this.language;

      let { framework_exists, framework_name } = frameworkExists(
        all_frameworks,
        this.language
      );

      // Account for Odd Languages
      if (this.language == 'c-plus-plus') {
        // console.log('c++ ishere');
        this.actual_name = 'C++';
      } else if (this.language == 'csharp') {
        this.actual_name = 'C#';
      } else if (this.language == 'fsharp') {
        this.actual_name = 'F#';
      }

      // Route to language parameter if language exists
      if (language_array.includes(this.language)) {
        this.router.navigate([`${this.language}`]);
      } else if (framework_exists) {
        // console.log(`framework_exists: ${framework_name}`);
        this.actual_name = framework_name ? framework_name : '';

        // Account for odd frameworks
        if (this.language == 'dotnet') {
          this.actual_name = '.NET';
        } else if (this.language == 'aspdotnet') {
          this.actual_name = 'ASP .Net';
        } else if (this.language == 'dbix-class') {
          this.actual_name = 'DBIX :: Class';
        }

        if (hasDashInName(this.language) && framework_exists) {
          // if framework has space in it add '-'
          if (framework_name?.includes(' ')) {
            this.image_path = `${getLanguageByFramework(
              this.language.replace('-', ' '),
              languageFrameworks
            )}-${this.language.replace('-', '')}`;
            // console.log('image_path ---> ', this.image_path);
          } else {
            this.image_path = `${getLanguageByFramework(
              this.language.replace('-', '.'),
              languageFrameworks
            )}-${this.language.replace('-', 'dot')}`;
            this.actual_name = this.language.replace('-', '.');
          }
        }

        //otherwise on complete match to exact framework
        else {
          this.image_path = `${getLanguageByFramework(
            this.language,
            languageFrameworks
          )}-${this.language}`;
        }
        this.router.navigate([`${this.language}`]);
      } else {
        // console.log('nothing matches');
        this.router.navigate(['']);
      }
    });
  }

  openHireDev(): void {
    const dialogRef = this.dialog.open(ChildComponent0, {
      data: { component_name: true },
    });
  }
}
