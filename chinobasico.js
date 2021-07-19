let img;
let pixelData = [];
let hsbGap = 360/7

let majorScales = {"c": [], "d": [], "e": [], "f": [], "g": [], "a": [], "b": []};
let minorScales = {"c": [], "d": [], "e": [], "f": [], "g": [], "a": [], "b": []};
let cM = [];
let cm = [];

function loadScale(path, scale, n){
  for (let i = 0; i < n; i++) {
    scale[i] = loadSound(path+i+".mp3");
  }
}

let sonidito; //depueh borralo master ekideh ndea ueueueueueue
function preload(){
  loadScale("./Cmayor/CM", majorScales["c"], 26);
  loadScale("./Dmayor/D", majorScales["d"], 1);
  loadScale("./Emayor/E", majorScales["e"], 1);
  loadScale("./Fmayor/F", majorScales["f"], 1);
  loadScale("./Gmayor/G", majorScales["g"], 1);
  loadScale("./Amayor/A", majorScales["a"], 1);
  loadScale("./Bmayor/B", majorScales["b"], 1);

  loadScale("./Cmenor/Cm", minorScales["c"], 1);
  loadScale("./Dmenor/Dm", minorScales["d"], 1);
  loadScale("./Emenor/Em", minorScales["e"], 1);
  loadScale("./Fmenor/Fm", minorScales["f"], 1);
  loadScale("./Gmenor/Gm", minorScales["g"], 1);
  loadScale("./Amenor/Am", minorScales["a"], 1);
  loadScale("./Bmenor/Bm", minorScales["b"], 1);


}

function mode(numbers) {
  var modes = [], count = [], i, number, maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
      number = numbers[i];
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
          maxIndex = count[number];
      }
  }

  for (i in count)
      if (count.hasOwnProperty(i)) {
          if (count[i] === maxIndex) {
              modes.push(Number(i));
          }
      }

  return modes;
    }

function rgbProcess(pixelList){
  let rgb = [];
  let rgbList = [];

  for (let i = 1; i <= pixelList.length; i++){
    rgb[i-1] = pixelList[i-1]; 
    if (i % 4 == 0){
      rgbList[(i/4)-1] = [rgb[i-4], rgb[i-3], rgb[i-2]];
    }
  }
  return rgbList;
}

function imgGetData(){
  img.loadPixels();

  // console.log(img.pixels.slice(0, 10));
  let imgData = rgbProcess(img.pixels); 

  // console.log(imgData); //lista de pixels formato [[r, g, b], ...]

  let hueList = imgData.map((e)=> hue(e)) //testin hue, satugaturro y braitneyspearnness
  let stList = imgData.map((e)=> saturation(e))
  let brightList = imgData.map((e)=> brightness(e))

  let hueMode = mode(hueList)[0];
  let stMode = mode(stList)[0];
  let brightMode = mode(brightList)[0];

  // let hueMode = hueList.reduce((acc, sum) => acc + sum)/hueList.length;
  // let stMode = stList.reduce((acc, sum) => acc + sum)/stList.length;
  // let brightMode = brightList.reduce((acc, sum) => acc + sum)/brightList.length;
  
  return {
    // "lista de hues": hueList
    "hue": hueMode, 
    "sat": stMode, 
    "brt": brightMode
    // "lista de valores h/s/b": [hueList, stList, brightList]
  }
};

  uploadBtn.addEventListener("change", () => {
    const file = uploadBtn.files[0];
    if (file){
        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result
            img =  loadImage(result, () => {
              soundProcess(imgGetData());
          });  
            document.querySelector("#img").src = result;
        }
        reader.readAsDataURL(file);
    }
});

function setup(){
    let cnv = createCanvas(500, 500);
}

function playSounds(scale, qnt){
  for (let i = 0; i < 7; i++){
    setTimeout(()=>{
    scale[int(random(0, qnt))].play();
  }, 500);
  }
}

function soundProcess(hsbMode){
  let h = hsbMode["hue"]
  let brt = hsbMode["brt"]

  majorScales["c"].forEach((e)=> e.stop());
  majorScales["d"].forEach((e)=> e.stop());
  majorScales["e"].forEach((e)=> e.stop());
  majorScales["f"].forEach((e)=> e.stop());
  majorScales["g"].forEach((e)=> e.stop());
  majorScales["a"].forEach((e)=> e.stop());
  majorScales["b"].forEach((e)=> e.stop());

  minorScales["c"].forEach((e)=> e.stop());
  minorScales["d"].forEach((e)=> e.stop());
  minorScales["e"].forEach((e)=> e.stop());
  minorScales["f"].forEach((e)=> e.stop());
  minorScales["g"].forEach((e)=> e.stop());
  minorScales["a"].forEach((e)=> e.stop());
  minorScales["b"].forEach((e)=> e.stop());

  if (brt > 50) {
      if (0 <= h < hsbGap){
        playSounds(majorScales["c"], 26);
        console.log( "xd")
      }
      else if (hsbGap <= h < hsbGap*2){
        playSounds(majorScales["d"], 1);
        console.log( "xd")}

      else if (hsbGap*2 <= h < hsbGap*3){
        playSounds(majorScales["e"], 1);
        console.log( "xd")}

      else if (hsbGap*3 <= h < hsbGap*4){
        playSounds(majorScales["f"], 1);
        console.log( "xd")}

      else if (hsbGap*4 <= h < hsbGap*5){
        playSounds(majorScales["g"], 1);
        console.log( "xd")}

      else if (hsbGap*5 <= h < hsbGap*6){
        playSounds(majorScales["a"], 1);
        console.log( "xd")}

      else if (hsbGap*6 <= h < hsbGap*7){
        playSounds(majorScales["b"], 1);
        console.log( "xd")}

    }

  else{
    if (0 <= h < hsbGap){
      playSounds(minorScales["c"], 1);
      console.log( "xd", "esta sonando la escala menor ueeueueuueueueueueueueueue")
    }
    else if (hsbGap <= h < hsbGap*2){
      playSounds(minorScales["d"], 1);
      console.log( "xd")}

    else if (hsbGap*2 <= h < hsbGap*3){
      playSounds(minorScales["e"], 1);
      console.log( "xd")}

    else if (hsbGap*3 <= h < hsbGap*4){
      playSounds(minorScales["f"], 1);
      console.log( "xd")}

    else if (hsbGap*4 <= h < hsbGap*5){
      playSounds(minorScales["g"], 1);
      console.log( "xd")}

    else if (hsbGap*5 <= h < hsbGap*6){
      playSounds(minorScales["a"], 1);
      console.log( "xd")}

    else if (hsbGap*6 <= h < hsbGap*7){
      playSounds(minorScales["b"], 1);
      console.log( "xd")}
  }
   
  console.log(hsbMode);

}
