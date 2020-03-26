class ControlFilters {
    filtros: Filter[] = [];
    constructor() {
        this.createFilters();
    }
    createFilters() {
        this.filtros = [];
        let lowPass = new Filter("lowpass", "Low Pass", 0, 0, undefined, true);
        let highPass = new Filter("highpass", "High Pass", 0, 0, undefined, true);
        let bandpass = new Filter("bandpass", "Band Pass", 0, 0, undefined, true);
        let lowshelf = new Filter("lowshelf", "Low Shelf", 0, undefined, 0, true);
        let highshelf = new Filter("highshelf", "High Shelf", 0, undefined, 0, true);
        let peaking = new Filter("peaking", "Peaking", 0, 0, 0, true);
        let notch = new Filter("notch", "Notch", 0, 0, undefined, true);
        let allpass = new Filter("allpass", "All Pass", 0, 0, undefined, true);
        this.filtros.push(lowPass, highPass, bandpass, lowshelf, highshelf, peaking, notch, allpass);

    }
    getfilters() {
        return this.filtros;
    }
    getFilter(position: number): Filter {
        this.createFilters();
        return this.filtros[position];

    }

}