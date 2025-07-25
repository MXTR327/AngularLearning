import
{
  afterEveryRender,
  afterNextRender,
  Component,
  effect,
  OnInit,
  signal,
} from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = ( ...messages: string[] ) =>
{
  console.log(
    `${messages[ 0 ]} %c${messages.slice( 1 ).join( ', ' )}`,
    'color: #bada55'
  );
};

@Component( {
  selector: 'home-page',
  imports: [ TitleComponent ],
  templateUrl: './home-page.component.html',
} )
export class HomePageComponent implements OnInit
{
  traditionalProperty = "Max";
  signalProperty = signal( "Max" );

  constructor()
  {
    log( 'Contructor llamado' );

    // setTimeout( () =>
    // {
    //    this.signalProperty.set( "Juan Carlos" );

    //    console.log( "Hecho" );
    // }, 2000 );
  }

  changeTraditional()
  {
    this.traditionalProperty = "Fernando Herrera";
  }

  changeSignal()
  {
    this.signalProperty.set( "Fernando Herrera" );
  }

  basicEffect = effect( ( onCleanup ) =>
  {
    log( 'effect', 'Disparar efectos secundarios' );

    onCleanup( () =>
    {
      log( 'onCleanup', "Se ejecuta cuando el efecto se va a destruir" );
    } );
  } );

  ngOnInit()
  {
    log( 'ngOnInit', "has initialized all the component's inputs." );
  }
  ngOnChanges()
  {
    console.log( 'ngOnChanges', "component's inputs have changed." );
  }
  ngDoCheck()
  {
    log( 'ngDoCheck', 'component is checked for changes.' );
  }
  ngAfterContentInit()
  {
    log( 'ngAfterContentInit', "component's content has been initialized." );
  }
  ngAfterContentChecked()
  {
    log(
      'ngAfterContentChecked',
      'component content has been checked for changes.'
    );
  }
  ngAfterViewInit()
  {
    log( 'ngAfterViewInit', "component's view has been initialized." );
  }
  ngAfterViewChecked()
  {
    log( 'ngAfterViewChecked', "component's view has been checked for changes." );
  }
  ngOnDestroy()
  {
    log( 'ngOnDestroy', 'Runs once before the component is destroyed.' );
  }

  afterNextRenderEffect = afterNextRender( () =>
  {
    log(
      'afterNextRender',
      'Runs once the next time that all components have been rendered to the DOM.'
    );
  } );

  afterRender = afterEveryRender( () =>
  {
    log(
      'afterEveryRender',
      'Runs every time all components have been rendered to the DOM.'
    );
  } );
}
