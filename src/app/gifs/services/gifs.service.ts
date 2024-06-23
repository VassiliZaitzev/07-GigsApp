import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';
  private apiKey:string = "7Xob86Tl1xu5sqkGqCktUeFcpcHVtA7x";
  public gifList:Gif[] = [];

  constructor(
    private http:HttpClient
  ) {
    this.loadLocalStorage();
  }

  get tagsHistory():string[]{
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string):void{
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10)
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('History',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('History')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('History')!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private deleteTags(){
    localStorage.removeItem('History');
    this._tagsHistory = [];
    this.gifList = [];
  }

  deleteTagFunction(){
    this.deleteTags();
  }

  searchTag(tag:string):void{
    if (!tag) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',tag)
    .set('limit',10)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params:params}).
    subscribe((x) => {
      this.gifList = x.data;
    });

    //this._tagsHistory.unshift(tag);
    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=7Xob86Tl1xu5sqkGqCktUeFcpcHVtA7x&q=valorant&limit=10')
    .then(resp => resp.json())
    .then(data => console.log(data));*/
  }
}
