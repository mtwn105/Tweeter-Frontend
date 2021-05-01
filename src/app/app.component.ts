import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,) {

  }

  ngOnInit() {
    this.listenToLoading();
  }

  /**
 * Listen to the loadingSub property in the LoadingService class. This drives the
 * display of the loading spinner.
 */
  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }


}
