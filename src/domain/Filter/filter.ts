export abstract class Filter<T, K = T> {
  readonly config: K;
  constructor(config: K) {
    this.config = config;
  }

  matches(testValue: T) {
    return Object.is(testValue, this.config);
  }
}
