import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent,
    }
];
