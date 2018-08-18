import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';

const HEROES: Hero[] = [
  { id: 10, name: 'Mr. Ten' },
  { id: 11, name: 'Mr. Eleven' },
  { id: 12, name: 'Mr. Twelve' },
  { id: 13, name: 'Mr. Thirteen' },
  { id: 14, name: 'Mr. Fourteen' },
  { id: 15, name: 'Mr. Fifteen' },
  { id: 16, name: 'Mr. Sixteen' },
  { id: 17, name: 'Mr. Seventeen' },
  { id: 18, name: 'Mr. Eighteen' },
  { id: 19, name: 'Mr. Nineteen' },
];

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;

  selectedHero: Hero;

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit() {
  }

}
