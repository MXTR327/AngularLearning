import { Component, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam( queryParam: string ): Region
{
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component( {
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
} )
export class ByRegionPageComponent
{
  countryService = inject( CountryService );
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject( ActivatedRoute );
  router = inject( Router );

  queryParam = this.activatedRoute.snapshot.queryParamMap.get( 'region' ) ?? '';

  selectedRegion = linkedSignal<Region>( () =>
    validateQueryParam( this.queryParam )
  );

  regionResource = rxResource( {
    params: () => ( {
      region: this.selectedRegion(),
    } ),
    stream: ( { params } ) =>
    {
      console.log( { params: params.region } );
      if ( !params.region ) return of( [] );

      this.router.navigate( ['/country/by-region'], {
        queryParams: {
          region: params.region,
        },
      } );
      return this.countryService.searchByRegion( params.region );
    },
  } );
}
