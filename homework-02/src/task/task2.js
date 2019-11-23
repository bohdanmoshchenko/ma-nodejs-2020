class Planet {
  constructor(name, diameter) {
    this.name = name;
    this.diametr = diameter;
    this.volume = this.calculateVolume();
  }

  calculateVolume() {
    return (4 / 3) * 3.14 * Math.pow(this.diametr / 2, 3);
  }

  showInfo() {
    const msg = `Планета ${this.name} має об'єм ${this.volume}`;
    console.log(msg);
  }
}

class Earth extends Planet {}

module.exports = new Earth('Земля', 12);
