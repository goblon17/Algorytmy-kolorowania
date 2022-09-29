const RANDOM = 'Losowy';
const GREEDY = 'Zachłanny';
const LF = 'Largest First';
const SL = 'Smallest Last';
const SLF = 'Saturated Largest First';
const RADIUS = 200;

let C = 0;
let angle = 0;
let p = 0;
let pp = 0;
let n = 0;
let nn = 0;
let cc = 0;
let graph = 0;
let verts = 0;
let randC = 0;
let nslider;
let pslider;
let gbaton;
let cbaton;
let cradio;
let FONT;
let dur = 0;
let repeatNum = 1000;

function preload() {
  FONT = loadFont('micross.ttf');
  C = [color(127, 127, 127), color(255, 0, 255), color(255, 0, 0), color(0, 0, 255),
       color(0, 255, 0), color(255, 255, 0), color(0, 255, 255), color(56, 17, 0),
       color(64, 0, 117), color(255, 153, 204), color(0, 153, 0), color(255, 153, 51),
       color(153, 51, 255)];
}

function setup() {
  createCanvas(800, 600, WEBGL);

  textFont(FONT);


  nslider = createSlider(2, C.length - 1, C.length / 2, 1);
  nslider.position(20, 20 * 3 + 5);
  pslider = createSlider(0, 1, 0.3, 0.1);
  pslider.position(20, 20 * 4 + 5);
  gbaton = createButton('Generuj graf i kolorowanie');
  gbaton.mousePressed(graphSetup);
  gbaton.position(20, height - 40 - gbaton.height);
  cbaton = createButton('Generuj kolorowanie');
  cbaton.mousePressed(colorSetup);
  cbaton.position(20 + gbaton.width, gbaton.y);

  cradio = createRadio();
  cradio.position(20, 20 * 2);
  cradio.option(RANDOM);
  cradio.option(GREEDY);
  cradio.option(LF);
  cradio.option(SL);
  cradio.option(SLF);

  cradio.selected(RANDOM);

  textSize(18);
}

function draw() {
  background(200);

  n = nslider.value();
  p = pslider.value();
  if (n != nn || p != pp) {
    graphSetup();
  }
  let c = cradio.value();
  if (c != cc) {
    colorSetup();
  }

  push();
  translate(-width / 2, -height / 2, 0);
  fill(0);
  text('Algorytm kolorowania:', 25, 35);
  text('n = ' + n, nslider.x * 2 + nslider.width, nslider.y + nslider.height);
  text('p = ' + p, pslider.x * 2 + pslider.width, pslider.y + pslider.height);
  text('Czas wykonania: ' + dur/repeatNum + "ms", gbaton.x + 2, gbaton.y + gbaton.height*2);
  pop();

  cc = c;
  pp = p;
  nn = n;

  translate(0, 10, 0);
  rotateX(angle);
  rotateY(angle);
  fill(255);

  for (let i = 0; i < n; i++) {

    push();
    noStroke();
    translate(verts[i][0], verts[i][1], verts[i][2]);
    fill(C[randC[i]]);
    sphere(10);
    pop();

    for (let j = i; j < n; j++) {
      if (graph[i][j] == 1) {
        push();
        noStroke();
        let mid = midPoint(verts[i], verts[j]);
        translate(mid[0], mid[1], mid[2]);
        let as = transAngles(verts[i], verts[j]);
        rotateZ(as[0]);
        rotateY(as[1]);
        let d = dist(verts[i][0], verts[i][1], verts[i][2], verts[j][0], verts[j][1], verts[j][2]);
        rotateZ(HALF_PI);
        if (randC[i] == randC[j]) {
          fill(163, 0, 0);
        }
        cylinder(2, d, 6, 1, false, false);
        pop();
      }
    }
  }

  angle += 0.01;
}

function midPoint(p1, p2) {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2];
}

function transAngles(P1, P2) {
  let m = midPoint(P1, P2);
  let x = [P1[0] - m[0], P1[1] - m[1], P1[2] - m[2]];
  if (x[0] * x[1] > 0) {
    x = [P2[0] - m[0], P2[1] - m[1], P2[2] - m[2]];
  }
  let a1 = atan(x[1] / x[0]);
  let a2 = atan(x[2] / dist(0, 0, x[0], x[1]));
  return [a1, a2];
}

function colorSetup() {
  let choice = cradio.value();
  let start = 0;
  switch (choice) {
    case RANDOM:
      start = window.performance.now();
      for (let i = 0; i < repeatNum; i++) {
        randC = randomColor(graph);
      }
      dur = window.performance.now() - start;
      break;

    case GREEDY:
      start = window.performance.now();
      for (let i = 0; i < repeatNum; i++) {
        randC = greedyColor(graph);
      }
      dur = window.performance.now() - start;
      break;

    case LF:
      start = window.performance.now();
      for (let i = 0; i < repeatNum; i++) {
        randC = LFColor(graph);
      }
      dur = window.performance.now() - start;
      break;

    case SL:
      start = window.performance.now();
      for (let i = 0; i < repeatNum; i++) {
        randC = SLColor(graph);
      }
      dur = window.performance.now() - start;
      break;

    case SLF:
      start = window.performance.now();
      for (let i = 0; i < repeatNum; i++) {
        randC = SLFColor(graph);
      }
      dur = window.performance.now() - start;
      break;

    default:
      break;
  }
}

function graphSetup() {
  verts = sphereFib(n, RADIUS);
  graph = Gnp(n, p);
  colorSetup();
}