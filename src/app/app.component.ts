import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { GenericClass } from './class/generic-class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-to-do-list';

}
