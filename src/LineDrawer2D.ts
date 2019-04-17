import { Point, drawLine, drawLineInterpolated, mod } from './utils'

export enum DIRECTION { UP, RIGHT, DOWN, LEFT };

//if step is 1 then emit new point and reset step to 0
type Handler<E> = (event: E) => void;

class EventDispatcher<E> { 
    private handlers: Handler<E>[] = [];
    fire(event: E) { 
        for (let h of this.handlers)
            h(event);
    }
    register(handler: Handler<E>) { 
        this.handlers.push(handler);
    }
}

interface StepsCompletedEvent {};

export class LineDrawer2D{
    points: Point[] = [];
    dir: DIRECTION = DIRECTION.UP;
    step: number = 0;
    stepSize: number = 0.05;
    ctx: CanvasRenderingContext2D | null = null;
    ticking: boolean = true;


    private stepsCompletedDispatcher = new EventDispatcher<StepsCompletedEvent>();

    public onAnimationStepsCompleted(handler: Handler<StepsCompletedEvent>) {
        this.stepsCompletedDispatcher.register(handler);
    }

    private fireStepsCompleted(event: StepsCompletedEvent) { 
       
        this.stepsCompletedDispatcher.fire(event);
    }
    
    private scrollHandler(event: WheelEvent)
    { 
        this.updateAnimationStep();
    }

    
   

    init() 
    {
        window.addEventListener('wheel', (e) => {this.scrollHandler(e)});        
    }

    dispose()
    {
        window.removeEventListener('wheel', (e) => {this.scrollHandler(e)});
    }


    Render()
    {
        if(this.ctx){
            this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
            // this.ctx.lineJoin = this.ctx.lineCap = 'round';
            
            //loop through all points except firt and last one
            for (var i = 2; i < this.points.length-1; i++) {               
               drawLine(this.points[i-1], this.points[i], this.ctx);
            }

            
            //handle animation of first point
            if(this.points.length > 1)
                drawLineInterpolated(this.points[1],this.points[0], this.ctx, 1-this.step, true);

            //handle animation of last point
            if(this.points.length > 29)
                drawLineInterpolated(this.points[this.points.length-2],this.points[this.points.length-1], this.ctx, this.step);


            // this.updateAnimationStep();     
                  
        }
        requestAnimationFrame(() => {
            this.Render();
            
        });
        
    }

    updateAnimationStep()
    {
        if(this.step >= 1)
        {
            this.step = 0;
            this.fireStepsCompleted({});
        }
        
        
        this.step += 0.05;
           
       
        
    }  
    drawStartingPoints(width: number, height: number)
    {
        for(let i = 0; i < 30; i++)
        {
            this.DrawSquare(width, height);
        }
    }

    DrawSquare(width: number, height: number)
    {
        let lastPoint = this.points.slice(-1)[0];
        let pt = new Point();
        var thickProbability = Math.random();
        if(thickProbability > 0.9)
        {
            pt.width = Math.random() * 2 + 0.5;
        }
        else {
            pt.width = 0.5;
        }
        if(lastPoint){
            let stepLength = Math.random() * height;
            if(this.dir == DIRECTION.UP)
            {
                pt.x = lastPoint.x;
                pt.y = mod((lastPoint.y + stepLength), height);
            }
            else if(this.dir == DIRECTION.LEFT)
            {
                pt.x = mod((lastPoint.x - stepLength), width);
                pt.y = lastPoint.y;
            }
            else if(this.dir == DIRECTION.DOWN)
            {
                pt.x = lastPoint.x;
                pt.y = mod((lastPoint.y - stepLength), height);       
            }
            else if(this.dir == DIRECTION.RIGHT)
            {
                pt.x = mod((lastPoint.x + stepLength), width);
                pt.y = lastPoint.y;
            }

        }

        else{
            pt.x =  Math.random()*width;
            pt.y = Math.random()*height;
            
        }

        this.dir = (this.dir + 1) % 4;
    
        this.points.push(pt);
        this.points = this.points.slice(-30);

    }
  
}