import { Tweet } from './../../../models/tweet.model';
import { TweetService } from './../../../services/tweet.service';
import { User } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  tweets: Tweet[];
  userId: string;
  loggedInUser: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tweetService: TweetService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
    });
  }

  ngOnInit(): void {
    this.userService.getUserDetails(this.userService.loggedInUserId).subscribe((res: any) => this.loggedInUser = res);
    this.userService.getUserDetails(this.userId).subscribe((res: any) => {
      this.user = res;
      if (!!this.user) {
        this.tweetService.getUserTweets(this.user.username).subscribe((tweets: any) => this.tweets = tweets);
      }
    });
  }

}
