/* 内容管理对象 */

let H5 = function ( ) {
    this.id = ('h5_' + Math.random()).replace('.', '_');
    this.el = $('<div class="h5" id="'+ this.id +'"></div>').hide();
    $('body').append( this.el );

    /**
     * 新增一个页
     * @param name 页面的名称，会加入 className 中
     * @param text 页面的默认文本
     * @return H5 H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function (name, text) {
        let page = $('<div class="h5_page"></div>');

        name && page.addClass('h5_page_' + name);
        text && page.text(text);

        this.el.append(page);
        return this;
    }

    this.addComponent = function () {
        
    }

    /**
     * H5 对象初始化呈现
     */
    this.loader = function () {
        this.el.show();
    }

    return this;
}