$(".sidebar-dropdown > a").click(function () {
    $(".sidebar-submenu").slideUp(200);
    if (
        $(this)
            .parent()
            .hasClass("active")
    ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .parent()
            .removeClass("active");
    } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
        $(this)
            .parent()
            .addClass("active");
    }
});

$("#close-sidebar").click(function () {
    $(".page-wrapper").removeClass("toggled");
});

$("#show-sidebar").click(function () {
    $(".page-wrapper").addClass("toggled");
});

function xhr_request_external(_url, _datajson, type, _callback) {
    var url = "https://localhost:44347/api/" + _url;
    jQuery.support.cors = true;
    $.ajax({
        url: url,
        type: type,
        cache: false,
        contentType: "application/json",
        data: _datajson,
        async: true,
        success: function (result) {
            console.log(result);
            // return result;
            if (result != null || result != "") {
                return _callback(result);
            }
            else {
                return _callback(result);
            }
        },
        error: function (xhr) {
            alert("กรุณาลองใหม่อีกครั้ง..");
        }
    });
}


