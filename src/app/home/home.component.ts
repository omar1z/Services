import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { filter } from 'rxjs-compat/operator/filter';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() {}
  private subscription: Subscription;
  ngOnInit() {
    // this.subscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // )
    const customIntervalObservable = Observable.create(observer => {
      let count = 0
      setInterval(() => {
        observer.next(count);
        if(count === 2){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('counter greater than 3'));
          
        }
        count++;
      }, 1000)
    });

    this.subscription = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }),map((data: number) => {
      return 'Round:' + (data+1);
    })).subscribe(data => {
      console.log(data);// for the observer.next
    }, error => {console.log(error);
      alert(error.message); // for the observer.error 
    }, // error cancels the observable completion
      () => {
        console.log('completed')
      }// for the observer.complete
    )
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
