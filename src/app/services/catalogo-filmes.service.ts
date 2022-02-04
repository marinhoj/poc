import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable } from 'rxjs';

const api_key = 'fed69657ba4cc6e1078d2a6a95f51c8c';

const url_api = 'https://api.themoviedb.org/3/search/movie?&api_key=feb6f0eeaa0a72662967d77079850353&query=';
const url_trending = 'https://api.themoviedb.org/3/trending/all/day?api_key=';
const url_img = 'https://image.tmdb.org/t/p/w500/';
const url_trailer = 'https://api.themoviedb.org/3/&type/&videoId/videos?api_key='


@Injectable({providedIn: 'root'})
export class CatalogoFilmesService {
    constructor(private http: HttpClient) {}

    public async getDados(query: string) {
      return await this.http.get<any[]>(url_api + query).toPromise();
    }

    public async search(query: string[]) {
      const observables: Observable<any>[] = [];
      query.map((item: string) => {
          observables.push(this.http.get<any>(url_api + encodeURIComponent(item)));
      });

      const movies: string[][] = [];
      forkJoin(observables).subscribe((responses: any[]) => {
          responses.map(response => {
            movies.push(response);
          });
      });
      return movies;
  }

  search_(filme: string): Observable<any> {
    let apiURL = url_api + filme;
    return this.http.get<any>(apiURL)
  }

  getTreding(): Observable<any> {
    return this.http.get<any>(url_trending + api_key);
  }

  getTrailer(id: string, type: string): Observable<any> {
    let url = url_trailer.replace('&videoId', id);
    url = url.replace('&type', type);
    return this.http.get<any>(url + api_key);
  }
}
