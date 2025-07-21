import { AvailableLocale } from './../../services/locale.service';
import
{
  DatePipe,
  LowerCasePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import
{
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { LocaleService } from '../../services/locale.service';
import { signal } from '@angular/core';

@Component( {
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export default class BasicPageComponent
{
  localeService = inject( LocaleService );
  currentLocale = signal( inject( LOCALE_ID ) );

  nameLower = signal( 'maxterpro123' );
  nameUpper = signal( 'MAXTER327' );
  fullName = signal( 'mAxTer pRos123' );

  customDate = signal( new Date() );

  tickingDateEffect = effect( ( onCleanup ) =>
  {
    const interval = setInterval( () =>
    {
      this.customDate.set( new Date() );
      console.log('tick')
    }, 1000 );

    onCleanup( () =>
    {
      clearInterval( interval );
    } )
  } );

  changeLocale( locale: AvailableLocale )
  {
    console.log( { locale } );
    this.localeService.changeLocale( locale );
  }
}
