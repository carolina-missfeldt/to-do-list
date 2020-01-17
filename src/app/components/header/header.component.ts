import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = "";
  @Input() route: string = ""

  constructor(public router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate([this.route]);
  }

}
