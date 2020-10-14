import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl'],
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  request(): void {
    this.api.listItem().subscribe(items => {
      console.log(items);
    });
  }
}
