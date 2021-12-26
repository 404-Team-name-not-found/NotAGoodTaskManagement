class Entity {
  constructor(hp, attack, position) {
    this.hp = hp;
    this.attack = attack;
    this.position = position;
  }
  attackEnemy(playerEnemy) {
    playerEnemy.hp -= this.attack;
    if (playerEnemy.hp < 0) {
      return ture;
    }
    return false;
  }
}

class Enemy extends Entity {
  constructor(hp, attack, position) {
    super(hp, attack, position);
    this.type = "orc";
    this.emoji = "👾";
  }
}

class Player extends Entity {
  constructor(attack, position) {
    super(100, attack, position);
    this.name = "Player";
    this.emoji = "🚶";
  }

  moveUp() {
    if (this.position.y === 0) {
      return false;
    } else {
      this.position.y--;
      return true;
    }
  }
  moveDown(boardHeight) {
    if (this.position.y === boardHeight - 1) {
      return false;
    } else {
      this.position++;
      return true;
    }
  }
  moveLeft() {
    if (this.position.x === 0) {
      return false;
    } else {
      this.position.x--;
      return true;
    }
  }

  moveRight(boardWidth) {
    if (this.position.x === boardWidth - 1) {
      return false;
    } else {
      this.position.x++;
      return false;
    }
  }

  onPropStep(prop) {
    switch (prop.name) {
      case "HP":
        this.hp += 30;
        break;
      case "Gun":
        this.attack += 50;
        break;
      case "Sword":
        this.attack += 20;
        break;
    }
  }
}

export { Player, Enemy };
