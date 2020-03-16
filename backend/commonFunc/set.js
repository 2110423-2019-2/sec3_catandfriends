class set {
    constructor() { }

    isIntersect(a, b) {
        let x = [a, b].sort((a, b) => {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        });
        a = x[0]; b = x[1];
        return (a[1] > b[0]);
    }
}

module.exports = new set();