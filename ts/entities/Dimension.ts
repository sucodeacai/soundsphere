class Dimension {
  name: string;
  tag: string;
  constructor(name: string, tag: string) {
    this.name = name;
    this.tag = tag;
  }
}
function generatorDimensions() {
  let listDimension = [];
  listDimension.push(new Dimension("A - Amargo", "A"));
  listDimension.push(new Dimension("D - Doce", "D"));
  return listDimension;
}
