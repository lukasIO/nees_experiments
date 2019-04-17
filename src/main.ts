import update from './update';
import { Point, mod } from './utils';
import { LineDrawer2D, DIRECTION } from './LineDrawer2D'


var canvases = document.getElementsByTagName('canvas') as HTMLCollectionOf<HTMLCanvasElement>;

var drawers: LineDrawer2D[] = [];


for(let i = 0; i < canvases.length; i++)
{
    let canvas = canvases[i];
    let ctx = canvas.getContext("2d");

    let drawerEl = new LineDrawer2D();
    drawerEl.ctx = ctx;
    drawerEl.init();
    drawerEl.drawStartingPoints(200,200);
    drawerEl.Render(false);
    drawerEl.onAnimationStepsCompleted( event => {
        drawerEl.DrawSquare(200, 200);
    })
    
    drawers.push(drawerEl);


}
