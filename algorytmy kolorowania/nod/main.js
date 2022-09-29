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
            if (Math.random() <= p) {
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

function randomColor(G) {
    let n = G.length;
    let A = new Array(n);
    for (let i = 0; i < n; i++) {
        A[i] = Math.floor(Math.random(1, n + 1));
    }
    return A;
}

function greedyColor(G) {
    let n = G.length;
    let colors = new Array(n);
    colors[0] = 1;
    for (let i = 1; i < n; i++) {
        for (let k = 1; k <= n; k++) {
            let d = true;
            for (let j = 0; j < n; j++) {
                if (G[i][j] == 1 && colors[j] == k) {
                    d = false;
                    break;
                }
            }
            if (d) {
                colors[i] = k;
                break;
            }
        }
    }
    return colors;
}

function LFColor(G) {
    let order = sortedIndexOrder(graphDegree(G));
    let n = G.length;
    let colors = new Array(n);
    colors[order[0]] = 1;
    for (let h = 1; h < n; h++) {
        let i = order[h];
        for (let k = 1; k <= n; k++) {
            let d = true;
            for (let j = 0; j < n; j++) {
                if (G[i][j] == 1 && colors[j] == k) {
                    d = false;
                    break;
                }
            }
            if (d) {
                colors[i] = k;
                break;
            }
        }
    }
    return colors;
}

function min (arr) {
    let m = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < m) {
            m = arr[i];
        }
    }
    return m;
} 

function max (arr) {
    let m = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > m) {
            m = arr[i];
        }
    }
    return m;
} 

function SLColor(G) {
    let n = G.length;
    let degs = graphDegree(G);
    let order = new Array(n);
    let MAX_INT = 9999;
    for (let i = 0; i < n; i++) {
        let ind = degs.indexOf(min(degs));
        order[n - i - 1] = ind;
        degs[ind] = MAX_INT;
    }
    let colors = new Array(n);
    colors[order[0]] = 1;
    for (let h = 1; h < n; h++) {
        let i = order[h];
        for (let k = 1; k <= n; k++) {
            let d = true;
            for (let j = 0; j < n; j++) {
                if (G[i][j] == 1 && colors[j] == k) {
                    d = false;
                    break;
                }
            }
            if (d) {
                colors[i] = k;
                break;
            }
        }
    }
    return colors;
}

function SLFColor(G) {
    let n = G.length;
    let degs = graphDegree(G);
    let colors = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        let satu = graphSaturation(G, colors);
        let sat = satu.filter(function (value, index, number) {
            return colors[index] == 0;
        });
        let msat = max(sat);
        let msv = new Array();
        for (let j = 0; j < n; j++) {
            if (satu[j] == msat && colors[j] == 0) {
                msv.push(j);
            }
        }
        let msdv = new Array();
        for (let j = 0; j < msv.length; j++) {
            if (colors[msv[j]] == 0) {
                msdv.push(degs[msv[j]]);
            }
        }

        let ind = 0;
        let m = max(msdv);
        while (m != degs[ind] || colors[ind] > 0) {
            ind += 1;
        }
        for (let k = 1; k <= n; k++) {
            let d = true;
            for (let j = 0; j < n; j++) {
                if (G[ind][j] == 1 && colors[j] == k) {
                    d = false;
                    break;
                }
            }
            if (d) {
                colors[ind] = k;
                break;
            }
        }
    }
    return colors;
}

function main () {
    let g;
    let n = [100, 300, 500, 800, 1000];
    let p = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    let repeatNum = 100;
    console.time("test");
    console.timeEnd("test");
    for (let i = 0; i < n.length; i++) {
        for (let j = 0; j < p.length; j++) {
            console.time(n[i] + "/" + p[j]);
            for (let k = 0; k < repeatNum; k++) {
                g = Gnp(n[i], p[j]);
                SLFColor(g);
            }
            console.timeEnd(n[i] + "/" + p[j]);
        }
    }
}

main();