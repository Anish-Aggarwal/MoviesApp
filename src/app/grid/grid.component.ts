import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../movie-service.service';
import { Movie } from '../modals/Movie';
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  movieObj: Movie[];
  totalMovieObj : Movie[];
  columns;
  totalItems: number;
  pageSize: number = 5;


  constructor(private movieService: MovieServiceService) { }

  ngOnInit() {

    // let filter: Movie = {
    //   movie_title: '',
    //   director_name: '',
    //   actor_1_name: '',
    //   actor_2_name: 'Sophia Myles',genres: '',   language: '',country: 'USA', content_rating: '', budget: '',
    //   title_year: '',
    //   plot_keywords: '', movie_imdb_link: '' 

    // };

    let filter = {
      // country: 'USA',
      // actor_2_name: 'Sophia Myles'
    };

    this.movieService.getMoviesByFilter(filter).subscribe(result => {
      this.totalItems = result.length;
      this.totalMovieObj = result;
      this.movieObj = this.paginate(result, this.pageSize, 1);
      this.columns = Object.keys(this.movieObj[0]);
    });
  }

  onPageChanged(pageNumber) {
    this.movieObj = this.paginate(this.totalMovieObj, this.pageSize, pageNumber);
  }

  paginate(array, page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
}