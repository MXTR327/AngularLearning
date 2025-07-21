import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface TopMenuOption
{
  icon: string,
  label: string,
  subLabel: string,
  route: string,
}

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent
{
  topMenuOptions: TopMenuOption[] = [
    {
      icon: "string",
      label: "string",
      subLabel: "string",
      route: "/country/by-capital",
    },

  ]
}
