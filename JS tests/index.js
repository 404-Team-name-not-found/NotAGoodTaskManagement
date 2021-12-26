import { Player, Enemy } from "./entity.js";
import { HP, Gun, Knife } from "./Props.js";
import { GlobalKeyboardListener } from "node-global-key-listener";
const v = new GlobalKeyboardListener();

let props = [];

const map = Array.from(Array(11), () => new Array(11));
let Hp = new HP(randomePosition(), "HP");
let gun = new Gun(randomePosition(), "Gun");
let knife = new Knife(randomePosition(), "knife");

props = [Hp, gun, knife];

function randomePosition() {
  let newPosition = {
    x: Math.round(Math.random() * 10 - 1),
    y: Math.round(Math.random() * 10 - 1),
  };
  return newPosition;
}
const enemy = new Enemy(20, 30, randomePosition());
const player = new Player(10, randomePosition());
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    map[i][j] = 0;
  }
}

let GamePropsList = [player, enemy, ...props];
GamePropsList.forEach((gameProp) => {
  map[gameProp.position.x][gameProp.position.y] = gameProp.emoji;
});

console.log(map);

// todo -- //

// 1) create the script above inside of a function calld game live , which we will invoke
// and set it all inside a While true loop and it will end either we got to the chack point, lost
// or presed an exit button

// 2) create a Walking methods for the Player

// 3 ) Create functins to take damge or atack Enemy
