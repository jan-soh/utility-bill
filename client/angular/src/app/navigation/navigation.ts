import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.html',
  imports: [RouterLink, RouterOutlet],
})
export class Navigation {

}
