let H5_loading = function (images = [], firstPage) {

    let id = this.id;

    // 第一次进入
    if (this._images === undefined) {
        this._images = images.length;
        this._loaded = 0;

        window[id] = this; // 把当前对象存储在全局对象、 window 中，以用来进行某个图片加载完成的回调

        for(s in images) {
            let item = images[s];
            let img = new Image;
            img.onload = function () {
                window[id].loader();
            }
            img.src = item;
        }

        $('#rate').text('0%');
        return this;


    } else {
        this._loaded ++;
        $('#rate').text( ( (this._loaded / this._images * 100) >> 0 ) + '%' );
        if (this._loaded < this._images) {
            return this;
        }
    }

    window[id] = null;

    this.el.fullpage({
        afterRender: function() {
            $(this).find('.h5_component').trigger('onLoad');
        },
        onLeave: function (index, nextIndex , direction) {
            $(this).find('.h5_component').trigger('onLeave');
        },
        afterLoad: function (anchorLink, index) {
            $(this).find('.h5_component').trigger('onLoad');
        }
    });
    this.el.show();
    firstPage && $.fn.fullpage.moveTo( firstPage );
}