import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnInit {

  sportsList = [
    { name: 'Tennis', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Tennis.png' },
    { name: 'Karate', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Karate.png' },
    { name: 'Rugby', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Rugby.png' },
    { name: 'Scrabble', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/karate.png' },
    { name: 'Softball', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Scrabble.png' },
    { name: 'Table Tennis', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Table Tennis.png' },
    { name: 'Volleyball', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Volleyball.png' },
    { name: 'Snooker', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Snooker.png' },
    { name: 'Swimming', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Swimming.png' },
    { name: 'Soccer', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Soccer.png' },
    { name: 'Aerobics', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Aerobics.png' },
    { name: 'Athletics', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Athletics.png' },
    { name: 'Darts', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Darts.png' },
    { name: 'Basketball', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Basketball.png' },
    { name: 'Bodybuilding', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Bodybuilding.png' },
    { name: 'Cricket', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Cricket.png' },
    { name: 'Dance', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Dance.png' },
    { name: 'Golf', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Golf.png' },
    { name: 'Hockey', coach: 'Zethembe Madlala', venue: 'Main Court', image: 'assets/images/Hockey.png' },
    { name: 'Indoor Soccer', coach: 'Sensei John', venue: 'Hall 2', image: 'assets/images/Indoor Soccer.png' },
    // Add other sports here
  ];

  constructor() { }

  ngOnInit() { }

}
