$(document).ready(function () {
    sb_set_basket_events();
    GetDataListProduct();
    $.fn.child = function (s) {
        return $(this).children(s)[0];
    }
});
var totalamount = 0;
var amount = 0;
var price = 0;
var arrcart = [];
var arrforaddcart = [];
var MasterData = "";

function sb_set_basket_events() {

    // Set scroll for basket
    $(window).scroll(function () {
        if ($(window).scrollTop() === 0) {
            $(".basket-container").removeClass("basket-scrolling");
        } else {
            if (!$(".basket-container").hasClass("basket-scrolling")) {
                $(".basket-container").toggleClass("basket-scrolling");
            }
        }
    });

    // Set Icon open and close
    $(".basket-icon").click(function () {
        $('.basket-container2').removeClass('open-basket2');
        $('.basket-icon2').each(function () {
            $(this).children().css('transform', '')
        })
        $(this).parent().toggleClass("open-basket");
    });

    // Set remove product from basket
    $(".remove-product").click(function () {
        sb_remove_from_basket($(this));
    });

    // Set on change for prouct amounts
    $(".basket-products input").change(function () {
        sb_sum_total();
    });

}

function sb_add_to_basket(pid, name, price) {
    if (sb_product_not_exist(pid)) {
        var shortName = name;
        if (name.length > 10) {
            shortName = name.substring(15, 0) + "...";
        }
        debugger;

        $(".basket-products ul").append(
            $("<li>").append(
                $("<span>", { "class": "oi oi-x remove-product" }).click(function () {
                    sb_remove_from_basket($(this));
                }),
                $("<input>", { "type": "number", "min": "1" }).val(1).change(function () {
                    sb_sum_total();
                }),
                shortName,
                $("<span>", { "class": "amount" }).text("฿ " + price)
            ).data("price", price).data("pid", pid)
        );
    }
    sb_sum_total();
    sb_update_basket_amount();
}

function sb_product_not_exist(pid) {
    var notFound = true;
    $(".basket-products ul").find("li").each(function () {
        if ($(this).data("pid") == pid) {
            var val = Number($(this).find("input").val()) + 1;
            $(this).find("input").val(val);
            notFound = false;
            return false;
        } else {
            notFound = true;
        }
    });
    return notFound;
}

function sb_remove_from_basket(product) {
    $(product).parent().remove();
    var id = $(product).data('id');
    var size = $(product).data('size');
    $.each(arrcart, function (i, v) {
        if (v.id == id && v.size == size) {
            arrcart.splice(i, 1);
            return false;
        }
    })
    sb_sum_total();
    sb_update_basket_amount();
}

function sb_sum_total() {
    var total = 0;
    $(".basket-products ul").find("li").each(function () {
        var am = Number($(this).find("input").val());
        total = total + (am * Number($(this).data("price")));
    });
    $(".basket-total-amount").text("฿ " + total);
}

function sb_update_basket_amount() {
    $(".basket-count p").text($(".basket-products ul").find("li").length);
}

