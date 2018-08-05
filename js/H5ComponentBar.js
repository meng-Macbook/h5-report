/* 散点图表组件对象 */
let H5ComponentBar = function ( name,  cfg = {} ) {
    let component = new H5ComponentBase( name, cfg );

    $.each(cfg.data, function (idx, item) {
        console.log(item);

        let line = $('<div class="line"></div>');
        let name = $('<div class="name"></div>');
        let rate = $('<div class="rate"></div>');
        let per = $('<div class="per"></div>');

        let width = item[1] * 100 + '%';

        let bgStyle = '';
        item[2] && (bgStyle = 'style="background-color:' + item[2] + '"');

        rate.html('<div class="bg"'+ bgStyle +'></div>')
        rate.css('width', width);

        name.text( item[0]);
        per.text( width );
        line.append(name).append(rate).append(per);
        component.append(line);
    })


    return component;
}