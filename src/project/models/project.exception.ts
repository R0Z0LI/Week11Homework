class NotManagerException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotManagerException';
  }
}
