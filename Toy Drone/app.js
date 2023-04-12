//create loading message while assets are downloading
const loadmsg = document.getElementById("loadMsg");
let loadIncrement = 0;
const loadInterval = setInterval(()=>{
    if(loadIncrement != 3){
      loadMsg.innerHTML += ".";
      loadIncrement++;
    } else {
      loadMsg.innerHTML = "Loading Assets";
      loadIncrement = 0;
    }
  },500);

window.addEventListener('load', function () {
  //clear loading message
  clearInterval(loadInterval);
  loadMsg.style = "display:none;";
  
  //load canvas
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext('2d');
  
  const posTable = [1,3,5,7,9,11,13,15,17,19]
  
  //set origin to lower left corner
  ctx.translate(0, canvas.height);
  ctx.scale(1,-1);
  
  ctx.imageSmoothingEnabled = false;


  //add audio effects
  var pew = new Audio('assets/audio/pew.mp3');
  var bang = new Audio('assets/audio/bang.mp3');
  pew.load();
  bang.load();
  pew.volume = 0.4;
  bang.volume = 1;
  
  //load Images and element values
  const boom = document.getElementById("boom");
  const idleUp = document.getElementById("idleUp");  
  const idleRight = document.getElementById("idleRight");
  const idleDown = document.getElementById("idleDown");
  const idleLeft = document.getElementById("idleLeft");

  class Grid{  
    constructor(){
      this.blockWidth = canvas.width/10;
      this.blockHeight = canvas.height/10;
    }

    render(){    
      ctx.beginPath();

      //Draw 10x10 grid
      for(let i=0; i<=10; i++){
        let posx = i*this.blockWidth;      
        let posy = i*this.blockHeight;

        ctx.moveTo(posx,0);
        ctx.lineTo(posx, canvas.height);

        ctx.moveTo(0,posy);
        ctx.lineTo(canvas.width, posy);
      }

      ctx.closePath();
      ctx.stroke();
    }  
  }
  class Player{
    constructor(x,y,grid,dir='right',active=false){
      this.xunits = canvas.width/40;
      this.yunits = canvas.height/40;
      this.x = x*(canvas.width/20);
      this.y = y*(canvas.height/20);
      this.width = canvas.width/8;
      this.height = canvas.height/8;
      this.dir = dir;
      this.grid = grid;
      this.firedProj = false;
      this.frame = 0;
      this.timer = 0;
      this.active = active;
      this.state = 'idle';
      this.imageIdle = idleUp;
      this.spriteWidthIdle = 192/4;
      this.spriteHeightIdle = 48;
      this.sprite = {
        'up': {
            'image': idleUp,
            'width' : 192/4,
            'height': 48,
            'animated': false
        },        
        'right': {
            'image': idleRight,
            'width' : 192/4,
            'height': 48,
            'animated': false
        },
        'down': {
            'image': idleDown,
            'width' : 192/4,
            'height': 48,
            'animated': false
        },        
        'left': {
            'image': idleLeft,
            'width' : 192/4,
            'height': 48,
            'animated': false
        },
      }
      this.rotNum = 0;

    }

    render(){
      // Draw player according to direction
    //   ctx.beginPath();
        /*
      if(this.dir=='up'){
        // ctx.moveTo(this.x, this.y);
        // ctx.lineTo(this.x + this.xunits, this.y + this.yunits);
        // ctx.lineTo(this.x + this.xunits*2, this.y);
        // ctx.lineTo(this.x + this.xunits, this.y + this.yunits*2);

        ctx.drawImage(
            this.sprite[this.dir].image, 
            0, 
            0,
            this.spriteWidthIdle, 
            this.spriteHeightIdle, 
            this.x-this.width/2, //offset image dimensions
            this.y-this.height/2, 
            this.width, 
            this.height
        );

      } else if(this.dir=='down'){
        // ctx.moveTo(this.x, this.y + this.yunits*1.5);
        // ctx.lineTo(this.x + this.xunits, this.y - this.yunits/2);
        // ctx.lineTo(this.x + this.xunits*2, this.y + this.yunits*1.5);
        // ctx.lineTo(this.x + this.xunits, this.y + this.yunits/2);

        ctx.drawImage(
            this.sprite[this.dir].image, 
            0, 
            0,
            this.spriteWidthIdle, 
            this.spriteHeightIdle, 
            this.x-this.width/2, //offset image dimensions
            this.y-this.height/2, 
            this.width, 
            this.height
        );

      } else if(this.dir=='right'){
        // ctx.moveTo(this.x + this.xunits, this.y - this.yunits);
        // ctx.lineTo(this.x + this.xunits*2, this.y + this.yunits);
        // ctx.lineTo(this.x + this.xunits, this.y + this.yunits*3);
        // ctx.lineTo(this.x + this.xunits*1.5, this.y + this.yunits);
        
        if(this.state=="idle"){
          ctx.drawImage(
                this.sprite[this.dir].image, 
                0, 
                0,
                this.spriteWidthIdle, 
                this.spriteHeightIdle, 
                this.x-this.width/2, //offset image dimensions
                this.y-this.height/2, 
                this.width, 
                this.height
            );

            // ctx.drawImage(this.imageIdle,this.x,this.y);
        }
        
      } else if(this.dir=='left'){
        // ctx.moveTo(this.x + this.xunits, this.y - this.yunits);
        // ctx.lineTo(this.x - this.xunits/4, this.y + this.yunits);
        // ctx.lineTo(this.x + this.xunits, this.y + this.yunits*3);
        // ctx.lineTo(this.x + this.xunits/6, this.y + this.yunits);

        ctx.drawImage(
            this.sprite[this.dir].image, 
            0, 
            0,
            this.spriteWidthIdle, 
            this.spriteHeightIdle, 
            this.x-this.width/2, //offset image dimensions
            this.y-this.height/2, 
            this.width, 
            this.height
        );

      }*/

      // ctx.closePath();
      // ctx.fill();   

        ctx.drawImage(
            this.sprite[this.dir].image, 
            0, 
            0,
            this.spriteWidthIdle, 
            this.spriteHeightIdle, 
            this.x-this.width/2, //offset image dimensions
            this.y-this.height/2, 
            this.width, 
            this.height
        );

    }

    clear(){
      //clear rect that player occupies
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.grid.render();
    }

    move(){    
      this.clear();

      if(this.dir==='down'){      
        //move up if y value will be above 0
        if(this.y-(canvas.height/10)<0){
          alert('cant move further down');
        } else {
          this.y -= canvas.height/10;
        }
      } else if (this.dir==='up'){
        //move down if y value will be less than view height
        if(this.y+(canvas.height/10)>canvas.height){
          alert('cant move further up');
        } else {
          this.y += canvas.height/10;        
        }
      } else if (this.dir==='left'){
        //move left if x value will be above 0
        if(this.x-(canvas.width/10)<0){
          alert('cant move further left');
        } else {
          this.x -= canvas.width/10;       
        }      
      } else if (this.dir==='right'){
        //move down if x value will be less than view width
        if(this.x+(canvas.width/10)>canvas.width){
          alert('cant move further right');
        } else {
          this.x += canvas.width/10;    
        }    
      }

      this.render();
    }    
    
    rotation(direction){
      if(direction=='right'){
        this.rotNum ++;
      } else {
        this.rotNum --;
      }
      
      this.rotNum = this.rotNum % 4; //resets counter to 0 when it reaches 4

      if(this.rotNum==0){
        this.dir = 'up';
      } else if(this.rotNum==1||this.rotNum==-3){
        this.dir = 'right';
      } else if(this.rotNum==3||this.rotNum==-1){
        this.dir = 'left';
      } else {
        this.dir = 'down';
      }

      this.clear();
      this.render();
    }
  }
  class Projectile{
    constructor(height,width,velocity,dir,player,active=false){
        this.x = (player.x+(player.xunits/4))-(canvas.width/200); //offset .5% of canvas width to keep point at the center of the cell
        this.y = (player.y-(player.yunits*2));
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        //direction
        this.dir = dir;
        this.player = player;
        this.active = active;
        this.timer = 0;

        console.log("player y: "+player.y);
        console.log("yunits: "+player.yunits);
        console.log("this.y: "+this.y);
      }

    render(){    
      //render projectile object
      ctx.fillStyle = this.timer % 3 == 0?"#ff00ff":"#000000";
      this.active = true;

      //draw projectile according to player orientation
      if(this.dir=="up"||this.dir=="down"){
        ctx.fillRect(this.x, this.y, this.width, this.height);   
        
      } else {
        ctx.fillRect(this.x+0, this.y+(this.player.height*0.4), this.height*2, this.width*0.5);  
      }
      
      this.timer++;
      
    }

    clear(){
      //clear rect that player occupies
      ctx.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
    }

    update(){

      //check for border collision
      if(
        this.y + this.height <= canvas.height &&
        this.y >= 0 &&
        this.x + this.width <= canvas.width &&
        this.x >= 0
      ){
        if(this.dir==='left'){
          this.x-=this.velocity*1.5;
        }

        if(this.dir==='right'){
          this.x+=this.velocity*1.5;
        } 

        if(this.dir==='down'){
          this.y-=this.velocity;
        }

        if(this.dir==='up'){
          this.y+=this.velocity;
        }

      }else{
        this.dir = null;
        this.active = false;
      }
    }
  }
  class Explosion{
    constructor(x,y,boom, active){
      this.x = x - 25;
      this.y = y - (179/8);
      this.spriteWidth = 200;
      this.spriteHeight = 179;
      this.width = this.spriteWidth/4;
      this.height = this.spriteHeight/4;
      this.image = boom;
      this.frame = 0;
      this.timer = 0;
      this.active = active;
    }
    
    update(){
      this.timer++;
      if(this.timer % 10 === 0){
        this.frame++;
      }
    }
    
    render(){
      ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
      
      if(this.frame>4){
        this.active = false;        
        this.frame = 0;
        this.timer = 0;
      }
    }
  }

  //instantiate grid 
  const grid = new Grid();
  grid.render();

  //render player at origin
  let xp = 1;
  let yp = 1;
  const player = new Player(posTable[xp-1],posTable[yp-1],grid,'up');
  player.render();

  //listen for button press and start action
  window.addEventListener("keydown",({code})=>{

    if(code==='KeyD'||code==='ArrowRight'){
      player.rotation('right');
      console.log(player.rotNum);      
      console.log(player.dir);
    }

    if(code==='KeyA'||code==='ArrowLeft'){
      player.rotation('left');
      console.log(player.rotNum);      
      console.log(player.dir);
    }

    if(code==='KeyW'||code==='ArrowUp'){
      player.move();
      console.log(player.rotNum);      
      console.log(player.dir);
    }

    if(code==='KeyS'||code==='ArrowDown'){
      console.log(code);
    }

    if(code==='KeyF'){

      if(!player.firedProj){
        let projectile = new Projectile(10,3,3,player.dir,player);
      projectile.render();
        pew.currentTime = 0;
        pew.play();

      //keeps on running
      let animateProjectile = () => {	
        if(projectile.active){
          player.firedProj = true;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          window.requestAnimationFrame(animateProjectile);
          projectile.render();
          projectile.update();
          grid.render();
          player.render();
        }else{
          let test = new Explosion(projectile.x,projectile.y, boom, true);
          
          bang.currentTime = 0;
          bang.play();          
          ctx.clearRect(0, 0, canvas.width, canvas.height); 
          
          function animateExplosion(){

            if(test.active){
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              test.update();
              test.render();
              player.render();
              grid.render();
              requestAnimationFrame(animateExplosion);
            } else {
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              player.render();
              grid.render();
            }
          }          
          animateExplosion();
          
          grid.render();
          player.render();
          console.log('End of projectile animation');
          player.firedProj = false;
        }
      }
       animateProjectile();
      }
    }
  });
  
  window.addEventListener("click",()=>{
    console.log(`cordinate middle x:${canvas.width/20} y:${canvas.height/20}`);
    console.log(`player x:${player.x} y:${player.y}`);

    ctx.beginPath();
    ctx.moveTo(player.x,0);
    ctx.lineTo(player.x, canvas.height);
    
    ctx.moveTo(0,player.y);
    ctx.lineTo(canvas.width, player.y);

    ctx.stroke();
  });
  
});

