
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase,ref,set,push ,onValue} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANyper2l0ev37ieoJR1Z8VZo96XpXy5bY",
  authDomain: "quiz-app-75bfb.firebaseapp.com",
  projectId: "quiz-app-75bfb",
  storageBucket: "quiz-app-75bfb.appspot.com",
  messagingSenderId: "817113978397",
  appId: "1:817113978397:web:3164f13ad0dc426c85d8f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getDatabase();



window.quizPage=function(){
    window.location.href="quiz.html"
}

// ------------------------------------------------------------------------------------------
var question=document.getElementById("question");
var option=document.getElementById("options");
var correctAnswer=document.getElementById("correctAnswer");
var parentOption=document.getElementById("parentOption");

var optionArray=[];

window.optionAdd=function(){

optionArray.unshift(option.value)
parentOption.innerHTML+=`<ul><li>${option.value}</li></ul>`
option.value="";


}

var object;
window.quizAdd=function(){
    
    parentOption.innerHTML="";
    
    object={

        question:question.value,
        option:optionArray,
        correctAnswer:correctAnswer.value

    };
    const keyRef=ref(database,"quiz/");
    object.id=push(keyRef).key;
    
    const quizRef=ref(database,`quiz/${object.id}`)
    set(quizRef,object);

    question.value="";
    correctAnswer.value="";
    object.option="";
    console.log(object);

}



// ----------------------------quiz.html------------------------------------------------

var quizQuestion=document.getElementById("quizQuestion");



var quix=[];

var obj;
window.startQuiz=function(){
    const ref2=ref(database,"quiz/")
    onValue(ref2,function(x){
        var data=x.val();
        for(let i in data){
   
            
                
                       
             obj ={
                question : data[i].question,
                options :data[i].option,
                correctAnswer: data[i].correctAnswer
            }

            quix.push(obj)
            
            
            
             
                            
               
        }
    })

    console.log(quix)
}





