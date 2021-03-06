(function(){
    "use strict";
    let Phyllos = [];
    const jdbLIB = {
        drawPhyllotaxis(ctx, centerX, centerY, divergence, space, size, steps, shapetype, colorType){
            for(let n = 0; n < steps; n++){
                let a = n * this.dtr(divergence);
                let r = space * Math.sqrt(n);

                let x = r * Math.cos(a) + centerX;
                let y = r * Math.sin(a) + centerY;

                let aDegrees = (n * divergence) % 256;;
                let color = "black";
                
                if(colorType == "red"){   
                    color = `rgb(${aDegrees},20,50)`;
                }
                else if(colorType == "blue"){
                    color = `rgb(50,20,${aDegrees})`;
                }
                else if(colorType == "green"){
                    color = `rgb(50,${aDegrees},20)`;
                }
                else if(colorType == "orange"){
                    color = `rgb(${aDegrees},${aDegrees/2},20)`;
                }
                else if(colorType == "rainbow"){
                    aDegrees = (n * divergence % 361);
                    color = `hsl(${aDegrees},100%,50%)`;
                }

                if(shapetype == "circle"){
                    this.drawCircle(ctx, x, y, size, color);
                }
                else if(shapetype == "square"){
                    this.drawSquare(ctx, x, y, size, size, color);
                }
                else if(shapetype == "triangle"){
                    this.drawTriangle(ctx, x, y, size, color);
                }

                 space += .001;
                 size += .001;
                //space += space/100;
                //size += size/100;

            }
        },

        dtr(degrees){
            return degrees * (Math.PI/180);
        },

        drawCircle(ctx,x,y,radius,color){
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x,y,radius,0,Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },

        drawSquare(ctx,x,y, width, height, fillStyle){
            ctx.save();
            ctx.fillStyle = fillStyle;
            ctx.translate(x, y);
            ctx.fillRect(0-width, 0-height, width, height);
            ctx.restore(); 
        },

        drawTriangle(ctx, x, y, size, color){
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size/2, y + size);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
    
        cls(ctx, canvasWidth, canvasHeight){
            //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,canvasWidth, canvasHeight);
        },

        pushPhyllos(ctx, centerX, centerY, divergence, space, size, steps, shape, color){
            Phyllos.push(new Phyllotaxis(ctx, centerX, centerY, divergence, space, size, steps, shape, color));
        },

        updatePhyllos(xDis, yDis, canvasWidth, canvasHeight){
            for(let i = 0; i < Phyllos.length; i++){
                Phyllos[i].centerX += xDis;
                Phyllos[i].centerY += yDis;
                if(Phyllos[i].centerX >= canvasWidth + 40) Phyllos[i].centerX = 0;
                if(Phyllos[i].centerY >= canvasHeight + 40) Phyllos[i].centerY = 0;
                if(Phyllos[i].centerX <= -40) Phyllos[i].centerX = canvasWidth;
                if(Phyllos[i].centerY <= -40) Phyllos[i].centerY = canvasHeight + 40;
            }
        },

        drawPhyllos(){
            for(let i = 0; i < Phyllos.length; i++){
                this.drawPhyllotaxis(Phyllos[i].ctx, Phyllos[i].centerX, Phyllos[i].centerY, Phyllos[i].divergence, Phyllos[i].space, Phyllos[i].size, Phyllos[i].steps, Phyllos[i].shape, Phyllos[i].color);
            }

        },

        clearPhyllos(){
            Phyllos.length = 0;
        }

    };

    let Phyllotaxis = class {
        constructor(ctx, centerX, centerY, divergence, space, size, steps, shape, color){
            this.ctx = ctx;
            this.centerX = centerX;
            this.centerY = centerY;
            this.divergence = divergence;
            this.space = space;
            this. size = size;
            this.steps = steps;
            this.shape = shape;
            this.color = color;
        }
    }

    window["jdbLIB"] = jdbLIB;
    window["Phyllotaxis"] = Phyllotaxis;

})();
