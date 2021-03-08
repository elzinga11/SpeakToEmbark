import { Component, NgZone } from '@angular/core';
import {SolutionService} from './services/solution.service';
import {Solution, GoogleObj} from './models/solution';
import {GoogletranslateService} from './services/googletranslate.service';
import {Form, FormControl} from '@angular/forms'

declare const annyang: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
	langFrom = new FormControl('en');
  constructor(private ngZone: NgZone, private solution: SolutionService,private google: GoogletranslateService){}

	initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

		if (annyang) {
			let commands = {

				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);
			annyang.setLanguage(this.langFrom);
      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;

		if(annyang){
      annyang.abort();
    }
	}



//Google API, move to better location later
langTo = new FormControl('en');
  data: Solution = {
    title: '',
    description: '',
    detail: ''
  };

  private translateBtn: any;


  ngOnInit() {
    this.solution.getSolution().subscribe(res => this.data = res);
    this.translateBtn = document.getElementById('translatebtn');
  }

   send() {
    const googleObj: GoogleObj = {
      q: [this.voiceText, this.data.description, this.data.detail],
      target: this.langTo.value
    };

    this.translateBtn.disabled = true;

    this.google.translate(googleObj).subscribe(
      (res: any) => {
        this.translateBtn.disabled = false;
        this.data = {
          title: res.data.translations[0].translatedText,
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
