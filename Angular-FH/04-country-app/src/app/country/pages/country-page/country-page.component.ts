import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component( {
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
} )
export class CountryPageComponent
{
  countryCode = inject( ActivatedRoute ).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource(
    {
      params: () => ( { code: this.countryCode } ),

      stream: ( { params } ) =>
      {
        return this.countryService.searchCountryByAlphaCode( params.code );
      }
    }
  )
}
