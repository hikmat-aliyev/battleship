export default function Ship(length) {
    let hits = 0;
    let isShipSunk = false;

    function hit() {
        hits++;
        if (hits >= length) {
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
        length: length,
    };
}
