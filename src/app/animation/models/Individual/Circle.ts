import { Individual, Team } from './Individual';
import { v4 as uuidv4 } from 'uuid';

export class Circle extends Individual {
  private ctx:CanvasRenderingContext2D;
  private radius:number;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    radius: number,
    team: Team
  ) {
    super("circle_" + uuidv4(), x, y, team);
    this.ctx = ctx;
    this.radius = radius;
  }

  override move(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  override draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
