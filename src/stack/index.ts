import { Node } from "../node";

export class Stack<T> {
  topNode: Node<T> = null;

  push(value: T) {
    const node = new Node(value);

    if (!this.isEmpty()) {
      node.setNext(this.topNode);
    } else {
      node.setNext(null);
    }

    this.topNode = node;
  }

  pop() {
    const node = this.topNode;
    this.topNode = node.getNext();
    node.setNext(null);

    return node.getValue();
  }

  top() {
    return this.topNode?.getValue() || null;
  }

  isEmpty() {
    return this.topNode === null;
  }
}
