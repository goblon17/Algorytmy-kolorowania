function Gnp(n, p) {
    if (!n || n <= 0) {
        return [];
    }
    let A = new Array(n);
    for (let i = 0; i < n; i++) {
        A[i] = new Array(n);
        A[i][i] = 0;
    }
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (random() <= p) {
                A[i][j] = 1;
                A[j][i] = 1;
            } else {
                A[i][j] = 0;
                A[j][i] = 0;
            }
        }
    }
    return A;
}

function add(accumulator, a) {
    return accumulator + a;
}

function graphDegree(G) {
    let n = G.length;
    let A = new Array(n);
    for (let i = 0; i < n; i++) {
        A[i] = G[i].reduce(add, 0);
    }
    return A;
}

function compar(a, b) {
    if (a[0] > b[0]) {
        return -1;
    }
    if (a[0] < b[0]) {
        return 1;
    }
    return 0;
}

function sortedIndexOrder(Vals) {
    let n = Vals.length;
    let A = new Array(n);
    for (let i = 0; i < n; i++) {
        A[i] = [Vals[i], i];
    }
    A.sort(compar);
    for (let i = 0; i < n; i++) {
        A[i] = A[i][1];
    }
    return A;
}

function graphSaturation(G, C) {
    let n = G.length;
    let A = new Array(n);
    for (let i = 0; i < n; i++) {
        A[i] = 0;
        let colors = new Array();
        for (let j = 0; j < n; j++) {
            if (G[i][j] == 1 && C[j] > 0 && !colors.includes(C[j])) {
                A[i] += 1;
                colors.push(C[j]);
            }
        }
    }
    return A;
}