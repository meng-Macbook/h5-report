/* 散点图表组件对象 */
let H5ComponentPoint = function ( name,  cfg = {} ) {
    let component = new H5ComponentBase( name, cfg );

    let base = cfg.data[0][1];

    $.each(cfg.data, function ( idx, item ) {

        let point = $('<div class="point point_'+ idx +'"></div>');

        let name = $('<div class="name">'+ item[0] +'</div>');
        let rate = $('<div class="per">'+ (item[1] * 100) +'%</div>');

        point.append(name.append(rate));

        let per = item[1]/base * 100 + '%';


        point.width(per).height(per);

        item[2] && point.css('backgroundColor', item[2]);
        (item[3] !== undefined && item[4] !== undefined) && point.css('left', item[3]).css('top', item[4]);

        component.append( point );

    })

    return component;
}