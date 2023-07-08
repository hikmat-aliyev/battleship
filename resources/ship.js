function Ship(length) {
    let hits = 0;
    let isShipSunk = false;
    let length = length;

    function hit() {
        hits++;
        if(hits >= length){
            isShipSunk = true;
        }
        return hits;
    }

    function isSunk() {
        return isShipSunk;
    }

    return {
        hit: hit,
        isSunk: isSunk,
        length: length
    };
}

module.exports = Ship;