import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RequestI } from '../models/req-res-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { log } from 'console';
import { WeatherModel } from '../models/weather-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  weather?: WeatherModel;
  icon : string = "";
  date? : Date;
  constructor(private apiService: ApiService) {}

  getData(city: any) {
    const req: RequestI = {
      path: 'weather',
      queryParam: {
        q: city.search ?? '',
        units:'metric',
        appid: this.apiService.APIKEY,
      },
    };

    this.apiService.get<WeatherModel>(req).subscribe((res) => {
      this.weather = res;
      
     this.icon =
       "http://openweathermap.org/img/wn/"+res.weather[0].icon+"@4x.png";
       this.date = new Date(res.dt *1000);
      console.log(this.date);
      console.log(res.dt);
    });
  }
}
