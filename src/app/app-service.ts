import {Injectable} from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError } from 'rxjs/operators';
import {DataCity, IGeoResponse} from './geo.class';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({ providedIn: 'root'})
export class AppService {
   /** http://www.geonames.org/export/geonames-search.html */
  
    private lang = 'en';
   /** string ISO-639 2-letter language code; en,de,fr,it,es,... (optional) **/
   /** place name and country name will be returned in the specified language. Default is English. Feature classes and codes are only available in English and Bulgarian. Any help in translating is welcome.*/ 
   
   private featureClass = 'P';
   /** 	character A,H,L,P,R,S,T,U,V (optional) */ 
   /**  (default= all feature classes); this parameter may occur more than once, example: featureClass=P&featureClass=A*/
   /** http://www.geonames.org/export/codes.html */
   
    private maxRows = 6;
    /** integer (optional) */
    /**  the maximal number of rows in the document returned by the service. Default is 100, the maximal allowed value is 1000. */

    private style ='MEDIUM';
    /** string SHORT,MEDIUM,LONG,FULL (optional)*/
    /** verbosity of returned xml document, default = MEDIUM */
    
    private ApiUser = 'supernova2008';
    /** https://www.geonames.org/login */
   
    private GeoApiUrl = `https://secure.geonames.org/searchJSON?userName=${this.ApiUser}&lang=${this.lang}&featureClass=${this.featureClass}&style=${this.style}&maxRows=${this.maxRows}`;
    
    private apiTestPost = 'https://httpbin.org/post';  

    constructor(private http: HttpClient) {}
  


    searchGeoName(term: string): Observable<IGeoResponse> {
        return this.http.get<IGeoResponse>(`${this.GeoApiUrl}&name_startsWith=${term}`).pipe(
          tap(_ => console.log(`fetched geoname term=${term}`)),
          catchError(this.handleError<IGeoResponse>(`getgeoname term=${term}`))
        );
      }
    
    
     PostData(value: DataCity): Observable<DataCity> {
        return this.http.post<DataCity>(this.apiTestPost, value, httpOptions).pipe(
          tap((c: DataCity) => console.log(`ok`)),
          catchError(this.handleError<DataCity>('error'))
        );
      }

 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

   this.log(`${operation} failed: ${error.message}`);

    return of(result as T);
    };
  }

  private log(message: string) {
      console.log(message)
  }

} 