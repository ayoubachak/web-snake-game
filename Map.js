export class Map{
    constructor(args){
        let { ctx, name, border , rectangles, borderColor, cellWidth, cellHeight, background} = args;
        this.name = name;
        this.ctx = ctx;
        this.border = border?(border!=undefined):true;
        this.rectangles = rectangles?rectangles:[];
        this.borderColor = borderColor?borderColor:"#002026";
        this.backgroundColor = background?background:"#05D9FF";
        this.cellWidth = cellWidth?cellWidth:10;
        this.cellHeight = cellHeight?cellHeight:10;
        
        // render the map after the settings
        this.render();
    }
    render() {
        // draw the background fisrt
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.rect(0, 0, 800, 600);
        this.ctx.fill();
        
        // 
        for (let i=0; i<this.rectangles.length; i++) {
            let rect = this.rectangles[i];
            this.ctx.fillStyle = this.borderColor;
            this.ctx.rect(rect.x*this.cellHeight, rect.y*this.cellHeight, rect.w * this.cellWidth, rect.h * this.cellHeight);
            this.ctx.fill();
        }
        if(this.border){
            this.ctx.lineWidth = this.cellHeight;
            this.ctx.strokeStyle = this.borderColor;
            this.ctx.rect(parseInt(this.cellWidth/2), parseInt(this.cellHeight/2), 800- this.cellWidth, 600-this.cellHeight);
            this.ctx.stroke();
        }
    }
}
var rectangles = [
    {
        x:3,
        y:3,
        w:3,
        h:4
    }
];


export var Maps =[

]