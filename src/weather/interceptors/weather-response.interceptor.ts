import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transformData(data)));
  }

  private transformData(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.transformData(item));
    } else if (typeof data === 'object' && data !== null) {
      const currentData = data.current;
      const transformedData = {
        sunrise: currentData.sunrise,
        sunset: currentData.sunset,
        temp: currentData.temp,
        feels_like: currentData.feels_like,
        pressure: currentData.pressure,
        humidity: currentData.humidity,
        uvi: currentData.uvi,
        wind_speed: currentData.wind_speed,
      };
      return transformedData;
    } else {
      return data;
    }
  }
}
