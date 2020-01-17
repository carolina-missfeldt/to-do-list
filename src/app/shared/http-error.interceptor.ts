import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private snackBar: MatSnackBar) { };


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = ` 
                        Tipo: ${error.status} ${error.statusText},
                        Mensagem: ${error.error}`;
                    }
                    console.log(error);
                    this.snackBar.open(errorMessage, 'ok', {duration: 4000});
                    return throwError(errorMessage);
                })
            )
    }
}