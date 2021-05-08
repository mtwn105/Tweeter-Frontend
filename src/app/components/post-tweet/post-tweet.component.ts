import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TweetService } from './../../services/tweet.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.scss']
})
export class PostTweetComponent implements OnInit {

  @Input() userDetails: User;
  tweetForm: FormGroup;
  submitted: boolean;

  constructor(
    private tweetService: TweetService
  ) { }

  ngOnInit(): void {
    this.tweetForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(144)])
    });
  }

  postTweet() {

    this.submitted = true;

    console.log("signing up")

    if (this.tweetForm.invalid) {
      return;
    }

    this.submitted = false;

    this.tweetService.postTweet(this.userDetails.username, this.tweetForm.value).subscribe((res: any) => {
      this.tweetForm.reset();
      this.tweetService.refreshTweets();
    });

  }

}
