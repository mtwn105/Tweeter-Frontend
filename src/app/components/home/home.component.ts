import { UserService } from './../../services/user.service';
import { TweetService } from './../../services/tweet.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Tweet } from 'src/app/models/tweet.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tweets: Tweet[];
  user: User;

  constructor(
    public tweetService: TweetService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserDetails(this.userService.loggedInUserId).subscribe((res: any) => this.user = res);
    this.tweetService.getAllTweets().subscribe((res: any) => {
      this.tweets = res;
    });
    this.tweetService.getTweetChangeObservable().subscribe((res) => {
      // Refresh Tweets
      this.tweetService.getAllTweets().subscribe((res: any) => {
        this.tweets = res;
      });
    });
  }

}
