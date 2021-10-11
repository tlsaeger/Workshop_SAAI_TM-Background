/* Zoom Background 3000 
Workshop »AI X Design – Rage against the machine?« @ HTW Berlin 
held by Tom-Lucas Säger 🌍 tlsaeger.de 🐦 @t00may  */

/* In this example we will, build a Zoom Background which reacts on poses we make in front of the camera. If for example we put our hand in front of our mouth the background will change to »You’re on mute!« For the training of our recognition-mode we use Teachable Machine by Google (https://teachablemachine.withgoogle.com/). We can use this application, to easily train our own ML-model using a graphical interface. 
Create a new »Image Project« with two classes on the website. We gonna call one »Empty« and one »Mute«. We capture some pictures using the webcam, in the »mute«-class we take picture of ourself holding one finger in front of our mouth making a psst-pose. The »Empty«-Class gets feed with pictures of you just sitting, or you out of the frame. After we captured a big chunk of training data, press »Train«, then test your model and if you are happy »Export Model« → »Upload«. This will create a link, that we need later.*/


//We create a few variables, which we can use later on. Paste the link you obtained from Teachable Machine in the variable imageModelUrl
let classifier;
let mute;
let imageModelUrl = 'https://teachablemachine.withgoogle.com/models/LscBuPCNA/';

// A few more variables we use for the video and label*/
let video;
let flippedVideo;
let label = "";

//We create our ml5 classifier and pass it the variable with the TM link + 'model.json' Then we can preload our images we want to overlay. 
//You can make one yourself or download free pngs at https://www.stickpng.com/
function preload() {
  classifier = ml5.imageClassifier(imageModelUrl + 'model.json');
  mute = loadImage('img/mute.png');
}
//We create our canvas in the setup() function and load the webcam. We need to set the size of our video and hide it then. 
//We will redraw the video later. Then we call classifyVideo().
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();
  classifyVideo();
}
//In our classfiyVideo() function we flip the video, to make it easier to work with. Then we call classify on our classifier and pass in the video. Once the results are ready, the classifier will call the function gotResult()
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

//In gotResult we first do some error handling, than we pass the results to our variable label.
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  console.log(label);
  // Classifiy again!
  classifyVideo();
}

// In the draw loop we draw the video and call the function showGesture, which will generate to overlay
function draw() {
  image(flippedVideo, 0, 0);
  showGesture();
}
// Now we check which class was detected by Teachable Machine, if the class is "Mute" we draw our image if it is "Empty" we draw nothing. 
function showGesture(){
  if(label == "Mute"){
    image(mute,0,0, width, height);
  }
}