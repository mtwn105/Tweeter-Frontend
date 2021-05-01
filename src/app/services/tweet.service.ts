import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  serverUrl = environment.serverUrl;
  tweetsChangeObservable = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private userService: UserService,
  ) {
  }

  getTweetChangeObservable() {
    return this.tweetsChangeObservable.asObservable();
  }

  refreshTweets() {
    this.tweetsChangeObservable.next(true);
  }

  getAllTweets() {
    return this.http.get(`${this.serverUrl}/tweets`);
  }

  getUserTweets(username) {
    return this.http.get(`${this.serverUrl}/tweets/${username}`);
  }

  postTweet(username, tweet) {
    return this.http.post(`${this.serverUrl}/tweets/${username}/add`, tweet);
  }

  likeTweet(username, tweetId) {
    return this.http.put(`${this.serverUrl}/tweets/${username}/like/${tweetId}`, null);
  }

  replyTweet(username, tweetId, tweet) {
    return this.http.post(`${this.serverUrl}/tweets/${username}/reply/${tweetId}`, tweet);
  }

}
