class Planet {
    constructor(name, diameter) {
        this.name = name;
        this.diametr = diameter;
        this.volume = this.calculateVolume();

    }

    calculateVolume() {
      return  4 / 3 * 3.14 * Math.pow(this.diametr / 2, 3);
    }

    showInfo() {
        console.log('Планета ' + this.name + ' має об\'єм ' + this.volume);
    }
}

class Earth extends Planet {
}

let earth = new Earth("Земля", 13);
earth.showInfo();