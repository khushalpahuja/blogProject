import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs:Blog[];
  constructor(private blogService:BlogService) { }

  ngOnInit() {
  this.blogService.getBlogs().subscribe(
    (blogs:Blog[])=>{
      this.blogs=blogs;
    }
  )
  }

}
