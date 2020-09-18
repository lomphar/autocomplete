import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AppService} from './app-service';
import {GeoData,DataCity, IGeoResponse} from './geo.class';
import {switchMap, debounceTime, distinctUntilChanged, startWith} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'geo';
  geodataForm: FormGroup;
  geoValues ='';
  isLoadingResults = false;
  filteredOptions: Observable<IGeoResponse>;
  private searchTerms = new Subject<string>();

  constructor(private formBuilder: FormBuilder, private AppService: AppService){}
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.geodataForm = this.formBuilder.group({
      geoInput: null,
      geoValues: new FormControl()
    })

    this.geodataForm.setValue({
      geoInput: null,
      //geoValues:this.geodataForm.get('searchBox.value')
      geoValues:"this value for test"
    })
    this.filteredOptions = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.AppService.searchGeoName(term)),
    );
   }
   displayFn(geodata: GeoData) {
    if (geodata) { return geodata.name+' , '+ geodata.adminName1+' , ' + geodata.countryName; }
  }

  onFormSubmit() {
  this.AppService.PostData(this.geodataForm.value)
  .subscribe((res: any) => {
      console.log(res.data)
      this.isLoadingResults = false;
      
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
