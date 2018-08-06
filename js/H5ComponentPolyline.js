/* 折线组件 */
let H5ComponentPolyline = function (name, cfg = {}) {
    let component = new H5ComponentBase(name , cfg);

    // 绘制网格线
    let w = cfg.width;
    let h = cfg.height;

    // 加入一块画布（网格线背景）
    let cns = document.createElement('canvas');
    let ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    // 水平网格线 100 份 -> 10 份
    let step = 10;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#aaa';

    for(let i = 0; i <= step; i++) {
        let y = h/step * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }

    // 垂直网格线（根据项目的个数去分）
    step = cfg.data.length  + 1;
    let text_w = w/step >> 0;
    for(let i = 0; i <= step; i++) {
        let x = w/step * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        cfg.data[i] && function () {
            let text = $('<div class="text"></div>');
            text.text(cfg.data[i][0]);
            text.css('width', text_w/2).css('left', x/2 + text_w/2 - text_w/4);
            component.append(text);
        }()
    }
    ctx.stroke();

    // 加入画布 - 数据层
    let cns2 = document.createElement('canvas');
    let ctx2 = cns2.getContext('2d');
    cns2.width = ctx2.width = w;
    cns2.height = ctx2.height = h;
    component.append(cns2);

    ctx2.lineWidth = 3;
    ctx2.strokeStyle = '#ff8878';

    let row_w = w/(cfg.data.length + 1);

    /**
     * 折线、数据、阴影
     * @param {floot} per 0 ~ 1
     *
     */

    function draw(per) {
        // 清空画布
        ctx2.clearRect(0, 0, w, h);
        let x = 0;
        let y = 0;

        // 画点
        ctx2.beginPath();
        for (let i in cfg.data) {

            let item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);

            ctx2.moveTo(x, y);
            ctx2.arc(x, y, 5, 0, 2 * Math.PI);
        }
        ctx2.closePath();
        ctx2.stroke();

        // 连线、文字
        ctx2.lineWidth = 3;
        ctx2.strokeStyle = 'red';
        ctx2.moveTo(row_w, h - (cfg.data[0][1] * h * per));
        for (let i in cfg.data) {

            let item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - (item[1] * h * per);

            ctx2.lineTo(x, y);
            ctx2.fillStyle = item[2] != undefined ? item[2] : '#595959';
            ctx2.fillText((item[1] * 100 >> 0) + '%', x - 10, y - 10)
        }
        ctx2.stroke();

        // 阴影
        ctx2.lineWidth = 1;
        ctx2.strokeStyle = 'rgba(255, 136, 120, 0.2';
        ctx2.lineTo(x, h);
        ctx2.lineTo(row_w, h);
        ctx2.fillStyle = 'rgba(255, 136, 120, 0.2';
        ctx2.fill();
        ctx2.closePath();

        ctx2.stroke();
    }


    component.on('onLoad', function () {
        // 折线生长动画
        let s = 0;
        for( let i = 0; i < 100; i++) {
            setTimeout(() => {
                s+= .01;
                draw(s);
            }, i * 10 + 500);
        }

        let text = component.find('.text');
        for( let i = 0; i < cfg.data.length; i++) {
            setTimeout(() => {
                text.eq(i).css('opacity', 1);
            }, i * 200 + 500);
        }
    })
    component.on('onLeave', function () {
        // 折线退场动画
        let s = 1;
        for( let i = 0; i < 100; i++) {
            setTimeout(() => {
                s-= .01;
                draw(s);
            }, i * 10);

        }
    })


    return component;
}
