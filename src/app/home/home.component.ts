import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RequestI } from '../models/req-res-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { error, log } from 'console';
import { WeatherModel } from '../models/weather-model';
import { CommonModule, formatDate } from '@angular/common';
import { catchError, map, throwError } from 'rxjs';

import {
  DateWiseWeather,
  ForecastWeatherModel,
  List,
} from '../models/forecast-weather-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  weather?: ForecastWeatherModel;
  icon: string = '';
  date?: Date;
  error?: string;
  dates: Array<any> = [];

  dateWiseData: Array<DateWiseWeather> = [];
  selectedWeather?: DateWiseWeather;

  selectedWeatherTime?: List = undefined;

  constructor(private apiService: ApiService) {}

  getData(city: any) {
    this.error = undefined;
    this.dates = [];
    this.dateWiseData = [];
    const req: RequestI = {
      path: 'forecast',
      queryParam: {
        q: city.search ?? '',
        units: 'metric',
        appid: this.apiService.APIKEY,
      },
    };

    this.apiService
      .get<ForecastWeatherModel>(req)
      .pipe(
        catchError((error) => {
          if (!error.error) {
            return throwError('error');
          }
          if (error.error.message != null) {
            this.error = error.error.message;
          }

          return throwError('error');
        })
      )
      .subscribe((res) => {
        this.weather = res;
        this.getDate(res);
      });
  }

  getIcon() {
    return (
      'http://openweathermap.org/img/wn/' +
      this.selectedWeatherTime?.weather[0].icon +
      '@4x.png'
    );
  }

  selectedBorderColor(i: DateWiseWeather) {
    if (i.isSelected == true) {
      return 'background: white; color: black';
    } else {
      return '';
    }
  }

  onTapDate(i: DateWiseWeather) {
    this.dateWiseData.map(d =>{
      d.isSelected = false;
    });
    i.isSelected = true;
     this.selectedWeather = i;
   
      this.dateWiseData.map((d) => {
        d.data?.map((a) => {
          a.isSelected = false;
        });
      });
     this.selectedWeatherTime = i.data != undefined ? i.data[0] : undefined;
     i.data != undefined ? i.data[0].isSelected = true : undefined;
  }

  onTapTime(i : List){
    this.dateWiseData.map((d) => {
      d.data?.map(a =>{
        a.isSelected = false;
      })
    });
    i.isSelected = true;
    this.selectedWeatherTime = i;
  }

  getDate(res: ForecastWeatherModel) {
    for (let i: number = 0; i < (res.list.length ?? 0); i++) {
      var temp: Date = new Date(res.list[i].dt * 1000 ?? 0);

      const format = 'MM/dd/yyyy';

      const locale = 'en-US';
      const formattedDate = formatDate(temp, format, locale);

      if (this.dates?.includes(formattedDate) == false) {
        this.dates?.push(formattedDate);
      }
    }

    for (let i = 0; i < this.dates.length; i++) {
      var ttData: Array<List> = [];
      for (let j = 0; j < res.list.length; j++) {
        var temp: Date = new Date(res.list[j].dt_txt);
        const format = 'MM/dd/yyyy';
        const locale = 'en-US';
        const formattedDate = formatDate(temp, format, locale);
        if (this.dates[i] == formattedDate) {
          ttData.push(res.list[j]);
        }
      }

      let tempData: DateWiseWeather = {
        date: this.dates[i],
        data: ttData,
      };
      this.dateWiseData.push(tempData);
    }

    this.selectedWeather = this.dateWiseData[0];
    this.dateWiseData[0].isSelected = true;
    this.selectedWeatherTime =
      this.dateWiseData != undefined && this.dateWiseData[0].data != undefined
        ? this.dateWiseData[0].data[0]
        : undefined;

        this.dateWiseData != undefined && this.dateWiseData[0].data != undefined
          ? this.dateWiseData[0].data[0].isSelected = true
          : false;

    console.log(this.dateWiseData);
  }
}
