//defining constants
const boxes = document.querySelectorAll('.box');
const texts = document.querySelectorAll('.front p');
const backtext = document.querySelectorAll('.back p');
const bod = document.querySelector('body');
const iconCont = document.querySelector('.iconbox');
const icon = document.querySelector('i');
const title = document.querySelector('h1');
const button = document.querySelectorAll('.buttons');
const backbutton = document.querySelectorAll('.buttons1');
const jokelike = document.querySelector('.likejoke');
const quotelike = document.querySelector('.likequote');

let jokeset = new Set();//to store the liked jokes;
let quoteset = new Set();//to store the liked quotes;
//so that when the page opens the jokes are shown
//async function because we have to use await and promise as we want all the jokes to load 
document.addEventListener('DOMContentLoaded',async function(){
    const jokepromise = [];
    const quotepromise=[];
    for(let i =0;i<texts.length;i++)
    {
        jokepromise.push(getjokes(i));
        quotepromise.push(getquotes(i));
    }
    await Promise.all(jokepromise);
    await Promise.all(quotepromise);
});
//function for turning the heart red or black depending on the clicks on it for the front button and also store the joke in a Set and display it 
function likes(index){
    
    if(button[index].style.color !== "red")
    {
        button[index].style.color = "red";
        if(!jokeset.has(texts[index].innerHTML))
        {
            jokeset.add(texts[index].innerHTML);
            let jokeList = document.querySelector('.likejoke');
            let newfav1 = document.createElement('li');//is used to create an element 
            newfav1.innerHTML = texts[index].innerHTML + "<br>" +"<br>";
            jokeList.append(newfav1);//append helps in adding that created element to a parent 
        }
    }
    else{
        button[index].style.color = "black";
    }
    
}
for(let i =0;i<button.length;i++)
{
    button[i].addEventListener('click',function(event){
        event.stopPropagation();
        likes(i);
    })
}
//the same like function for the cards at the back
//also stores the quotes inside another list that will be displayed later using append and create element 
function likesback(index){
    
    if(backbutton[index].style.color !== "red")
    {
        backbutton[index].style.color = "red";
        if(!quoteset.has(backtext[index].innerHTML))
        {
            quoteset.add(backtext[index].innerHTML);
            let quoteList = document.querySelector('.likequote');
            let newfav = document.createElement('li');//is used to create an element 
            newfav.innerHTML = backtext[index].innerHTML + "<br>" + "<br>" ;
            quoteList.append(newfav);//append helps in adding that created element to a parent 
        }
    }
    else{
        backbutton[index].style.color = "black";
    }
    
}
for(let i =0;i<backbutton.length;i++)
{
    backbutton[i].addEventListener('click',function(event){
        event.stopPropagation();
        likesback(i);
    })
}
//for some reason for the first time you may have to press the button twice to make it go to light mode 
//code for night/daymode
function dayNightMode(){
    if(bod.style.backgroundColor == "black")
    {
        bod.style.backgroundColor = "#079BB0";
        title.style.color = "black";
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        for(let i =0;i<boxes.length;i++)
        {
            boxes[i].style.backgroundColor = "grey";
            boxes[i].style.borderColor = "grey";
        }
        quotelike.style.backgroundColor = "green";
        jokelike.style.backgroundColor="green";
        quotelike.style.borderColor = "green";
        jokelike.style.borderColor="green";
        
        
    }
    else
    {
        bod.style.backgroundColor = "black";
        title.style.color = "white";
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        for(let i =0;i<boxes.length;i++)
        {
            boxes[i].style.backgroundColor = "#eadc6f";
            boxes[i].style.borderColor = "#eadc6f";
        }
        quotelike.style.backgroundColor = "lavender";
        jokelike.style.backgroundColor="lavender";
        
    }
}
iconCont.addEventListener('click',function(){
   
    dayNightMode();

})
// function for audio whenever the card is flipped 
let audio;
function playmusic(){
    if(audio)
    {
        audio.pause();
        audio.currentTime = 0;
    }
    //might want to convert the audio file to mp4
    audio = new Audio('RICK ROLL SOUND_NEVER GONNA GIVE YOU UP-High Quality.wav');
    audio.play();
}
for(let i =0;i<boxes.length;i++)
{
    boxes[i].addEventListener('click',function(){
        playmusic();
    });
}
//for adding the flipping effect on clicking a button could have used a simple for loop too 
boxes.forEach((box)=>{
    let rotate = 0;
    box.addEventListener('click',function(){
        rotate = rotate+ 180;
        box.style.transform = 'rotateY('+rotate+'deg)';
        
    })
})
//get the jokes through the api still a bit confused as to how this works need to read about it and making heart black everytime a new joke was generated
async function getjokes(index){
    const jokedata = await fetch('https://official-joke-api.appspot.com/random_joke',{
        headers:{
            'Accept' : 'application/json'
        }
    });
    const jokeobj = await jokedata.json();
    texts[index].innerHTML = jokeobj.setup + "<br>" + jokeobj.punchline;
    button[index].style.color = "black";
}
for(let i =0;i<texts.length;i++)
{
    texts[i].addEventListener('click',function(){
        getjokes(i);
    });
}

//getting quotes thorugh the api and also making the heart black again everytime a new quote is generated 
async function getquotes(index){
    const quotedata = await fetch('https://api.quotable.io/random',{
        headers:{
            'Accept' : 'application/json'
        }
    });
    const quoteobj = await quotedata.json();
    backtext[index].innerHTML = quoteobj.content + "  -  " +    quoteobj.author;
    backbutton[index].style.color = "black";
}
for(let i =0;i<backtext.length;i++)
{
    backtext[i].addEventListener('click',function(){
        getquotes(i);
    });
}
