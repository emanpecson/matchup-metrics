export class Queue<T> {
  private queue;

  constructor(arr: T[]) {
    this.queue = arr;
  }

  public enqueue(x: T): void {
    this.queue.push(x);
  }

  public dequeue(): T {
    const x = this.front();
    this.queue.shift();
    return x;
  }

  public front(): T {
    return this.queue[0];
  }

  public getQueue(): T[] {
    return this.queue;
  }

  public isEmpty(): boolean {
    return this.queue.length <= 0;
  }
}
