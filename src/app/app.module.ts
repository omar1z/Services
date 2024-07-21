import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true // to register multiple interceptors
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: LoggingInterceptorService,
      multi: true // to register multiple interceptors
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
