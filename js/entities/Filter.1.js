"use strict";
class Filter {
    /**
     * @param  {string} type
     * @param  {string} name
     * @param  {number|undefined} frequency
     * @param  {number|undefined} Q
     * @param  {number|undefined} gain
     * @param  {boolean} status
     */
    constructor(type, name, frequency, Q, gain, status) {
        this.type = type;
        this.name = name;
        this.frequency = frequency;
        this.Q = Q;
        this.gain = gain;
        this.status = status;
    }
}
