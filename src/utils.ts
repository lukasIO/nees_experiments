



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

export function drawLineInterpolated(from: Point, to: Point, ctx: CanvasRenderingContext2D, step: number, reversed: boolean = false)
    {
        let toInterpol = lerpPoint(from, to, step);
        if(reversed)
            toInterpol.width = from.width;
        drawLine(from, toInterpol, ctx);
    }

export function drawLine(from: Point, to: Point, ctx: CanvasRenderingContext2D)
    {    
        // ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.lineWidth = to.width
        ctx.stroke();
        
    }

function lerpPoint(a: Point, b: Point, t: number) : Point {
    let x = lerp(a.x, b.x, t);
    let y = lerp(a.y, b.y, t);
   
    return {x: x, y: y, width: b.width };
  

}

export function lerp(a: number, b: number, t: number) : number {
    return a + t * (b - a);
  }
  

