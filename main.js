Webcam.set({
    width:350,
    height:300,
    img_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'/>";
    })
}

console.log("ml5version: ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/fweZoQckP/model.json",modelLoaded);

function modelLoaded(){
    console.log("model loaded")
}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img,gotResult)
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="the first prediction is "+prediction_1;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji1").innerHTML="&#128522";
        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji1").innerHTML="&#128532";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji1").innerHTML="&#128548";
        }
        
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522";
        }
    }
}