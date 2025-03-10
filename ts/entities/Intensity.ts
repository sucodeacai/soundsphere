class Intensity {
  name: string;
  tag: number;
  constructor(name: string, tag: number) {
    this.name = name;
    this.tag = tag;
  }
}
function generatorIntensity() {
  let listIntensity = [];
  listIntensity.push(new Intensity("Mínimo", 1));
  listIntensity.push(new Intensity("Pouco", 2));
  listIntensity.push(new Intensity("Moderado", 3));
  listIntensity.push(new Intensity("Muito", 4));
  listIntensity.push(new Intensity("Máximo", 5));
  return listIntensity;
}
