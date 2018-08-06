/* 饼图组件资源 */

let H5ComponentPie = function (name, cfg={}) {
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