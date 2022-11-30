const canvas= document.getElementById ('canvas')
const ctx = canvas.getContext('2d')
const img = new Image ();//c'est un objet
img.src='flappy-bird-set.png';

//general settings

let gamePlaying= false
const gravity=0.1
let speed=1.2
const size= [51,36]
const jump= -3.5
const cTenth=(canvas.width/10)



//pipe setting
const pipeWidth=78
const pipeGap=270
const pipeLoc=()=>(Math.random()*((canvas.height-(pipeGap +pipeWidth))-pipeWidth)) +pipeWidth;


let index=0,
    bestScore=0,
    currentScore=0,
    pipes=[],
    flight,
    flyHeight;

const setup=()=>{
    currentScore=0;
    flight=jump;
    flyHeight=(canvas.height/2)-(size[1]/2);
    pipes=Array(3).fill().map((a,i)=>[canvas.width+(i*(pipeGap+pipeWidth)),pipeLoc()]);
    
}



const render = ()=>{
    index++;
    //background animation
    ctx.drawImage(img,0,0,canvas.width,canvas.height,-((index*(speed/2))%canvas.width)+canvas.width,0,canvas.width,canvas.height);
    // la seconde ligne règle le problème de superposition des images, désormais elles se suivent
    ctx.drawImage(img,0,0,canvas.width,canvas.height,-((index*(speed/2))%canvas.width),0,canvas.width,canvas.height);
    //attitude de l'oiseau lorsque le jeu est lancé
     if(gamePlaying){
        ctx.drawImage (img,432,Math.floor((index% 9)/3)*size[1],...size,cTenth,flyHeight,...size);
        flight+=gravity;
        flyHeight=Math.min(flyHeight+flight,canvas.height-size[1])
     }else{
    //l'oiseau
    ctx.drawImage (img,432,Math.floor((index% 9)/3)*size[1],...size,((canvas.width/2)-size[0]/2) ,flyHeight,...size)//https://www.w3schools.com/tags/canvas_drawimage.asp
    //(img,sx la position dans les ordonnées dans l'image,sy la postion dans les absycces dans l'image, la largeur du sample, la hauteur du sample,position x dans le canvas position
    //y dans le canvas, hauteur ds le canvas, largeur dans le canvas  )//
  flyHeight=(canvas.height/2)-(size[1]/2);

  ctx.fillText(`Meilleur score:${bestScore}`,55,245);
  ctx.fillText('cliquez pour jouer',48,535)
  ctx.font= "bold 30px courier";
}
//pipe display
if(gamePlaying){
    pipes.map(pipe=>{
      pipe[0]-=speed;  
      //top pipe
      ctx.drawImage(img,432,588- pipe[1],pipeWidth, pipe[1],pipe[0],0,pipeWidth,pipe[1]);
      //bottom pipe
      ctx.drawImage(img,432+pipeWidth,108,pipeWidth,canvas.height-pipe[1]+pipeGap,pipe[0],pipe[1]+pipeGap,pipeWidth,canvas.height-pipe[1]+pipeGap);

      if(pipe[0]<= -pipeWidth){
          currentScore++;
          bestScore=Math.max(bestScore,currentScore)
          if(Number.isInteger(currentScore/10)){
              speed+=0.5
          }
          

        //remove pipe +create a new one
        pipes=[...pipes.slice(1),[pipes[pipes.length-1][0] +pipeGap+pipeWidth,pipeLoc()]];
        }
        //if hit the pipe, end
        if([
            pipe[0]<=cTenth+size[0],
            pipe[0]+pipeWidth>=cTenth,
            pipe[1]>flyHeight||pipe[1]+pipeGap<flyHeight +size [1]
        ].every(elem=>elem)){
            gamePlaying=false
            speed=1.2
            setup();
        }
         
 
         
       
    })
}
    document.getElementById('bestScore').innerHTML=`meilleur:${bestScore}`;
    document.getElementById('currentScore').innerHTML=`actuel:${currentScore}`;
    window.requestAnimationFrame(render);//https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
}
setup();
img.onload = render;
document.addEventListener('click',()=>gamePlaying = true)
document.addEventListener('keypress',()=>gamePlaying = false)
window.onclick=()=>flight=jump// sur l'évènement du click flight devient = à jump et permet à l'oiseau de voler, sinon 
//il sera = à gravity
