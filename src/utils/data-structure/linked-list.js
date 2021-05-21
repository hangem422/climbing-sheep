import Node from './list-node.js';

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    this.psuhNode(node);
  }

  psuhNode(node) {
    if (!(node instanceof Node)) return;

    if (this.length > 0) {
      this.tail.next = node;
      node.prev = this.tail;
    } else {
      this.head = node;
    }

    this.tail = node;
    this.length += 1;
  }

  delete(value) {
    for (let node = this.head; node; node = node.next) {
      if (node.value === value) this.deleteNode(node);
    }
  }

  deleteNode(node) {
    if (!(node instanceof Node)) return;

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (this.head === node) this.head = node.next;
    if (this.tail === node) this.tail = node.prev;

    this.length -= 1;
  }

  generateNodes(from = 0, to = this.length) {
    if (to > this.length) {
      const message = 'The value "to" must be less than or equal to the length';
      throw ReferenceError(message);
    }
    if (from > to) {
      const message = 'The value "from" must be less than the value "to"';
      throw ReferenceError(message);
    }

    let node = this.head;
    let index = from < 0 ? 0 : from;

    for (let i = 0; i < index; i += 1) {
      node = node.next;
    }

    return (function* dequeValuesGenerator() {
      while (node && index < to) {
        yield node;

        node = node.next;
        index += 1;
      }
    })();
  }

  [Symbol.iterator]() {
    return {
      node: this.head,
      next() {
        const done = this.node === null;
        const value = done ? undefined : this.node.value;
        if (!done) this.node = this.node.next;

        return { value, done };
      },
    };
  }
}

export default LinkedList;
