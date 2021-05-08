import { User } from './../../models/user.model';
import { TweetService } from './../../services/tweet.service';
import { UserService } from './../../services/user.service';
import { Tweet } from './../../models/tweet.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FormControl, FormGroup, Validators } from '@angular/forms';

TimeAgo.addDefaultLocale(en)

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input() tweet: Tweet;
  @Input() loggedInUser: User;
  user: User;
  timeAgo: any;
  panelOpenState: any;
  isReplyClicked = false;

  tweetForm: FormGroup;


  constructor(
    public userService: UserService,
    private tweetService: TweetService,
  ) { }

  ngOnInit(): void {
    const timeAgo = new TimeAgo('en-US')
    this.timeAgo = timeAgo.format(new Date(this.tweet.createdDate));
    this.userService.getUserDetails(this.tweet.userId).subscribe((res: any) => this.user = res);
    this.tweetForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(144)])
    });
  }

  likeTweet() {
    this.tweetService.likeTweet(this.loggedInUser.username, this.tweet.tweetId).subscribe((res: any) => {
      this.tweet = res;
    })
  }

  replyTweet() {

    console.log("signing up")

    if (this.tweetForm.invalid) {
      return;
    }

    this.tweetService.replyTweet(this.loggedInUser.username, this.tweet.tweetId, this.tweetForm.value).subscribe((res: any) => {
      this.isReplyClicked = false;
      if (!!this.tweet.replies) {
        this.tweet.replies.push(res);
      } else {
        this.tweet.replies = [];
        this.tweet.replies.push(res);
      }
      if (!this.panelOpenState) this.panelOpenState = true;
    });

  }

  deleteTweet() {
    this.tweetService.deleteTweet(this.loggedInUser.username, this.tweet.tweetId).subscribe((res: any) => {
      this.tweetService.refreshTweets();
    })
  }

}
