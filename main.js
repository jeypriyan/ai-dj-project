right_wrist_score=0
left_wrist_score=0;
song_playing="";
harry_potter="";
peter_pan="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload(){
    harry_potter=loadSound("Harry Potter Theme.mp3");
    peter_pan=loadSound("Peter Pan.mp3");
    stop()
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Posenet is intiallized!");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        left_wrist_score=results.pose.keypoints[9].score;
        right_wrist_score=results.pose.keypoints[9].score;
    }
}
function draw(){
    image(video,0,0,400,400);
    fill('#21db6b');
    stroke('#21db6b');
    circle(leftWristX,leftWristY,20);
    harry_potter.isPlaying(song_playing);
    if(left_wrist_score>0.2){
        fill('#3a4bba');
        stroke('#3a4bba');
        circle(20,leftWristX,leftWristY);
        peter_pan.play();
        harry_potter.stop()
    }
    else (right_wrist_score>0.2);{
        fill('#32a852');
        stroke('#32a852');
        circle(20,rightWristX,rightWristY);
        peter_pan.stop();
        harry_potter.play()

}
}