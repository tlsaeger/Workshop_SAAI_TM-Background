/* Zoom Background 3000 
Workshop by aiXdesign Creative Kitchen @ SAAI 
held by Tom-Lucas Säger 🌍 https://tlsaeger.de 🐦 @t00may  */

//This the same code as the 02_Final, it only differs in a few lines, to make greenscreen work. For the complete commented version refer to 02_Final

let classifier;
let mute;
let imageModelUrl = 'https://teachablemachine.withgoogle.com/models/LscBuPCNA/';
let video;
let flippedVideo;
let label = "";


function preload() {
  classifier = ml5.imageClassifier(imageModelUrl + 'model.json');
  mute = loadImage('img/mute.png');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  //We make our video as small as possible.
  video.size(64,48);
  video.hide();
  classifyVideo();
}
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  console.log(label);
  classifyVideo();
}


function draw() {
//We add a green background to the canvas.
  background(0,255,0);
// and hide the video.
  // image(flippedVideo, 0, 0);
  showGesture();
}
function showGesture(){
  if(label == "Mute"){
    image(mute,0,0, width, height);
  }
}