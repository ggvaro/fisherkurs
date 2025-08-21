import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService, Question } from './question.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  question: Question | null = null;
  showAnswer = false;
  currentIndex = 0;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe(qs => {
      // make a shuffled copy of the questions
      this.questions = this.shuffle([...qs]);
      this.currentIndex = 0;
      this.nextQuestion();
    });
  }

  private shuffle(array: Question[]): Question[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length) {
      this.question = this.questions[this.currentIndex];
      this.currentIndex++;
      this.showAnswer = false;
    } else {
      this.question = null; // all done
    }
  }
}
