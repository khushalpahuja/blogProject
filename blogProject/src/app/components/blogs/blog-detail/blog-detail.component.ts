import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog = {
    title: '',
    image: '',
    body: '',
  }
  id:string;
  
  constructor(private blogService:BlogService , 
              private route:ActivatedRoute , 
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = params['id'];
        this.blogService.getBlog(this.id).subscribe(
          (blog:Blog)=>{
            this.blog = blog;
          }
        )
      }
    )
  }
  onEdit(){
    this.router.navigate(['edit'], {relativeTo:this.route });
  }

  onDelete(){
    // this.blogService.deleteBlog(this.id);
    this.router.navigate(['/blogs'])
  }

  onLike(){
    // this.blogService.likeIncrease(this.id);
  }

}
