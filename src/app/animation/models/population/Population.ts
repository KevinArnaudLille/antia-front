import { Individual } from '../Individual/Individual';

export class Population {
  private populationIndividuals: Array<Individual> = [];

  constructor() {}

  addIndividual(individual: Individual) {
    this.populationIndividuals.push(individual);
  }

  getIndividuals(){
    return this.populationIndividuals;
  }
}
