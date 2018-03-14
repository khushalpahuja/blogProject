import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../../services/blogs.service';
import { Blog } from '../../../../models/blog.model';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {
  @Input() index:number ;
  @Input() blog:Blog;
  
  constructor(private blogService : BlogService) { }

  ngOnInit() {
  }

}
