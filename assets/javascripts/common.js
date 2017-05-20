/**
 * Created by behring on 2017/5/17.
 */


var options = {
    currentPage: 4,
    totalPages: 10,
    numberOfPages:5,
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
};

$(document).ready(function(){
    $('.dropdown-toggle').dropdown();
    $('.collapse').collapse();
    $('#paginator').bootstrapPaginator(options);
});