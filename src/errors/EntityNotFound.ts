export class EntityNotFound extends Error {
  constructor(private entity: string) {
    super();
    this.entity = entity;
  }

  message = `Entity ${this.entity} not found`;
  name: 'Error';
}
