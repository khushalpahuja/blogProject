import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { BlogService } from '../../../services/blogs.service';
import { Blog } from '../../../models/blog.model';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  editMode:boolean;
  editItem : Blog;
  id:number;
  blogForm:FormGroup;
  blogTitle = '';
  blogImage = '';
  blogBody = '';
  likes = 0;

  constructor(private route:ActivatedRoute , 
              private blogService:BlogService , 
              private router:Router ,
              private http:Http) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id']!=null;
        this.initForm();
      }
    )
  }

  onSubmit(blogForm:NgForm){
    // const blogValue = {
      
    // }

    if(this.editMode) {
        this.blogService.updateBlog(this.id , blogForm.value);
    } else {
      this.blogService.createBlog(blogForm.value).subscribe(
        (blog:Blog)=>{
          this.blogService.blogs.push(blog);
          console.log(this.blogService.blogs);
        }
      )
    }   
   
    console.log(this.blogService.blogs);
    this.router.navigate(['/blogs']);
  }

  private initForm() {
    

    if(this.editMode) {
      // const blog = this.blogService.getBlog(this.id);
      // this.editItem = blog;
      // this.likes = blog.likecount;
      // this.blogTitle = blog.title;
      // this.blogImage = blog.image;
      // this.blogBody = blog.body;
    } 


  }

}
