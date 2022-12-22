let slideShowImage = [
  "./img/slide-show-1.png",
  "./img/slide-show-2.png",
  "./img/slide-show-3.png"
];
let count = 0;
let slider = document.getElementById("slider");
function next(){
    count++;  
    if(count >= slideShowImage.length){
        count = 0;
    } 
    slider.src = slideShowImage[count];
}
function prev(){
    count--;
    if(count < 0){
        count = slideShowImage.length-1;
    }
    slider.src = slideShowImage[count];  
}
setInterval(next, 5000);