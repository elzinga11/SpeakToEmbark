import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, Output } from '@angular/core';
import { CheckSentence } from '../services/checksentence.service';
import { RecordAudio } from '../services/recordaudio.service';
import {FormControl, Form} from '@angular/forms';
import { GoogleObj, Solution } from '../models/solution';
import { SolutionService } from '../services/solution.service';
import { GoogletranslateService } from '../services/googletranslate.service';
import { ElementRef, NgZone, ViewChild } from '@angular/core';


@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})

export class ParagraphComponent implements OnInit {
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
  voiceTextReady: boolean = false;
  currentSentence: string = '';
  sentenceCounter: number = 0;
  score: number = 0;
  conversationSentence: string = '';
  langFrom = new FormControl('en');
  guideSentence = 'Practice saying...';

  langTo = new FormControl('en');
  
  data: Solution = {
    title: '',
    description: '',
    detail: ''
  };

  constructor(private google: GoogletranslateService , private solution: SolutionService, private recordAudio: RecordAudio, private checkSentence: CheckSentence) { }

  //Note that these practice paragraphs in spanish do not have accent marks or double question marks
  
  practiceParagraphBrownAudio = ['../assets/soundFile/Me llamo Benjamin Brown.mp3', 
                                '../assets/soundFile/Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo lleva aqui.mp3',
                                '../assets/soundFile/Como se llama su esposa.mp3',
                                '../assets/soundFile/Tienen hijos.mp3',
                                '../assets/soundFile/Tenemos dos hijos.mp3',
                                '../assets/soundFile/somos misioneros.mp3',
                                '../assets/soundFile/Que sabe de la iglesia.mp3',
                                '../assets/soundFile/le gustaria aprender mas.mp3']
  practiceParagraphNeighborAudio = ['../assets/soundFile/Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted.mp3',
                                    '../assets/soundFile/Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.mp3',
                                    '../assets/soundFile/Se llama Maria.mp3',
                                    '../assets/soundFile/No, no tenemos hijos.mp3',
                                    '../assets/soundFile/estan aqui por trabajo.mp3',
                                    '../assets/soundFile/si uno de mis amigos es miembro.mp3',
                                    '../assets/soundFile/No mucho.mp3'
                                    ]

  practiceParagraphBrown = ['Buenos dias, soy su nuevo vecino. Me llamo Benjamin Brown!',
                            'Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto tiempo ha vivido aqui?',
                            'Como se llama su esposa?',
                            'Tienen hijos?',
                            'Mi esposa y yo tenemos dos hijos, pero no viven con nostoros ahora; estan en los Estados Unidos.',
                            'En realidad, no. Estamos aqui para compartir un mensaje de Dios y Jesucristo. Somos misioneros de nuestra iglesia. Ha escuchado de La Iglesia de Jesuscristo de los Santos do los Ultimos Dias?',
                            'Que sabe de la Iglesia?', 'Le gustaria aprender mas acerca de nuesta religion?'];
  practiceParagraphNeighbor = ['Mucho gusto, mi nombre es Fabrizio Alegre. De donde es usted?',
                              'Mi esposa y yo vivimos aqui hace cuatro años y nos gusta mucho. Es muy tranquilo y las personas son amigables.',
                              'Se llama Maria.',
                              'No, no tenemos hijos todavia. Y ustedes, cuantos hijos tienen?',
                              'Ustedes estan aqui por trabjo?',
                              'Si. Uno de mis amigos es miembro de esa iglesia.',
                              'No mucho, mi amigo habla poco de religion.'
                            ];

  paragraphArray = [this.practiceParagraphNeighbor, this.practiceParagraphBrown];


  practiceParagraphEnglish = ['Hey how are you?', 'My name is Steven!', 'Do you live around here?']
  testWord1 = 'hows are your?';
  testWord2 = 'how are you?';
  num = this.checkSentence.checkPercent(this.testWord1,this.testWord2);

  ngOnInit(): void {
    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
    console.log(this.translateBtn);
    this.recordAudio.voiceActiveSectionDisabledChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionDisabled = change
    );

    this.recordAudio.voiceTextReadyChanged.subscribe(
      (change: boolean) => this.voiceTextReady = change
    );

    this.recordAudio.voiceActiveSectionSuccessChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionSuccess = change
    );

    this.recordAudio.voiceActiveSectionErrorChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionError = change
    );

    this.recordAudio.voiceActiveSectionListeningChanged.subscribe(
      (change: boolean) => this.voiceActiveSectionListening = change
    );

    this.recordAudio.voiceTextChanged.subscribe(
      (change: any) => this.voiceText = change
    );

    this.voiceActiveSectionDisabled = this.recordAudio.voiceActiveSectionDisabled;
  	this.voiceActiveSectionError = this.recordAudio.voiceActiveSectionError;
  	this.voiceActiveSectionSuccess = this.recordAudio.voiceActiveSectionSuccess;
  	this.voiceActiveSectionListening = this.voiceActiveSectionListening;
  	this.voiceText = this.recordAudio.voiceText;
    this.voiceTextReady = this.recordAudio.voiceTextReady;
  }

  onStartVoiceRecognition(){
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.startVoiceRecognition();
  }

  onCloseVoiceRecognition(){
    this.recordAudio.setLanguage(this.langFrom.value);
    this.recordAudio.closeVoiceRecognition();
  }

  onStart(){
    this.currentSentence = this.practiceParagraphBrown[this.sentenceCounter];
  }
  onCheck(){
    this.score = this.checkSentence.checkPercent(this.currentSentence,this.voiceText);
    if(this.score > .8){
      this.sentenceCounter +=1;
      this.conversationSentence = this.practiceParagraphNeighbor[this.sentenceCounter-1];
      this.currentSentence = this.practiceParagraphBrown[this.sentenceCounter];
      let audio = new Audio();
      audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];

    audio.load();
    audio.play();
    }
    else if(this.score < .8){
      this.guideSentence = 'Try again :)'
    }
    if(this.practiceParagraphBrownAudio.length === this.sentenceCounter){
      this.guideSentence = 'You are done! Good job!';
    }
  }

  onListenToSentence(){
    let audio = new Audio();
    audio.src = this.practiceParagraphBrownAudio[this.sentenceCounter];
    audio.load();
    audio.play();
  }

  onListenAgain(){
    let audio = new Audio();
    audio.src = this.practiceParagraphNeighborAudio[this.sentenceCounter -1];
    audio.load();
    audio.play();
  }

  private translateBtn: any;

  send(paragraphSel: string) {

    if(paragraphSel === 'userAudio'){
      paragraphSel = this.voiceText;
      console.log(paragraphSel);
    }
    else if(paragraphSel === 'brown'){
      paragraphSel = this.practiceParagraphBrown[this.sentenceCounter];
      console.log(paragraphSel);

    }
    else if(paragraphSel === 'neighbor'){
      paragraphSel = this.practiceParagraphNeighbor[this.sentenceCounter -1];
      console.log(paragraphSel);

    }
    else{
      paragraphSel = 'Could not translate';
      console.log(paragraphSel);
    }

    const googleObj: GoogleObj = {
      q: [paragraphSel, this.data.description, this.data.detail],
      target: this.langTo.value
    };

    this.translateBtn.disabled = true;

    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtn.disabled = false;
        this.data = {
          title: res.data.translations[0].translatedText.replace(/&#39;/g, "'"),
          // title: res.data.translations[0].translatedText,
        	description: res.data.translations[1].translatedText,
        	detail: res.data.translations[2].translatedText
        };
        console.log(this.data);
      },
      err => {
        console.log(err);
      }
    );
  }
}

