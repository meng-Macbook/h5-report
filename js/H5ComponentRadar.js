/* 雷达图组件资源 */

let H5ComponentRadar = function (name, cfg={}) {
    let component = new H5ComponentBase(name, cfg);


    // 绘制网格线
    let w = cfg.width;
    let h = cfg.height;

    // 加入一块画布（网格线背景）
    let cns = document.createElement('canvas');
    let ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    let r = w/2;
    let step = cfg.data.length;

    ctx.beginPath();
    ctx.arc(r, r, 5, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(r, r, r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();

    // 计算一个圆周上的坐标（计算多边形的顶点坐标）
    // 已知：圆心坐标（a, b）、半径 r；角度 deg。
    // rad = (2 * Math.PI/360) * (360 / step) * i;
    // x = a + Math.sin( rad ) * r;
    // y = b + Math.cos( rad ) * r;

    // 网格背景（分面绘制，分为10分）
    let isBlue = false;
    for(let s = 10; s > 0; s--) {
        ctx.beginPath();
        for(let i = 0; i < step; i++) {
            let rad = (2 * Math.PI/360) * (360 / step) * i;
            let x = r + Math.sin( rad ) * r * s/10;
            let y = r + Math.cos( rad ) * r * s/10;
            ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
        ctx.fill();
        ctx.stroke();
    }

    //  绘制伞骨
    ctx.beginPath();
    for(let i = 0; i < step; i++) {
        let rad = (2 * Math.PI/360) * (360 / step) * i;
        let x = r + Math.sin( rad ) * r;
        let y = r + Math.cos( rad ) * r;
        ctx.moveTo(r, r);
        ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.strokeStyle = '#e0e0e0';
    ctx.fill();
    ctx.stroke();

    // 数据层开发
    // 加入一块画布（数据层）
    let cns2 = document.createElement('canvas');
    let ctx2 = cns2.getContext('2d');
    cns2.width = ctx2.width = w;
    cns2.height = ctx2.height = h;
    component.append(cns2);

    ctx2.strokeStyle = '#f00';

    function draw(per) {
        // 输出数据的折线
        ctx2.clearRect(0, 0, w, h);
        ctx2.beginPath();
        for(let i = 0; i < step; i++) {
            let rad = (2 * Math.PI/360) * (360 / step) * i;
            let rate = cfg.data[i][1] * per;
            let x = r + Math.sin( rad ) * r * rate;
            let y = r + Math.cos( rad ) * r * rate;

            ctx2.lineTo(x, y);
        }

        ctx2.closePath();
        ctx2.stroke();

        // 输出数据的点
        ctx2.fillStyle = '#ff7676';
        for(let i = 0; i < step; i++) {
            let rad = (2 * Math.PI/360) * (360 / step) * i;
            let rate = cfg.data[i][1] * per;
            let x = r + Math.sin( rad ) * r * rate;
            let y = r + Math.cos( rad ) * r * rate;

            ctx2.beginPath();
            ctx2.arc(x, y, 5, 0, 2 * Math.PI);
            ctx2.fill();
            ctx2.closePath();
        }
        ctx2.stroke();


    }


    component.on('onLoad', function () {
        // 雷达图生长动画
        let s = 0;
        for( let i = 0; i < 100; i++) {
            setTimeout(() => {
                s+= .01;
                draw(s);
            }, i * 10 + 500);
        }

    })
    // component.on('onLeave', function () {
    //     // 雷达图退场动画
    //     let s = 1;
    //     for( let i = 0; i < 100; i++) {
    //         setTimeout(() => {
    //             s-= .01;
    //             // draw(s);
    //         }, i * 10);
    //
    //     }
    // })

    return component;
}