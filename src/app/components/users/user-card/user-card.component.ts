import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openProfile() {

    this.router.navigateByUrl(`/users/profile/${this.user.id}`);

  }

}
