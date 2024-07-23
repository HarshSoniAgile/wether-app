import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ForecastWeatherModel, List } from '../models/forecast-weather-model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;
  let apiService : ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('Display the weather data if city name is valid', () => {
    const tempWeather: ForecastWeatherModel = {
      city: { name: 'Ahmedabad' },
      list: [],
    };

    component.weather = tempWeather;

    fixture.detectChanges();

    const cityName = element.querySelector('.weather__city');
    console.log(cityName?.textContent);

    expect(cityName?.textContent).toContain('Ahmedabad');
  });

  it('correct weather details', () => {
    const tempData: List = {
      dt: 1721217600,
      main: {
        temp: 32.02,
        feels_like: 39.02,
        temp_min: 32.02,
        temp_max: 32.34,
        pressure: 997,
        sea_level: 997,
        grnd_level: 992,
        humidity: 66,
        temp_kf: -0.32,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d',
        },
      ],
      clouds: {
        all: 75,
      },
      wind: {
        speed: 5.49,
        deg: 175,
        gust: 5.32,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: 'd',
      },
      dt_txt: '2024-07-17 12:00:00',
    } as List;

    const tempWeather: ForecastWeatherModel = {
      city: { name: 'Ahmedabad' },
      list: [],
    };

    component.weather = tempWeather;

    component.selectedWeatherTime = tempData;
    fixture.detectChanges();
    console.log(component.selectedWeatherTime);

    const tempMin = element.querySelector('.weather__minmax p:nth-child(1)');
    const tempMax = element.querySelector('.weather__minmax p:nth-child(2)');
    const realFeel = element.querySelector('.weather__realfeel');
    const humidity = element.querySelector('.weather__humidity');
    const wind = element.querySelector('.weather__wind');
    const pressure = element.querySelector('.weather__pressure');

    console.log(realFeel?.textContent);

    expect(tempMin?.textContent).toContain('Min: 32.02');
    expect(tempMax?.textContent).toContain('Max: 32.34');
    expect(realFeel?.textContent).toContain('39.02');
    expect(humidity?.textContent).toContain('66 %');
    expect(wind?.textContent).toContain('5.49 m/s');
    expect(pressure?.textContent).toContain('997 hpa');
  });

  it('Display error when city not found', () => {
    component.error = 'City not found';
    fixture.detectChanges();

    const errorMessage = element.querySelector('.error');

    expect(errorMessage?.textContent).toContain('City not found');
  });

  it('fetch data from api', ()=> {

     const tempWeather: ForecastWeatherModel = {
       city: { name: 'Ahmedabad' },
       list: [
         {
           dt: 1721217600,
           main: {
             temp: 32.02,
             feels_like: 39.02,
             temp_min: 32.02,
             temp_max: 32.34,
             pressure: 997,
             sea_level: 997,
             grnd_level: 992,
             humidity: 66,
             temp_kf: -0.32,
           },
           weather: [
             {
               id: 803,
               main: 'Clouds',
               description: 'broken clouds',
               icon: '04d',
             },
           ],
           clouds: {
             all: 75,
           },
           wind: {
             speed: 5.49,
             deg: 175,
             gust: 5.32,
           },
           visibility: 10000,
           pop: 0,
           sys: {
             pod: 'd',
           },
           dt_txt: '2024-07-17 12:00:00',
         },
       ],
     };

     spyOn(apiService, 'get').and.returnValue(of(tempWeather));
     component.getData({ search: 'Ahmedabad' });
     fixture.detectChanges();

     expect(component.weather?.city.name).toBe('Ahmedabad');
     expect(component.selectedWeatherTime?.main?.temp).toBe(32.02);




  });


});
