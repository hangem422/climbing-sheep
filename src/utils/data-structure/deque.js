import Node from './list-node.js';

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get front() {
    if (this.head) return this.head.value;
    return undefined;
  }

  get back() {
    if (this.tail) return this.tail.value;
    return undefined;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  pushFront(value) {
    const node = new Node(value);

    if (this.length > 0) {
      node.next = this.head;
      this.head.prev = node;
    } else {
      this.tail = node;
    }

    this.head = node;
    this.length += 1;
  }

  pushBack(value) {
    const node = new Node(value);

    if (this.length > 0) {
      this.tail.next = node;
      node.prev = this.tail;
    } else {
      this.head = node;
    }

    this.tail = node;
    this.length += 1;
  }

  popFront() {
    if (this.length === 0) return undefined;

    const temp = this.head;
    this.head = temp.next;

    if (this.head) this.head.prev = null;
    else this.tail = null;

    this.length -= 1;
    return temp.value;
  }

  popBack() {
    if (this.length === 0) return undefined;

    const temp = this.tail;
    this.tail = temp.prev;

    if (this.tail) this.tail.next = null;
    else this.head = null;

    this.length -= 1;
    return temp.value;
  }

  generateValues(from = 0, to = this.length) {
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
        yield node.value;

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

export default Deque;
