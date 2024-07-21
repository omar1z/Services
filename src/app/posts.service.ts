import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, Subject, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string,content:string){
        const postData: Post = {
            title: title,
            content: content
        };
        this.http
      .post<{name: string}>(
        // 'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        'https://ng-complete-guide-50dba-default-rtdb.firebaseio.com/posts.json',
        postData,{
            observe: 'response',
            responseType: 'json'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      },error => {
        this.error.next(error.message);
      });
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>(
            'https://ng-complete-guide-50dba-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({"Custom-Header": "Hello"}),
                params: new HttpParams().set('print', 'pretty')
            }
          ).pipe(map(responseData => {
            const postArray: Post[] = [];
            for(const key in responseData) {
              if(responseData.hasOwnProperty(key)){
                postArray.push({ ...responseData[key], id:key });
              }
            }
            return postArray;
          })
        )
    }

    deletePosts(){
        return this.http.delete<{ [key: string]: Post }>(
            'https://ng-complete-guide-50dba-default-rtdb.firebaseio.com/posts.json',
            {
                observe: 'events'
            }
        ).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log(event.body);
            }
            if(event.type === HttpEventType.Sent){
                //....
            }
        }))
    }
}