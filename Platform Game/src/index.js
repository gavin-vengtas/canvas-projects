const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let pressed = false;

class Player{
    constructor(x,y,height,width,velocity){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.velocity = velocity;
      //direction
			this.dir = null;
			this.gravity = 0;
      this.jump = false;
      this.jumpCount = 10;
    }
	
	render(){
		//color player object
		ctx.fillStyle = "#ff00ff";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	update(){
		//adds gravity
		this.y+=this.gravity;
		
		//adds direction
		if(pressed===true){
			if(this.dir==='left'){
				this.x-=this.velocity;
			}
      
      if(this.dir==='right'){
				this.x+=this.velocity;
			} 
      
      if(this.dir==='up'){
				this.y-=this.velocity;
			}
		}else{
			this.dir = null;
		}
    
    //jump logic
    if(this.jump === true){
      //remove gravity when jumping
      //falling is already handled by the jump logic
      this.y -= this.gravity;
      if(this.jumpCount>-10){   
        // neg is positive when going up
        let neg = 1;        
        if(this.jumpCount<0){
          //neg is negative when going down
          neg = -1;
        }
        this.y -= Math.trunc((this.jumpCount**2) * 0.075 * neg);
        this.jumpCount -= 1;
      }else{
        this.jump = false;
        this.jumpCount = 10;
      }
    }
	}
}
class Platform{
	constructor(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	render(){		
		//color to fill rect
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

//instantiate player and platform objects
const player = new Player(10,10,10,10,10);
const platform = new Platform(10,70,100,10);


//keeps on running
const animate = () => {	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	window.requestAnimationFrame(animate);
	player.render();
	player.update();
	platform.render();
	
	// collision detection
	if(
		//check y collision
		player.y + player.height <= platform.y &&
		player.y + player.gravity + player.height >= platform.y &&
		player.x + player.width >= platform.x &&
		player.x <= platform.x+platform.width
	){
		player.gravity = 0;
	}else{
		player.gravity = 1;
	}
}

animate();

//listen for button press and start action
window.addEventListener("keydown",({code})=>{
	pressed = true;
	console.log("Pressed: "+code);
	
	if(code==='KeyD'||code==='ArrowRight'){
		player.dir = 'right';
	}
  
  if(code==='KeyA'||code==='ArrowLeft'){
		player.dir = 'left';
	}
  
  if(code==='KeyW'||code==='ArrowUp'){
		//player.dir = 'up';
    player.jump = true;
	}
});


//listen for key release and stop action
window.addEventListener("keyup",({code})=>{
	pressed = false;
	console.log("Pressed: "+code);
});