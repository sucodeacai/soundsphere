class Filter {
    type: string;
    name: string;
    frequency: number | undefined;
    Q: number | undefined;
    gain: number | undefined;
    status: boolean;
    /**
     * @param  {string} type
     * @param  {string} name
     * @param  {number|undefined} frequency
     * @param  {number|undefined} Q
     * @param  {number|undefined} gain
     * @param  {boolean} status
     */
    constructor(type: string, name: string, frequency: number | undefined, Q: number | undefined, gain: number | undefined, status: boolean) {
        this.type = type;
        this.name = name;
        this.frequency = frequency;
        this.Q = Q;
        this.gain = gain;
        this.status = status;

    }

}

