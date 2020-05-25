import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/bpharm.json', name: 'B. Pharm' },
      { id: 'data/engineering.json', name: 'Engineering B.E'},
      { id: 'data/mba.json', name: 'MBA' },
      // { id: 'data/csharp.json', name: 'C Sharp' },
      // { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ];
  }

}
