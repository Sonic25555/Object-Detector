status = "";
object=[];
song="";
function preload(){
    img=loadImage("https://image.cnbcfm.com/api/v1/image/106015873-1562928489280417744-001a-4.jpg?v=1562928585&w=720&h=405")
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;

    }
}
function draw(){
    image(img,0,0,380,380);
    if(status!=""){
        objectDetector.detect(img,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}