import { Injectable } from '@angular/core';
import { max } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class CheckSentence{
    sum = 0;
    wordCountUserTotal = 0;

    //levenshtien function to check how close to words are to eachother 
    levenshtein(a, b) {
        var t = [], u, i, j, m = a.length, n = b.length;
        if (!m) { return n; }
        if (!n) { return m; }
        for (j = 0; j <= n; j++) { t[j] = j; }
        for (i = 1; i <= m; i++) {
          for (u = [i], j = 1; j <= n; j++) {
            u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : Math.min(t[j - 1], t[j], u[j - 1]) + 1;
          } t = u;
        } return u[n];
      }
      //a is correct, b is input
      checkPercent(a,b){
        this.wordCountUserTotal = 0;
        var wordCountCorrect = 1;
        var correctSentence = a.replace(/[.,\/#!$%\?^&\*;:{}=\-_`~()]/g,"");
        var userSentence = b.replace(/[.,\/#!$%\^&?\*;:{}=\-_`~()]/g,"");
        var lastCharacter = 0;
        var newWordCorrect = '';
        this.sum = 0;
        userSentence = userSentence.toLowerCase();
        correctSentence = correctSentence.toLowerCase();
        userSentence = userSentence.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        correctSentence = correctSentence.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

          for (let character of correctSentence){
            lastCharacter +=1; 
            if(character !== ' '){
                newWordCorrect = newWordCorrect.concat(character);
                if(lastCharacter === correctSentence.length){
                    this.checkHowClose(newWordCorrect, userSentence);
                }
            }
            else{
                wordCountCorrect +=1;
                this.checkHowClose(newWordCorrect, userSentence);
                newWordCorrect = '';
                }
    
              }
          if(wordCountCorrect >= this.wordCountUserTotal){
            return (this.sum/wordCountCorrect)*(wordCountCorrect * this.wordCountUserTotal)/(wordCountCorrect*wordCountCorrect);

          }
          else{
            return (this.sum/wordCountCorrect)*(wordCountCorrect * this.wordCountUserTotal)/(this.wordCountUserTotal*this.wordCountUserTotal);
          }
        }
        
    //this checks the max levenstien value for each word of the correct sentence compared against all of the users words
    checkHowClose(newWordCorrect, userSentence){
        var wordCountUser = 1;
        var bestFit = 0;
        var lastCharacterUser = 0; 
        var newWordUser ='';
        for (let character2 of userSentence){
            lastCharacterUser +=1;
            if(character2 !== ' '){
                    newWordUser = newWordUser.concat(character2);

                    if(lastCharacterUser === userSentence.length){
                        bestFit = Math.max(bestFit, ((newWordCorrect.length - this.levenshtein(newWordCorrect,newWordUser))/newWordCorrect.length));
                        // this.sum += ((newWordCorrect.length - this.levenshtein(newWordCorrect,newWordUser))/newWordCorrect.length);
                    }
                }
            else{
              wordCountUser += 1;
              bestFit = Math.max(bestFit, ((newWordCorrect.length - this.levenshtein(newWordCorrect,newWordUser))/newWordCorrect.length));
              newWordUser = '';
              }
           }
    this.wordCountUserTotal = Math.max(this.wordCountUserTotal, wordCountUser);
    this.sum += bestFit;

  }    
}

