import { Injectable } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';


interface Item {
  item_id: string,
  item_name: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  listItem(): Observable<Item[]> {
    const url = `${environment.API_DOMAIN}/item`;
    return this.http.get<any>(url).pipe(
      map(data => data.items),
      catchError(this.handleError<any>('listItem', []))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status !== 404) {
        console.error(error);
      }
      if (error.status === 422 || error.status === 502) {
        console.error(error);
        alert(JSON.stringify(error.error));
        return throwError(error);
      }

      // TODO
      return of(result as T);
    };
  }
}
