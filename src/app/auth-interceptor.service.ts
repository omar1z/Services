import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";


export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // console.log('the request is on it\'s way'); // before the request leave the app
        // console.log(req.url);
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'omar')
        })
        return next.handle(modifiedRequest) // let the request leave the app
        // we can also manipulate the response
        // pipe(tap(event => {
        //     console.log(event);
        //     if(event.type === HttpEventType.Response){
        //         console.log('Response arrived, body data: ');
        //         console.log(event.body)
        //     }
        // }))
        // ; 
    }
}