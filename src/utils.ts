

export class Point{
    x: number = 0;
    y: number = 0;
    width: number = 1;
}


/**
* Computes x mod n
* x arbitrary integer
* n natural number
*/
export const mod = (x: number, n: number) => (x % n + n) % n



export enum DIRECTION { UP, RIGHT, DOWN, LEFT };

//if step is 1 then emit new point and reset step to 0

export class LineDrawer2D{
    points: Point[] = [];
    dir: DIRECTION = DIRECTION.UP;
    step: number = 0;
    ctx: CanvasRenderingContext2D | null = null;

    Render()
    {
        if(this.ctx){
            this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.lineJoin = this.ctx.lineCap = 'round';
            
            for (var i = 1; i < this.points.length; i++) {               
               this.drawLine(this.points[i-1], this.points[i], this.ctx);
            }

            
        }
        requestAnimationFrame(() => this.Render());
    }

    drawLine(from: Point, to: Point, ctx: CanvasRenderingContext2D)
    {
       
        // ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.lineWidth = to.width
        ctx.stroke();
        
    }

    animatedPoint(startX: number, startY: number, endX: number, endY: number, context: CanvasRenderingContext2D) : Point {
        context.beginPath();
        context.moveTo(startX, startY);
        this.step += 0.05;
        // if (step > 1) step = 1;
        var newX = startX + (endX - startX) * this.step;
        var newY = startY + (endY - startY) * this.step;
        return {x: newX, y: newY, width: 1};
    }
}

