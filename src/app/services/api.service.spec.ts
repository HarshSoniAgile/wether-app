import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestI } from '../models/req-res-model';

describe('ApiService', () => {
  let service: ApiService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }); 
    service = TestBed.inject(ApiService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('Get Method', () => {
      const request: RequestI = {
        path: 'weather',
        queryParam: {
          q: 'London',
          appid: service.APIKEY,
        },
      };

      service.get<any>(request).subscribe((response) => {
        expect(response).toBeTruthy(); 
      });
    });
});
