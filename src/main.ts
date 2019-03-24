import update from './update';
import { LineDrawer2D, Point, DIRECTION, mod } from './utils';

var canvases = document.getElementsByTagName('canvas') as HTMLCollectionOf<HTMLCanvasElement>;

var drawers: LineDrawer2D[] = [];

for(let i = 0; i < canvases.length; i++)
{
    let canvas = canvases[i];
    var ctx = canvas.getContext("2d");

    var drawerEl = new LineDrawer2D();
    drawerEl.ctx = ctx;
    drawerEl.Render();
    
    drawers.push(drawerEl);


}


function DrawAllSquares(drawers: LineDrawer2D[], width: number, height: number)
{
    drawers.forEach(drawer => {
        DrawSquare(drawer, width, height)
    })
}


function DrawSquare(drawer: LineDrawer2D, width: number, height: number)
{
    let lastPoint = drawer.points.slice(-1)[0];
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
        if(drawer.dir == DIRECTION.UP)
        {
            pt.x = lastPoint.x;
            pt.y = mod((lastPoint.y + stepLength), height);
        }
        else if(drawer.dir == DIRECTION.LEFT)
        {
            pt.x = mod((lastPoint.x - stepLength), width);
            pt.y = lastPoint.y;
        }
        else if(drawer.dir == DIRECTION.DOWN)
        {
            pt.x = lastPoint.x;
            pt.y = mod((lastPoint.y - stepLength), height);       
        }
        else if(drawer.dir == DIRECTION.RIGHT)
        {
            pt.x = mod((lastPoint.x + stepLength), width);
            pt.y = lastPoint.y;
        }

        

        

    }

    else{
        pt.x =  Math.random()*width;
        pt.y = Math.random()*height;
        
    }

    drawer.dir = (drawer.dir + 1) % 4;
   
    drawer.points.push(pt);
    drawer.points = drawer.points.slice(-30);

}


setInterval(() => {
    DrawAllSquares(drawers, 200, 200);
    console.log("all squares");
}, 500)
;



// update();