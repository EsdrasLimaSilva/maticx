export class Node<T> {
  value: T;
  next: Node<T> = null;

  constructor(value: T) {
    this.value = value;
  }

  setNext(node: Node<T>) {
    this.next = node;
  }

  getNext() {
    return this.next;
  }

  getValue() {
    return this.value;
  }
}