function GetDataListProduct() {
    var _url = "Product/ListProducts";
    xhr_request_external(_url, null, "GET", function (result) {
        MasterData = result.data.listProducts;
        var data = result.data.listProducts;
        var startrow = '<div class="row rowgrid mt-3 mb-3">';
        var startcol = '<div class="col-sm-4 pt-3">';
        var card = '<div class="card" style="width: 18rem;">';
        var cardbody = '<div class="card-body">';
        var enddiv = '</div>';
        var bodycont = '<div class="body-container2">';
        var bascont = '<div class="basket-container2">';
        var basicondis = '<div class="basket-icon3">';
        var icon = '<i class="fa fa-plus" ></i>';
        var basdetail = '<div class="basket-content2">';
        var header = '<h3>Select Size</h3>';
        var basprod = '<div class="basket-products2">';
        var startul = '<ul>';
        var endul = '</ul>';

        var _html = "";
        var count = 0;

        $("#content").empty();
        for (var i = 0; i < data.length; i++) {
            var size = data[i].size.split(',');
            var amount = data[i].amount.split(',');
            var basicon = '<div class="basket-icon2" data-basket-product-id="' + data[i].id + '"data-basket-product-name="' + data[i].name + '"data-basket-product-price="' + data[i].price + '" data-basket-product-size="' + data[i].size + '" data-basket-product-amount="' + data[i].amount + '" onclick="expandsize(this)" >';
            count++;
            if (count == 1) {
                _html += startrow;
            }

            _html += startcol;
            _html += card;
            _html += '<img class="card-img-top" src="' + data[i].url + '" alt="Card image cap">';
            _html += cardbody;

            var arrchkamount = [];
            $.each(amount, function (i, v) {
                if (parseInt(v) == 0) {
                    arrchkamount.push(v);
                }
            });
            if (arrchkamount.length == 5) {
                _html += '<h5 class="card-title">' + data[i].name + '<span style="color:red; font-size:1rem;"> out of stock</span>' + '</h5>';
                _html += '<p class="card-text">' + data[i].detail + '</p >';
                _html += bodycont;
                _html += bascont;
                _html += basicondis;
                _html += icon;
                _html += enddiv;
                _html += basdetail;
                _html += header;
                _html += basprod;
                _html += startul + endul;
                _html += enddiv;
                _html += enddiv;
                _html += enddiv;
                _html += enddiv;

                //_html += '<button disabled onclick="onclickaddcart(this)" class="basket-add" data-basket-product-id="' + data[i].id + '"data-basket-product-name="' + data[i].name + '"data-basket-product-price="' + data[i].price + '">ADD TO CART</button>';
            } else {
                _html += '<h5 class="card-title">' + data[i].name + '</h5>';
                _html += '<p class="card-text">' + data[i].detail + '</p >';
                _html += bodycont;
                _html += bascont;
                _html += basicon;
                _html += icon;
                _html += enddiv;
                _html += basdetail;
                _html += header;
                _html += basprod;
                _html += startul + endul;
                _html += enddiv;
                _html += enddiv;
                _html += enddiv;
                _html += enddiv;

                //_html += '<button onclick="onclickaddcart(this)" class="basket-add" data-basket-product-amount="' + data[i].amount + '" data-basket-product-size="' + data[i].size + '" data-basket-product-id="' + data[i].id + '"data-basket-product-name="' + data[i].name + '"data-basket-product-price="' + data[i].price + '">ADD TO CART</button>';
            }
            _html += enddiv;
            _html += enddiv;
            _html += enddiv;

            if (count == 3) {
                _html += enddiv; //end row
                count = 0;
            }
        }
        $("#content").append(_html);
        setPagination()
    });
}



function expandsize(element) {
    $('.basket-container').removeClass('open-basket');
    $('.basket-icon2').children().css('transform', '')
    if ($(element).parent().hasClass("open-basket2")) {
        $(element).parent().removeClass('open-basket2');
        $($(element).child()).css('transform', '')
    } else {
        $('.basket-container2').removeClass('open-basket2');
        $(element).parent().toggleClass("open-basket2");
        $($(element).child()).css('transform', 'rotate(45deg)')
        showsize(element);
    }
}

function onclickaddcart(element) {
    sb_add_to_basket(
        $(element).data("basket-product-id"),
        $(element).data("basket-product-name"),
        $(element).data("basket-product-price")
    );
}

