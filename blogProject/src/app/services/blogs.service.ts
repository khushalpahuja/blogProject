import { Blog } from "../models/blog.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class BlogService{
    constructor(private http:Http){}
    blogsUpdated = new Subject<Blog>()
    blogs:Blog[] = [
      new Blog(
        "Sacred land",
        "https://static2.visitestonia.com/images/3060913/original-original-Kaali%2Bsacred%2Bplace.+visit+Estonia-min.jpg",
        "this is a Sacred land sdbdbsjdbguhsdbghd\r\ndkjdfhjdd\r\nsdhsbdhbdhjbdd\r\nsdjdnjsndjds\r\nsmdksmdksmd\r\nksdmkd",        
        11
      ),
      new Blog(
        "asnsdjnn",
        "http://www.silentjourney.com/blog/wp-content/uploads/2015/01/top-10-amazing-places-you-wont-b.jpg",
        "mksddsksdkmkdjkdfjkjdfj\r\ndjffbjdgfdgfd\r\nbndjhdbjhbss",
        4
      )
    ];

    getBlogs(){
      // console.log("Sddnj");
      return this.http.get('http://localhost:8000/blogs').map(
        (response:Response) => {
          this.blogs=response.json();
          console.log(this.blogs);
          return response.json();
        }
      )
        
    }

    createBlog(blog:Blog){
      return this.http.post('http://localhost:8000/blogs' , blog).map(
        (response:Response) => {
          this.blogs.push(response.json());
          return response.json();
        }
      )
    }

    getBlog(index:number) {
      return this.blogs[index];
    }

    updateBlog(index:number , updateBlog:Blog){
      this.blogs[index] = updateBlog;
    }

    deleteBlog(index:number){
      this.blogs.splice(index,1);
    }

    likeIncrease(index:number){
      this.blogs[index].likecount++;
    }
    



}