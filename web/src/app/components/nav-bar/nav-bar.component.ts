import { Component } from '@angular/core';

import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  faGithub = faGithub;
}
