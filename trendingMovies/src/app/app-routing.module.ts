import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ActorsComponent } from './components/actors/actors.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { MoviesComponent } from './components/movies/movies.component';
import { Auth } from './core/guards/auth.guard';
import { TrendDetailsComponent } from './components/trend-details/trend-details.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MediaComponent } from './components/media/media.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
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

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      {
        path: 'actors',
        canActivate: [Auth],
        component: ActorsComponent,
        title: 'actors',
      },
      {
        path: 'TvShows/:tv',
        canActivate: [Auth],
        component: TvShowsComponent,
        title: 'Tv Shows',
      },
      {
        path: 'movies/:Playing',
        canActivate: [Auth],
        component: MoviesComponent,
        title: 'now playing',
      },
      {
        path: 'movies/Popular',
        canActivate: [Auth],
        component: MoviesComponent,
        title: 'Popular',
      },
      {
        path: 'movies/Top',
        canActivate: [Auth],
        component: MoviesComponent,
        title: 'Top rate',
      },
      {
        path: 'movies/Upcoming',
        canActivate: [Auth],
        component: MoviesComponent,
        title: 'Upcoming',
      },
      {
        path: 'tvDetails/:id',
        canActivate: [Auth],
        component: TvDetailsComponent,
        title: 'Tv Details',
      },
      {
        path: 'prefferd',
        canActivate: [Auth],
        component: PrefferdComponent,
        title: 'prefferd',
      },
      {
        path: 'user',
        canActivate: [Auth],
        component: UserPageComponent,
        children: [
          { path: '', redirectTo: 'lists', pathMatch: 'full' },
          { path: 'favorite', component: FavoriteComponent, title: 'favorite' },
          { path: 'watch', component: WatchlistComponent, title: 'watch list' },
          { path: 'lists', component: ListsComponent, title: 'lists' },
          { path: 'rating', component: RatingComponent, title: 'rating' },
        ],
      },
      {
        path: 'content/:id',
        component: ContentListComponent,
        title: 'list',
      },
      { path: 'people/:id', component: PeopleComponent, title: 'people' },
      {
        path: 'trendDetails/:id',
        component: TrendDetailsComponent,
        canActivate: [Auth],
        children: [
          { path: '', redirectTo: 'reviews', pathMatch: 'full' },
          { path: 'reviews', component: ReviewsComponent, title: 'reviews' },
          {
            path: 'Discussions',
            component: DiscussionsComponent,
            title: 'Discussions',
          },
          { path: 'media', component: MediaComponent, title: 'media' },
        ],
      },
    ],
  },
  // { path: 'loading', component: LoadingScreenComponent },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'Not-Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
