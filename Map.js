export class Map{
    constructor(args){
        let { ctx, name, border , rectangles, borderColor, cellWidth, cellHeight, background} = args;
        this.name = name;
        this.ctx = ctx;
        // setting the border (I know this method is bad but hang with me)
        this.border = true;
        if(border!=undefined){
            this.border = border;
        }
        this.rectangles = rectangles?rectangles:[];
        console.log("border is ", border!=undefined, border, this.border);
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
            this.ctx.fillRect(rect.x*this.cellWidth, rect.y*this.cellHeight, rect.w * this.cellWidth, rect.h * this.cellHeight);
        }
        if(this.border){
            this.ctx.lineWidth = this.cellHeight;
            this.ctx.strokeStyle = this.borderColor;
            this.ctx.rect(parseInt(this.cellWidth/2), parseInt(this.cellHeight/2), 800- this.cellWidth, 600-this.cellHeight);
            this.ctx.stroke();
        }
    }
}

