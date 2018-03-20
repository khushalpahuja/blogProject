import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BlogService } from './services/blogs.service';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogListComponent } from './components/blogs/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blogs/blog-detail/blog-detail.component';
import { BlogEditComponent } from './components/blogs/blog-edit/blog-edit.component';
import { BlogItemComponent } from './components/blogs/blog-list/blog-item/blog-item.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes:Routes = [
  { path: '' , component:HomeComponent },  
  { path: 'blogs' , children:[
    { path:'' , component: BlogsComponent },
    { path:'new' , component:BlogEditComponent },
    { path:':id', component : BlogDetailComponent },
    { path:':id/edit', component:BlogEditComponent }
  ]},
  { path:'signup' , component:SignupComponent },
  { path:'login' , component:LoginComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    BlogListComponent,
    BlogDetailComponent,
    BlogEditComponent,
    BlogItemComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BlogService ,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
