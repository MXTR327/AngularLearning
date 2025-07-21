import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component( {
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class CharacterAddComponent
{
  name = signal( "" );
  power = signal( 0 );

  newCharacter = output<Character>();

  addCharacter()
  {
    if ( !this.name() || !this.power() || this.power() <= 0 )
    {
      return;
    }

    const newCharacter: Character =
    {
      // id: this.characters().length + 1,
      id: Math.floor( Math.random() * 1000 ), // Simulating an ID for simplicity
      name: this.name(),
      power: this.power(),
    }

    // this.characters.update(
    //   ( list ) => [ ...list, newCharacter ]
    // )
    this.newCharacter.emit( newCharacter );
    this.resetFields();
  }

  resetFields()
  {
    this.name.set( "" );
    this.power.set( 0 );
  }

}
