//https://p5js.org/examples/color-brightness.html --> Used as a reference
// https://creative-coding.decontextualize.com/media/

/* global
loadImage,
createCanvas,
loadPixels,
updatePixels,
dist,
mouseX,
mouseY,
constrain,
width,
pixels,
image,
createSlider,
*/

let img;
let light;
let w = 300;

function preload() {
  img = loadImage("https://3.bp.blogspot.com/-9MNTmmt8hZg/UpiPsuxK8aI/AAAAAAAAAsM/Kl3N1zR8g74/s1600/256x256+icon.png");
}

function setup() {
  createCanvas(w, w);
  img.loadPixels();
  loadPixels();
  
  image(img, 0, 0);
  img.resize(w, w);
  
  //Create slider to adjust width of "flashlight"
  light = createSlider(1,20,5);
  light.position(w/2-20,36);
}

function draw() {
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calculate the 1D location from a 2D grid
      let loc = (x + y * img.width) * 4;
      
      // Get the R,G,B values from image
      let r, g, b;
      r = img.pixels[loc];
      
      // Calculate an amount to change brightness based on proximity to the mouse
      let maxdist = light.value()*10;
      let d = dist(x, y, mouseX, mouseY);
      let adjustbrightness = (255 * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      
      // Constrain RGB to make sure they are within 0-255 color range
      r = constrain(r, 0, 255);
      
      // Make a new color and set pixel in the window
      //color c = color(r, g, b);
      let pixloc = (y * width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = r;
      pixels[pixloc + 2] = r;
            
      pixels[pixloc + 3] = 255;
    }
  }
  updatePixels();
  
  rotate(QUARTER_PI);
  rect(250,50,15,40);
  rect(250,15,25,15);
}
