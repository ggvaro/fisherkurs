import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  question: string;
  answer: string;
  number: number;
  userAnswerStatus?: 'correct' | 'incorrect'; // ✅ Added for tracking accuracy
}

@Injectable({ providedIn: 'root' })
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('/assets/questions.json');
  }
}