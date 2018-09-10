import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './modals/Movie';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private httpclient:HttpClient) { }

  getMovies(){
    return this.httpclient.get<Movie[]>('http://starlord.hackerearth.com/movieslisting')
  }

  getMoviesByFilter(filter){
    const compare = r => l => (typeof l === "object" ? contains(r)(l) : l === r);
    const contains = r => l =>
      Object.keys(r).every(k => l.hasOwnProperty(k) && compare(r[k])(l[k]));
    

   return this.getMovies().pipe(map((result)=>{
    //  return result.filter((movie)=>{
    //    let givenstr = JSON.stringify(movie);
    //    let searcstr = JSON.stringify(filter,(key,value)=>{
    //      if(value==='') {return undefined;}
    //      return value;
    //    });
    //      return givenstr.substring(1,givenstr.length-1).includes(searcstr.substring(1,searcstr.length-1));
    //   })
    return result.filter(contains(filter));
    }))
  }
}
