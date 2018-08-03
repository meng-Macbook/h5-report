/* 基本图文组件对象 */
let H5ComponentBase = function ( name,  cfg = {} ) {

    let id = ('h5_report_' + Math.random()).replace('.', '_');

    // 把当前的组件类型添加到样式中进行标记
    let cls = 'h5_component_' + cfg.type + ' h5_component_name_' + name; //
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

    return component;
}