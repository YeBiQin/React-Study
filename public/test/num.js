class Num {
  constructor() {
    this.number = 1;
  }
  getNumber() {
    return this.number;
  }

  addNum() {
    return ++this.number;
  }
}

export default new Num();
