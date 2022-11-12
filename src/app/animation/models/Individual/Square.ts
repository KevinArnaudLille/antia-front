import { Individual, Team } from './Individual';
import { v4 as uuidv4 } from 'uuid';

export class Square extends Individual {
  private ctx: CanvasRenderingContext2D;
  private length: number;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    length: number,
    team: Team
  ) {
    super('square_' + uuidv4(), x - (length / 2), y - (length / 2), team);
    this.ctx = ctx;
    this.length = length;
  }

  override move(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  override draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x - (this.length / 2), this.y - (this.length / 2), this.length, this.length);
  }
}
