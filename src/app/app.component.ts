import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  started: boolean = false;
  end: string = 'whatever !';
  words: string[] = [];
  word: string = '';
  player1: string = '';
  player2: string = '';
  currentPlayer: string = '';
  counter: number = 30;
  winner: string = '';
  alert: string = '';
  constructor() {}
  start() {
    //check if the players names are not empty
    if (this.player1 == '' || this.player2 == '') {
      //if empty alert the user
      alert('Please enter the players names');
      let player1Input = document.getElementById(
        'player1Input'
      ) as HTMLInputElement;
      let player2Input = document.getElementById(
        'player2Input'
      ) as HTMLInputElement;
      player1Input.focus();
      player1Input.style.border = '1px solid red';
      player2Input.style.border = '1px solid red';
      return;
    } //if not empty start the game

    this.started = true;
    this.currentPlayer = this.player1; //player1 starts
    this.restart();
  }
  restart() {
    //reset all the variables
    this.words = [];
    this.word = '';
    this.end = 'whatever !';
    this.currentPlayer = this.player1;
    this.counter = 30;
    //hide the result
    let result = document.getElementById('result') as HTMLDivElement;
    result.style.display = 'none';
    //set the counter
    let interval = setInterval(() => {
      if (this.counter > 0) {
        this.counter--;
      }
      if (this.counter == 0) {
        clearInterval(interval);
        //define the winner
        if (this.currentPlayer == this.player1) {
          this.winner = this.player2;
        } else {
          this.winner = this.player1;
        }
        //show the result
        let result = document.getElementById('result') as HTMLDivElement;
        result.style.display = 'block';
      }
    }, 1000);
  }

  addWord() {
    if (this.word === '') return;
    if (this.words.includes(this.word)) {
      //if the word is already in the list
      //alert user during 2 seconds
      this.alert = 'This word is already used';
      let alertDiv = document.getElementById('alertDiv') as HTMLDivElement;
      alertDiv.style.display = 'block';
      setTimeout(() => {
        alertDiv.style.display = 'none';
      }, 4000);
    } else if (
      this.end != 'whatever !' &&
      (this.word.charAt(0) != this.end.charAt(0) ||
        this.word.charAt(1) != this.end.charAt(1))
    ) {
      //if the word doesn't start with the end of the previous word
      //alert user during 2 seconds
      this.alert = 'This word must start with ' + this.end;
      let alertDiv = document.getElementById('alertDiv') as HTMLDivElement;
      alertDiv.style.display = 'block';
      setTimeout(() => {
        alertDiv.style.display = 'none';
      }, 4000);
    } else {
      this.word = this.word.trim().toLowerCase();
      //if the word is not in the list
      //push it to the list
      this.words.push(this.word);
      //restart the counter
      this.counter = 30;
      //define the end of the word
      let end =
        this.word.charAt(this.word.length - 2) +
        this.word.charAt(this.word.length - 1);
      //if the end is or 'ء' then change we take the 2 previous letters
      if (this.word.charAt(this.word.length - 1) == 'ء') {
        end =
          this.word.charAt(this.word.length - 3) +
          this.word.charAt(this.word.length - 2);
      }
      this.end = end;
      this.word = '';
      //change player turn
      if (this.currentPlayer == this.player1) {
        this.currentPlayer = this.player2;
      } else {
        this.currentPlayer = this.player1;
      }
    }
  }
}