function showsize(element) {
    arrforaddcart = [];
    const id = $(element).data("basket-product-id");
    const name = $(element).data("basket-product-name");
    const pricestr = $(element).data("basket-product-price");
    const sizestr = $(element).data("basket-product-size");
    const amountstr = $(element).data("basket-product-amount");

    $(".basket-products2").empty();

    var sizearr = mapsizeandamount(sizestr, amountstr, pricestr);
    var priceavg = avgprice(pricestr);
    var _html = '';
    _html += '<div class="select-size mt-2" style="text-align: center;">';
    _html += '<div class="row mr-0">'
    _html += '<div class="col-sm-12" style="margin:auto;">'
    _html += '<H4 class="total-price">ราคา ' + priceavg + ' บาท / ชิ้น</h4>';
    _html += '</div>';
    _html += '</div>';
    _html += '';
    $.each(sizearr, function (i, v) {
        if (parseInt(v.amount) == 0) {
            _html += '<input type="radio" name="s-size" id="' + v.size + id + '" />';
            _html += '<label class="lab-size" style="cursor:no-drop;" for="' + v.size + id + '">' + v.size + '</label>';
        } else {
            _html += '<input type="radio" name="s-size" id="' + v.size + id + '" />';
            _html += '<label class="lab-size" data-id="' + id + '" data-name="' + name + '" data-size="' + v.size + '" data-amount="' + v.amount + '" data-price="' + v.price + '" onclick="checkedsize(this)" for="' + v.size + id + '">' + v.size + '</label>';
        }
    })
    _html += '</div>';
    _html += '<div class="text-amount" style="text-align: center;">';
    _html += '<div class="row mr-0">';
    _html += '<div class="col-sm-6">';
    _html += '<input type="number" onkeypress = "kerpressamount(this)" onchange="changecheckamount(this)" style="width: 100%;" class="form-control txt-amount" value="1" />';

    _html += '</div>';
    totalamount = 0;
    $.each(sizearr, function (i, v) {
        totalamount += parseInt(v.amount);
    })
    _html += '<div class="col-sm-6" style="margin:auto;">'
    _html += '<span class="total-amount">มีสินค้าทั้งหมด ' + totalamount + ' ชิ้น</span>';
    _html += '</div>';
    _html += '</div>';

    _html += '<div class="row mr-0">';
    _html += '<div class="col-sm-6" style="margin:auto;">'
    _html += '<button class="basket-add" onclick="addtocart()" > ADD TO CART</button >';
    _html += '</div>';
    _html += '</div>';

    _html += '</div>';
    $(".basket-products2").append(_html);
}

function kerpressamountcart(element) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
}

function kerpressamount(element) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
    changecheckamount(element)
}

function changecheckamount(element) {
    if (amount > 0) {
        if ($(element).val() > amount) {
            $(element).val(amount)
        } else if (parseInt($(element).val()) < 1) {
            $(element).val(1)
        }
        setamountarraytocart($(element).val())
    } else {
        $(element).val(1)
    }
}

function checkedsize(element) {
    $('.lab-size').css({
        'background': '',
        'color': ''
    })
    $(element).css({
        'background': 'red',
        'color': '#fff'
    })
    $('.txt-amount').val(1);
    amount = $(element).data("amount")
    price = $(element).data("price")
    $('.total-amount').text('มีสินค้าทั้งหมด ' + amount + ' ชิ้น');
    $('.total-price').text('ราคา ' + price + ' บาท / ชิ้น');
    setarraytocart(element);
}

function mapsizeandamount(size, amount, price) {
    const sizearr = size.split(',');
    const amountarr = amount.split(',');
    const pricearr = price.split(',');
    var arr = [];
    sizearr.forEach((size, index) => {
        var new_object = {};
        new_object['size'] = '';
        new_object['amount'] = '';
        new_object['price'] = '';
        const amount = amountarr[index];
        const price = pricearr[index];
        new_object['size'] = size;
        new_object['amount'] = amount;
        new_object['price'] = price;
        arr.push(new_object);
    });
    return arr;
}
function avgprice(pricestr) {
    var pricearr = pricestr.split(',');
    var avg = 0;
    var count = 0;
    $.each(pricearr, function (i, v) {
        avg += parseInt(v);
        count = i;
    });
    count = count + 1
    var result = avg / count;
    return result;
}
function setarraytocart(element) {
    var objectforaddcart = {};
    arrforaddcart = [];
    objectforaddcart['id'] = $(element).data("id");
    objectforaddcart['name'] = $(element).data("name");
    objectforaddcart['size'] = $(element).data("size");
    objectforaddcart['price'] = $(element).data("price");
    objectforaddcart['amount'] = 1;
    arrforaddcart.push(objectforaddcart);

}

function setamountarraytocart(amt) {
    $.each(arrforaddcart, function (i, v) {
        v.amount = parseInt(amt);
    });
}

