import { effect, inject, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = (): Character[] =>
{
  const characters = localStorage.getItem( "Characters" );

  return characters ? JSON.parse( characters ) : [];
}

@Injectable( { providedIn: "root" } )
export class DragonballService
{
  characters = signal<Character[]>( loadFromLocalStorage() );

  saveToLocalStorage = effect(
    () =>
    {
      localStorage.setItem( "Characters", JSON.stringify( this.characters() ) );
    }
  );

  addCharacter( character: Character )
  {
    this.characters.update(
      ( list ) => [ ...list, character ]
    )
  }

}

// DI injeccion de dependencias
