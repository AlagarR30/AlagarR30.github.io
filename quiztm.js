const firebaseConfig = {
    apiKey: "AIzaSyDbQA1i0INdj866ojIL_oZU36fUrF7yr7Y",
    authDomain: "quiztm-9250c.firebaseapp.com",
    projectId: "quiztm-9250c",
    storageBucket: "quiztm-9250c.appspot.com",
    messagingSenderId: "745546945742",
    appId: "1:745546945742:web:0e6d75c25f290751626c9f",
    measurementId: "G-YKZY0RS6V1"
  };
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const start = document.querySelector(".stbtn");
const popup = document.querySelector(".popup");
const popup2 = document.querySelector(".popup2");
const main = document.querySelector(".main");
const ready = document.querySelector("#ready");
const conti = document.querySelector("#continue");
const quiz = document.querySelector(".quiz");
const quizbox = document.querySelector(".quizbox"); 
const nextbt = document.querySelector(".next");
const total =document.querySelector(".questotal");
const result =document.querySelector(".resbox");
const tryagain =document.querySelector(".trybut");
const gohome =document.querySelector(".gohome");
const naam=document.querySelector(".nameinp");
const roll=document.querySelector("#rollinp");
const term = document.querySelector(".check");
const adminLogin = document.querySelector(".adminlog");
let attempt =0;
const Admin = "Admin.quiztm";
const AminPass = "qwertyuiop";


function admlog(){
    adminLogin.classList.add("active");
    main.classList.add("active");
}

function auth(){
    const n = document.querySelector("#adminName").value;
    const p = document.querySelector("#adminPass").value;
    if(n!=Admin){
        alert('Please enter valid username!');
    }
    else if(p!=AminPass){
        alert('Invalid password!');
    }
    else {
        alert('Validation succeeded!');
        location.href="admin.html";
    }
}
start.addEventListener("click" ,()=>{
    attempt=0;
    naam.value='';
    popup2.classList.add("active");
    main.classList.add("active");
})

ready.addEventListener("click" ,()=>{
    const nameval = naam.value;
    if(nameval.trim()===''){
        alert('Enter your name before proceeding.');
    }
    else if (!term.checked){
        alert('Please accept the Terms & Conditions.');
    }
    else{
    popup2.classList.remove("active");
    popup.classList.add("active");
    main.classList.add("active");
    }
})

function exi(){
    popup2.classList.remove("active");
    popup.classList.remove("active");
    main.classList.remove("active");
    adminLogin.classList.remove("active");
}
conti.addEventListener('click',()=>{
    quiz.classList.add("active");
    quizbox.classList.add("active");
    popup.classList.remove("active");
    main.classList.remove("active");
    showques(0);
    attempt=1;
})

tryagain.addEventListener('click', () => {
    qcount =0;
    userScore =0;
    quizbox.classList.add("active");
    showques(qcount);
    result.classList.remove('active')
    nextbt.classList.remove('active');
    scoreUpdate();
    attempt+=1;

})

gohome.addEventListener('click', () => {
    qcount =0;
    userScore =0;
    result.classList.remove('active');
    nextbt.classList.remove('active');
    quiz.classList.remove("active");
    scoreUpdate();

})

let qcount =0;
let userScore =0;


function showques(index){
    let ques= document.querySelector(".ques");
    ques.textContent=(`${questions[index].num}. ${questions[index].question}`);
    total.textContent=(`${qcount+1} of ${questions.length} Questions`);

    let optag =document.querySelector(".optionslst");
    optag.innerHTML=` <div class='option'><span>${questions[index].options[0]}</span></div>
    <div class='option'><span>${questions[index].options[1]}</span></div>
    <div class='option'><span>${questions[index].options[2]}</span></div>
    <div class='option'><span>${questions[index].options[3]}</span></div>`

    const option = document.querySelectorAll(".option");
    for(let i=0; i < option.length;i++){
        option[i].setAttribute('onClick','optselected(this)');
    }
}

function optselected(answer){
    let userAns=answer.textContent;
    let corans = questions[qcount].answer;
    if(userAns===corans){
        answer.classList.add('correct')
        userScore+=2;
        scoreUpdate();
    }
    else answer.classList.add('incorrect');

    const option = document.querySelectorAll(".option");
    for(let i=0; i < option.length;i++){
        option[i].classList.add('disabled');
        if(option[i].textContent== corans){
            option[i].classList.add('correct')
        }
    }
    
    nextbt.classList.add('active');

}

nextbt.addEventListener("click", () => {
    if(qcount<questions.length-1){
    qcount++;
    nextbt.classList.remove('active');
    total.textContent=(`${qcount+1} of ${questions.length} Questions`);
    showques(qcount);
    }
    else resShow();
})

const score = document.querySelector(".score");

function scoreUpdate(){
    score.textContent= `Score : ${userScore}/10`
}

function resShow(){
    quizbox.classList.remove("active");
    result.classList.add("active");
    const scoretxt = document.querySelector(".scoreText");
    scoretxt.textContent=`Your Score ${userScore} out of ${questions.length*2}`

    const circlep = document.querySelector(".circular")
    const proval = document.querySelector(".provalue")

    let start =-1;
    let end =(userScore / (questions.length*2))*100;
    let speed =20;
   
    let process = setInterval( () => {
        start++;
        proval.textContent=`${start}%`;
        circlep.style.background = `conic-gradient(#c40095 ${start*3.6}deg , rgba(255,255,255,.2) 0deg)`;
        if(start==end){
            clearInterval(process);
        }

    },speed)

    if(attempt <=1){
        const name =naam.value;
        const rolln = roll.value
        putresult(name,userScore,rolln);
    }
    else alert('Only the first attempt can be updated!');
}
function authenticate(){
    const authRef = db.ref('auth')
}
function putresult(uname, uscore,rol) {
    const usersRef = db.ref('quizResults');

      usersRef.push({
        username: uname,
        rollno: rol,
        score: uscore,
        timeStamp : firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        alert("Your response has been Updated!");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
        alert("Error adding data. Please try again.");
      });;
}