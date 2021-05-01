import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  searchText: string;


  constructor(
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAllUserDetails().subscribe((res: any) => this.users = res);
  }

  search() {
    console.log(this.searchText);

    this.userService.searchUsers(this.searchText).subscribe((res: any) => this.users = res);

  }

}
