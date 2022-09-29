function randomColor(G) {
    let n = G.length;
    let A = new Array(n);
    for (let i = 0; i < n; i++) {
        A[i] = floor(random(1, n + 1));
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