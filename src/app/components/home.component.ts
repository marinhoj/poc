import { Observable } from 'rxjs';
import { CatalogoFilmesService } from './../services/catalogo-filmes.service';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';


@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    public catalogoFilmesService: CatalogoFilmesService, private router: Router) {
  }

  stringSearch = '';

  public url_img = 'https://image.tmdb.org/t/p/w500';
  public data: any | any[];

  public title = 'POC DAITAN - Catalogo de filmes'


 ngOnInit() {
    this.loadInicial();
  }

  async loadInicial() {
    await this.catalogoFilmesService.getTreding().subscribe(filmes => {
      this.data = filmes.results;
      console.log(this.data);
      this.returnVideoId(this.data);
    });

  }

   search(event: any) {
    this.data = [];
     this.catalogoFilmesService.search_(this.stringSearch).subscribe(filmes => {
      this.data = filmes.results;
      this.returnVideoId(this.data);
      console.log('busca -> ', this.data);
    });
  }

  returnVideoId(movie: any[]) {
    movie.forEach(film => {
      this.catalogoFilmesService.getTrailer(film.id, film.media_type).subscribe(trailerData => {
        film.idTrailer = trailerData.results[0] ? trailerData.results[0].key : '';
      });
    });
  }

}


