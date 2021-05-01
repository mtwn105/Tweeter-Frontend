import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn = false;
  loggedInUserId = null;
  serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getIsLoggedIn() {
    return this.loggedIn;
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }

  getUserDetails(userId) {
    return this.http.get(`${this.serverUrl}/users/details/${userId}`);
  }

  getAllUserDetails() {
    return this.http.get(`${this.serverUrl}/users/all`);
  }

  searchUsers(searchText) {
    return this.http.get(`${this.serverUrl}/users/search/${searchText}`);
  }
}
