import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuestionService, Question } from './question.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  allQuestions: Question[] = [];
  questions: Question[] = [];
  question: Question | null = null;
  showAnswer = false;
  currentIndex = 0;

  // Range controls
  startNumber: number | null = null;
  endNumber: number | null = null;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe(qs => {
      this.allQuestions = qs;
      this.resetQuiz();
    });
  }

  private shuffle(array: Question[]): Question[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  applyRange() {
    if (this.startNumber !== null && this.endNumber !== null) {
      const filtered = this.allQuestions.filter(
        q => q.number >= this.startNumber! && q.number <= this.endNumber!
      );
      this.questions = this.shuffle([...filtered]);
    } else {
      this.questions = this.shuffle([...this.allQuestions]);
    }
    this.currentIndex = 0;
    this.nextQuestion();
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

  resetQuiz() {
    this.questions = this.shuffle([...this.allQuestions]);
    this.currentIndex = 0;
    this.nextQuestion();
    this.showAnswer = false;
  }

  /** Returns CSS class for a question based on its progress status */
  getQuestionStatus(index: number): string {
    if (index < this.currentIndex - 1) return 'asked';
    if (index === this.currentIndex - 1) return 'active';
    return 'upcoming';
  }
}
