import { AuthService } from './../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { LoadingService } from '../services/loading.service';
import { MessageConstants } from '../constants/message.constants';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, httpRequest.url);
    if (localStorage.getItem('token') != null) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    return next.handle(httpRequest)
      .pipe(catchError((err) => {
        this.loadingService.setLoading(false, httpRequest.url);
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.snackbar.open(MessageConstants.SIGN_IN_ERROR, "Close", {
              duration: 2000
            })
            this.authService.signOut();
            this.router.navigate(['login']);
          }
        }
        return throwError(err);
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false, httpRequest.url);
        }
        return evt;
      }));
  }
}
