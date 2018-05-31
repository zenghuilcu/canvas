var canvas=document.getElementById("canvas");
if(canvas.getContext){
    var h=100,w=700;
    canvas.height=h;
    canvas.width=w;
    var date=[];
    var balls=[];
    var R=canvas.height/20-1;
    var cxt=canvas.getContext("2d");

    (function(){
        var temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        //存储时间数字，由十位小时、个位小时、冒号、十位分钟、个位分钟、冒号、十位秒钟、个位秒钟这7个数字组成
        date.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
    })();


    function createnum(index,num) {
        for(var i = 0; i < digit[num].length; i++){
            for(var j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] == 1){
                    cxt.beginPath();
                    cxt.arc(14*(R+2)*index + j*2*(R+1)+(R+1),i*2*(R+1)+(R+1),R,0,2*Math.PI);
                    cxt.closePath();
                    cxt.fill();
                }
            }
        }
    }

    function getChange() {
        var changeNum=[];
        var temp=/(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
        var newData=[];
        newData.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6]);
        for(var i = date.length-1; i >=0 ; i--){
            if(newData[i] !== date[i]){
                changeNum.push(i+'_'+(Number(date[i])+1)%10);
            }
        }
        for(var i=0;i<changeNum.length;i++){
            addBalls.apply(this,changeNum[i].split('_'));
        }
        date = newData.concat();
    }

    function updateBalls() {
        for(var i=0;i<balls.length;i++){
            balls[i].stepY += balls[i].disY;
            balls[i].x += balls[i].stepX;
            balls[i].y += balls[i].stepY;
            if(balls.y+R>h){
                balls[i].y -= balls[i].stepY;
            }
            if(balls[i].x < 0 || balls[i].y > w - R){
                balls.splice(i,1);
                i--;
            }
        }
    }

    function addBalls(index,num) {
        var numArray=[1,2,3];
        var color=["#3BE","#09C","#A6C","#93C","#9C0","#690","#FB3","#F80","#F44","#C00"];

        for(var i=0; i < digit[num].length;i++){
            for(var j=0;j<digit[num][i].length;j++){
                if(digit[num][i][j] == 1){
                    var ball = {
                        x:14*(R+2)*index + j*2*(R+1)+(R+1),
                        y:i*2*(R+1)+(R+1),
                        stepX:Math.floor(Math.random() * 4 -2),
                        stepY:-2*numArray[Math.floor(Math.random()*numArray.length)],
                        color:color[Math.floor(Math.random()*color.length)],
                        disY:1
                    };

                    balls.push(ball);
                }
            }

        }
    }

    function render() {
        canvas.height=300;
        for(var i=0;i<date.length;i++){
            createnum(i,date[i]);
        }
        for(var i=0;i<balls.length;i++){
            cxt.beginPath();
            cxt.arc(balls[i].x,balls[i].y,R,0,2*Math.PI);
            cxt.fillStyle = balls[i].color;
            cxt.closePath();
            cxt.fill();
        }
    }

    clearInterval(oTimer)
    var oTimer=setInterval(
        function () {
            getChange();
            updateBalls();
            render();
        },30
    )

}