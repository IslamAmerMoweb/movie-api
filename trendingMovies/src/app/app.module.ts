import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ActorsComponent } from './components/actors/actors.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { ClickOutDirective } from './directives/click-out.directive';
import { TrendDetailsComponent } from './components/trend-details/trend-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { PrevBtnDirective } from './core/prev/prev-btn.directive';
import { MediaComponent } from './components/media/media.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { SafeUrlPipe } from './core/pipes/safe-url.pipe';
import { SplitResPipe } from './core/pipes/split/split-res.pipe';
import { TvDetailsComponent } from './components/tv-details/tv-details.component';
import { PeopleComponent } from './components/people/people.component';
import { PrefferdComponent } from './components/prefferd/prefferd.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { ListsComponent } from './components/lists/lists.component';
import { RatingComponent } from './components/rating/rating.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    MoviesComponent,
    ActorsComponent,
    TvShowsComponent,
    FooterComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    ClickedOutsideDirective,
    TrendDetailsComponent,
    ReviewsComponent,
    PrevBtnDirective,
    DiscussionsComponent,
    MediaComponent,
    SafeUrlPipe,
    SplitResPipe,
    TvDetailsComponent,
    PeopleComponent,
    PrefferdComponent,
    UserPageComponent,
    FavoriteComponent,
    WatchlistComponent,
    ListsComponent,
    RatingComponent,
    ContentListComponent,
    ClickOutDirective,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CarouselModule,
    ToastrModule.forRoot({
      positionClass: 'custom-toast',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
