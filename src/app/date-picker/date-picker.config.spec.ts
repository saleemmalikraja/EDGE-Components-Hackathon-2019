import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { DateConfigService } from './date-picker.config';

describe('Date picker config', () => {
    let injector: TestBed;
    let service: DateConfigService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DateConfigService]
        });
        injector = getTestBed();
        service = injector.get(DateConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call LocaltoUTCDateConvetor method', () => {
        const inputDate = '02/12/2019 10:43'
        const UTCDate = service.LocaltoUTCDateConvetor(inputDate);
        expect(UTCDate).toBe("2/12/2019 05:13");
    });

    it('should call LocaltoUTCDateConvetor method with input date null', () => {
        const UTCDate = service.UTCtoLocalDateConvertor(null);
        expect(UTCDate).toBe('-');
    });

    it('should call UTCtoLocalDateConvertor method', () => {
        const inputDate = '02/12/2019 05:13'
        const localDate = service.UTCtoLocalDateConvertor(inputDate);        
        expect(localDate).toBe("12/02/2019 10:43 am");
    });

});
