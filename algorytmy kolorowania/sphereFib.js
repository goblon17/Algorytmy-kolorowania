function sphereFib(n, R) {
    let points = new Array();
    let phi = PI * (3.0 - sqrt(5.0));
    let epsilon = 0.33
    if (n >= 24) {
        epsilon = 1.33
    }

    for (let i = 0; i < n; i++) {
        let y = 1 - ((i + epsilon) / (n - 1.0 + 2 * epsilon)) * 2;
        let r = sqrt(1 - y * y);
        let theta = phi * i;
        let x = cos(theta) * r;
        let z = sin(theta) * r;
        points.push([x * R, y * R, z * R]);
    }
    return points;
}