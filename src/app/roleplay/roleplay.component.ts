import { Component, OnInit } from '@angular/core';
import { CheckSentence } from '../services/checksentence.service';

@Component({
  selector: 'app-roleplay',
  templateUrl: './roleplay.component.html',
  styleUrls: ['./roleplay.component.css']
})

export class RoleplayComponent implements OnInit {

  constructor(private checkSentence: CheckSentence) { }
  testWord1 = 'hows are your?';
  testWord2 = 'how are you?'; 
  num = this.checkSentence.checkPercent(this.testWord1,this.testWord2);
  
  ngOnInit(): void {
  }
    
}
