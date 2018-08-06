/* 饼图组件资源 */

let H5ComponentPie = function (name, cfg={}) {
    let component = new H5ComponentBase(name, cfg);

    // 绘制网格线
    let w = cfg.width;
    let h = cfg.height;

    // 加入一块画布（底板层）
    let cns = document.createElement('canvas');
    let ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 1);
    component.append(cns);

    let r = w/2;

    // 加入一个底图层
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 加入一块画布（数据层）
    let cns2 = document.createElement('canvas');
    let ctx2 = cns2.getContext('2d');
    cns2.width = ctx2.width = w;
    cns2.height = ctx2.height = h;
    $(cns2).css('zIndex', 2);
    component.append(cns2);

    let colors = ['red', 'green', 'blue', 'yellow', 'orange']; // 备用颜色

    let sAngel = 1.5 * Math.PI; // 设置开始时的角度
    let eAngel = 0; // 结束的角度
    let aAngel =  2 * Math.PI; // 360 弧结束的角度 2pi = 360;


    // ctx.beginPath();
    // ctx.fillStyle = '#f00';
    // ctx.strokeStyle = '#f00';
    // ctx.lineWidth = 1;
    // ctx.moveTo(r, r);
    // ctx.arc(r, r, r, sAngel, aAngel);
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();

    let step = cfg.data.length;
    for(let i =0; i < step; i++) {
        let item = cfg.data[i];
        let color = item[2] || (item[2] = colors.pop());
        console.log(item[2]);

        eAngel = sAngel + aAngel * item[1];
        ctx2.beginPath();
        ctx2.fillStyle = color;
        ctx2.strokeStyle = color;
        ctx2.lineWidth = .1;
        ctx2.moveTo(r, r);
        ctx2.arc(r, r, r, sAngel, eAngel);
        ctx2.closePath();
        ctx2.fill();
        ctx2.stroke();

        sAngel = eAngel;
    }


    // 加入一块画布（蒙版层）
    let cns3 = document.createElement('canvas');
    let ctx3 = cns3.getContext('2d');
    cns3.width = ctx3.width = w;
    cns3.height = ctx3.height = h;
    $(cns3).css('zIndex', 3);
    component.append(cns3);


    // 加入一个底图层
    ctx3.beginPath();
    ctx3.fillStyle = '#eee';
    ctx3.strokeStyle = '#eee';
    ctx3.lineWidth = 1;
    ctx3.arc(r, r, r, 0, 2 * Math.PI);
    ctx3.closePath();
    ctx3.fill();
    ctx3.stroke();


    function draw(per) {

    }

    component.on('onLoad', function () {
        // 雷达图生长动画
        let s = 0;
        for( let i = 0; i < 100; i++) {
            setTimeout(() => {
                s+= .01;
                // draw(s);
            }, i * 10 + 500);
        }
    })

    component.on('onLeave', function () {
        // 雷达图退场动画
        let s = 1;
        for( let i = 0; i < 100; i++) {
            setTimeout(() => {
                s-= .01;
                // draw(s);
            }, i * 10);

        }
    })

    return component;
}