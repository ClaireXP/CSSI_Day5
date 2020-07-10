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
pixels
*/

var img;

function preload() {
  img = loadImage("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fphoto_75631811_modern-abstract-relief-painting-art-pattern-on-white-background-opposites-fire-and-ice-hot-and-cold-.html&psig=AOvVaw2HoQKGTnCErv7CggTrEmia&ust=1594489169445000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJi6i5mdw-oCFQAAAAAdAAAAABAP");
}

function setup() {
  createCanvas(400, 400);
  img.loadPixels();
  loadPixels();
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
      let maxdist = 50;
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
}
