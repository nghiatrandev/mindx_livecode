import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City, Coordinates, Country, State } from '../model/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private cityService: CityService
  ) { }

  coordinates: Coordinates
  nearestCity: string = ""
  allCountry: string[]
  cities : string[]
  countries: Country[]
  displayedColumns: string[] = ['country', 'state', 'city'];
  dataSource : Array<City>;
  done = false

    // MatPaginator Inputs
    page = 1;
    perPage = 10;

  states : Array<State>
  ngOnInit() {
    this.coordinates = new Coordinates
    this.coordinates.lat = 0
    this.coordinates.lon = 0
    this.getAllCountry()

  }

  getNearestCity() {
    this.cityService.getNearstCity(this.coordinates).subscribe(data => {
      if (data['status'] == 'success') {
        this.nearestCity = data['data'].city
      }
    })
  }

  getAllCountry() {
    this.cityService.getCountries().subscribe(data => {
      if (data['status'] == 'success') {
        this.countries = data['data']
        this.getData()
      }
    })
  }


  async getState(CountryIndex: number): Promise<Array<State>> {

    return new Promise((resolve, reject) => {

      this.states = [];
        this.cityService.getState(this.countries[CountryIndex].country).subscribe(data => {
          if (data['status'] == 'success') {
            resolve(data['data'])
          }}
          );

        });}


  async getData() {
    this.done = false
    let country = this.countries[0]
    this.states = await this.getState(0)
    let stateIndex = 0
    let state = this.states[stateIndex]
    this.dataSource  = []


    let startIndex = (this.page - 1) * this.perPage
    let endIndex = this.page * this.perPage

    // this.getCity(country, state)

    // debugger
    while (this.dataSource.length < 10) {
      await this.getCity(country, state)
      stateIndex =+ 1
      state = this.states[stateIndex]
    }

  }

  async getCity(country: Country, state: State){

  this.cityService.getCities(country.country, state.state).subscribe(data => {
    if (data['status'] == 'success') {
      console.log(data)

      for (let i=0; i<data['data'].length; i++) {
        let city = new City
        city.city = data['data'][i].city;
        city.state = state.state;
        city.country = country.country
        this.dataSource.push(city)
      }
      console.log(this.dataSource)
      this.done = true
    }
  })
}

previousPage() {
  if (this.page > 1) {
    this.page = this.page - 1
    this.getData()
  }
}

nextPage() {
  this.page = this.page + 1
  console.log("page: "+this.page)
  this.getData()
}

}
