import { TweetService } from './services/tweet.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './services/user.service';
import { LoadingService } from './services/loading.service';
import { RequestInterceptor } from './interceptor/tweetapp.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostTweetComponent } from './components/post-tweet/post-tweet.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { MaterialModule } from './modules/material.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { AvatarModule } from 'ngx-avatar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { ProfileComponent } from './components/users/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostTweetComponent,
    TweetComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UsersComponent,
    UserCardComponent,
    ProfileComponent,
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule,
    FlexLayoutModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }, LoadingService, UserService, AuthService, TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
