/* 基本图文组件对象 */
let H5ComponentBase = function ( name,  cfg = {} ) {

    let id = ('h5_report_' + Math.random()).replace('.', '_');

    // 把当前的组件类型添加到样式中进行标记
    let cls =  'h5_component_name_' + name +' h5_component_' + cfg.type; //
    let component = $('<div class="h5_component '+ cls +'" id="'+ id +'"></div>');

    cfg.text    &&  component.text(cfg.text);
    cfg.width   &&  component.width(cfg.width/2);
    cfg.height  &&  component.height(cfg.height/2);

    cfg.css  &&  component.css(cfg.css);
    cfg.bg  &&  component.css('backgroundImage', 'url('+cfg.bg+')');

    if ( cfg.center === true ) {
        component.css({
            left: '50%',
            marginLeft : ( cfg.width/4 * -1 ),
        })
    }

    // ... 更过自定义参数
    component.on('onLoad', function () {

        $(this).addClass(cls + '_load').removeClass(cls + '_leave');
        cfg.animateIn && component.animate( cfg.animateIn );
        return this;
    })
    component.on('onLeave', function () {

        $(this).addClass(cls + '_leave').removeClass(cls + '_load');
        cfg.animateOut && component.animate( cfg.animateOut );
        return this;
    })

    return component;
}