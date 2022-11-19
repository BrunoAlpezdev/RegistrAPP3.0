import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('es');
	this.translateService.addLangs(['es','fr','ᒲ╎リᒷ ᓵ∷ᒷᔑℸ ̣ ᒷ','en','한국어']);
  }
  title = 'RegistrAPP3.0';
}