function addtocart() {

    if (arrforaddcart.length < 1) {
        alert("กรุณาเลือกสินค้า..");
        return false;
    }
    if (arrcart.length > 0) {
        $.each(arrforaddcart, function (i, v) {
            if (not_exist(v.id, v.size, v.amount)) {
                pusharraycart(arrforaddcart);
            }
        })
    } else {
        pusharraycart(arrforaddcart);
    }
    setElementCart(arrcart);
}
function not_exist(id, size, amt) {
    var ret = true;
    $.each(arrcart, function (i, v) {
        if (v.id == id && v.size == size) {
            v.amount += parseInt(amt)
            var arrmaster = Master(v.id, v.size);
            $.each(arrmaster, function (i2, v2) {
                if (v.amount > v2.amount) {
                    v.amount = parseInt(v2.amount)
                    alert("สินค้ามีทั้งหมด " + v2.amount + " ชิ้น ลูกค้าได้เลือกสินค้าครบจำนวนแล้ว");
                }
            })
            ret = false;
        }
    })
    return ret;
}

function pusharraycart(arr) {
    $.each(arr, function (i, v) {
        var newobj = {};
        newobj['id'] = v.id;
        newobj['name'] = v.name;
        newobj['size'] = v.size;
        newobj['amount'] = v.amount;
        newobj['price'] = v.price;
        arrcart.push(newobj);
    })
}

function setElementCart(array) {
    $(".basket-products ul").empty();
    $.each(array, function (i, v) {
        var shortName = v.name;
        if (v.name.length > 10) {
            shortName = v.name.substring(15, 0) + "...";
        }
        $(".basket-products ul").append(
            $("<li>").append(
                $("<span>", { "class": "oi oi-x remove-product", "data-id": "" + v.id, "data-size": "" + v.size }).click(function () {
                    sb_remove_from_basket($(this));
                }),
                $("<input>", { "type": "number", "min": "1", "onkeypress": "kerpressamountcart(this)" }).val(v.amount).change(function () {
                    checkamount(v.id, v.size, $(this));
                    sb_sum_total();
                }),
                shortName + " " + v.size,
                $("<span>", { "class": "amount" }).text("฿ " + v.price)
            ).data("price", v.price).data("pid", v.id)
        );
        sb_sum_total();
        sb_update_basket_amount();
    })

}

function Master(id, size) {
    var arrresult = [];
    $.each(MasterData, function (i, v) {
        const sizearr = v.size.split(',');
        const amountarr = v.amount.split(',');
        const pricearr = v.price.split(',');
        var arr = [];
        sizearr.forEach((sizearr2, index) => {
            var new_object = {};
            new_object['id'] = '';
            new_object['size'] = '';
            new_object['amount'] = '';
            new_object['price'] = '';
            const amount = amountarr[index];
            const price = pricearr[index];
            new_object['id'] = v.id;
            new_object['size'] = sizearr2;
            new_object['amount'] = amount;
            new_object['price'] = price;
            arr.push(new_object);
        });
        $.each(arr, function (i2, v2) {
            if (v2.id == id && v2.size == size) {
                var new_obj = {};
                new_obj['id'] = v2.id;
                new_obj['size'] = v2.size;
                new_obj['amount'] = v2.amount;
                new_obj['price'] = v2.price
                arrresult.push(new_obj);
                return false;
            }
        })
    })
    return arrresult;
}
function checkamount(id, size, am) {
    var arrmaster = Master(id, size);
    $.each(arrmaster, function (i, v) {
        if ($(am).val() > v.amount) {
            $(am).val(parseInt(v.amount))
            return false;
        }
    })
}

function setPagination() {
    $('.t1').after('<div id="nav" class="text-center"></div>');
    var rowsShown = 2;
    var rowsTotal = $('.t1 .rowgrid').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" class="btn-outline-info" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> ');
    }
    $('.t1 .rowgrid').hide();
    $('.t1 .rowgrid').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function (e) {

        $('.basket-container2').removeClass('open-basket2');
        $('.basket-icon2').each(function () {
            $(this).children().css('transform', '')
        })
        $('.basket-container').removeClass('open-basket');

        e.preventDefault();
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('.t1 .rowgrid').css('opacity', '0').hide().slice(startItem, endItem).
            css('display', 'flex').animate({
                opacity: 1
            }, 300);
    });
}