export class Individual {
  protected id: string;
  protected x: number;
  protected y: number;
  protected team: Team;
  protected color: string;
  protected isDead: boolean;

  constructor(id: string, x: number, y: number, team: Team) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.team = team;
    if (team == Team.BLUE) {
      this.color = 'blue';
    } else {
      this.color = 'red';
    }
  }

  getId(): string {
    return this.id;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  draw() {}
  move(x: number, y: number) {}
}

export enum Team {
  BLUE,
  RED,
}
