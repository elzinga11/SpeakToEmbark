import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NextSentenceService {
    constructor(){}

    onIsReady(isReady: boolean){
        return true;
    }
}