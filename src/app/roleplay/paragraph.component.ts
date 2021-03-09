import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { CheckSentence } from '../services/checksentence.service';
import { RecordAudio } from '../services/recordaudio.service';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})

export class RoleplayComponent implements OnInit {
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
  voiceTextReady: boolean = false;
  currentSentence: string = '';

  constructor(private recordAudio: RecordAudio, private checkSentence: CheckSentence) { }

  //Note that these practice paragraphs in spanish do not have accent marks or double question marks
  practiceParagraphBrown = ['Buenos dias, soy su nuevo vecino. Me llamo Bejamin Brown.',
                            'Soy de California, en los Estados Unidos. Este barrio es muy bonito. Cuanto timepo ha vivido aqui?', 
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
  testWord1 = 'hows are your?';
  testWord2 = 'how are you?'; 
  num = this.checkSentence.checkPercent(this.testWord1,this.testWord2);
  
  ngOnInit(): void {
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
  }
  
  onStartVoiceRecognition(){
    this.recordAudio.startVoiceRecognition();
  }

  onCloseVoiceRecognition(){
    this.recordAudio.closeVoiceRecognition();
  }

  onStart(){
    var i = 0;
    this.currentSentence = this.practiceParagraphBrown[0];
  }
}
