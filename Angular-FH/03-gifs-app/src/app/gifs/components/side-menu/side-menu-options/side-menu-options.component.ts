import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption
{
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}

@Component( {
  selector: 'gifs-side-menu-options',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './side-menu-options.component.html',
} )
export class SideMenuOptionsComponent
{
  gifsService = inject( GifService );

  menuOptions: MenuOption[] =
    [
      {
        icon: "fa-solid fa-chart-line",
        label: "Trending",
        subLabel: "Gifs populares",
        route: "/dashboard/trending"
      },
      {
        icon: "fa-solid fa-magnifying-glass",
        label: "Buscador",
        subLabel: "Buscar gifs",
        route: "/dashboard/search"
      },
    ]
}
