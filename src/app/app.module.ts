import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductSearchComponent } from './pages/productSearch/pages.productSearch';
import { ProductDetailsComponent } from './pages/productDetails/pages.productDetails';
import { SyncComponent } from './pages/sync/pages.sync';
import { PageNotFoundComponent } from './not-found.component';

import { FilterPipe } from './filters/search';
const appRoutes: Routes = [
  { path: 'search', component: ProductSearchComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'syncProduct', component: SyncComponent },
  { path: '',   redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ProductSearchComponent,
    ProductDetailsComponent,
    PageNotFoundComponent,
    SyncComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{ enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
