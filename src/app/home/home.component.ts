import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Square } from '../animation/models/Individual/Square';
import { Population } from '../animation/models/population/Population';
import { Circle } from '../animation/models/Individual/Circle';
import { WebsocketanimationService } from '../services/websocketanimation.service';
import { Individual, Team } from '../animation/models/Individual/Individual';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() testValue = '';

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null;

  private square: Square;
  private population: Population;

  private fpsInterval: number;
  private then: number;
  private startTime: number;
  private frameNb: number;

  constructor(private wSAnimationService: WebsocketanimationService) {}

  ngOnInit(): void {
    let element = this.canvas.nativeElement;
    this.ctx = element.getContext('2d');
  }

  connectClicked() {
    this.wSAnimationService.initWebSocket().then(() => {
      this.wSAnimationService.subscribe('topic');
    });
  }

  loadAnim() {
    this.fpsInterval = 1000 / 30;
    this.population = new Population();
    if (this.ctx) {
      this.population.addIndividual(new Circle(580, 80, this.ctx, 10, Team.BLUE));
      this.population.addIndividual(new Circle(580, 280, this.ctx, 10, Team.BLUE));
      this.population.addIndividual(new Circle(560, 260, this.ctx, 10, Team.BLUE));
      this.population.addIndividual(new Circle(560, 100, this.ctx, 10, Team.BLUE));
      // this.population.addIndividual(new Square(580, 180, this.ctx, 20, Team.BLUE));
      this.population.addIndividual(new Circle(20, 20, this.ctx, 10, Team.RED));
      this.population.addIndividual(new Circle(20, 50, this.ctx, 10, Team.RED));
      this.population.addIndividual(new Circle(20, 110, this.ctx, 10, Team.RED));
      this.population.addIndividual(new Circle(50, 200, this.ctx, 10, Team.RED));
      // this.population.addIndividual(new Circle(220, 110, this.ctx, 10, Team.RED));
    }
    
    // TODO: remove at some point
    console.log(JSON.stringify(this.population));
    
    this.wSAnimationService.send('animation', this.population);
  }
  
  runAnim() {
    this.frameNb = 0;
    this.then = Date.now();
    this.startTime = this.then;
    this.animate();
  }

  animate(): void {
    // [TEMP] to end loop
    if (this.frameNb >= Object.keys(this.wSAnimationService.getFrames()).length) {
      console.log("++++++ THE END +++++");
      return;
    }

    requestAnimationFrame(() => this.animate());

    let now: number = Date.now();
    let elapsed: number = now - this.then;

    if (this.then === this.startTime) {
      this.population.getIndividuals().forEach(
        indiv => indiv.draw()
      )
      this.frameNb++;
    }

    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      
      if (this.ctx) {
        this.ctx.clearRect(0, 0, 600, 300);
      }
      
      if (this.wSAnimationService.getFrames()) {
        this.population.getIndividuals().forEach((frontIndividual) => {
          this.wSAnimationService
          .getFrames()
          [this.frameNb].populationIndividuals.forEach(
            (backIndividual: { id: string; x: number; y: number; dead : boolean }) => {
              if ((frontIndividual.getId() == backIndividual.id) && !backIndividual.dead) {
                frontIndividual.move(backIndividual.x, backIndividual.y);
              }
            }
            );
          });
        }
        
        this.frameNb++;
        console.log(this.frameNb);
      }
    }
  }
  