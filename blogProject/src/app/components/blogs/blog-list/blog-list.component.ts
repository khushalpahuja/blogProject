import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';
import { Response } from '@angular/http';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  constructor(private blogService:BlogService) { }

  ngOnInit() {
  this.blogService.getBlogs().subscribe(
    (blogs:Blog[])=>{
      // console.log("blogs:",blogs);
      this.blogService.blogs = blogs;
      // console.log("after",this.blogService.blogs);
    }
  )
  // this.blogService.blogsUpdated.subscribe(
  //   (response)=>{
  //     // console.log("Subject");
  //     this.blogService.blogs.push(response);
  //   }
  // )
  }

}
