/**
 * Created by behring on 2017/5/17.
 */

$(document).ready(function(){
    $('.dropdown-toggle').dropdown();
    $('.collapse').collapse('hide');

    var options = {
        currentPage: $("#paginator").data("currentPage") || 0,
        totalPages: $("#paginator").data("totalPages") || 0,
        numberOfPages:10,
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first":
                    return "首页";
                case "prev":
                    return "上一页";
                case "next":
                    return "下一页";
                case "last":
                    return "末页";
                case "page":
                    return page;
            }
        },
        //点击事件
        onPageClicked: function (event, originalEvent, type, page) {
            location.href = "/pictures/"+ $("h4").text() + "?page=" + page;
        }
    };
    $('#paginator').bootstrapPaginator(options);
});