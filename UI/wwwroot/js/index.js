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
    sb_sum_total();
    sb_update_basket_amount();
}

function sb_sum_total() {
    var total = 0;
    $(".basket-products ul").find("li").each(function () {
        debugger;

        var amount = Number($(this).find("input").val());
        total = total + (amount * Number($(this).data("price")));
    });
    $(".basket-total-amount").text("฿ " + total);
}

function sb_update_basket_amount() {
    $(".basket-count p").text($(".basket-products ul").find("li").length);
}

function GetDataListProduct() {
    var _url = "Product/ListProducts";
    xhr_request_external(_url, null, "GET", function (result) {

        var data = result.data.listProducts;
        var startrow = '<div class="row mt-3 mb-3">';
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
                _html += '<h5 class="card-title">' + data[i].name + '<span style="color:red; font-size:1rem;"> out of stock</span>'+'</h5>';
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
    });
}



function expandsize(element) {
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
            _html += '<label class="lab-size" onclick="checkedsize(this,' + v.amount + ','+ v.price +')" for="' + v.size + id + '">' + v.size + '</label>';
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
    _html += '<button class="basket-add"> ADD TO CART</button >';
    _html += '</div>';
    _html += '</div>';

    _html += '</div>';
    $(".basket-products2").append(_html);
}

function kerpressamount(element) {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.returnValue = false;
    }
    changecheckamount(element)
}

function changecheckamount(element) {
    if ($(element).val() > amount) {
        $(element).val(amount)
    } else if (parseInt($(element).val()) < 1) {
        $(element).val(1)
    }
}

function checkedsize(element,amt,pri) {
    $('.lab-size').css({
        'background': '',
        'color': ''
    })
    $(element).css({
        'background': 'red',
        'color': '#fff'
    })
    $('.txt-amount').val(1);
    amount = amt
    price = pri
    $('.total-amount').text('มีสินค้าทั้งหมด ' + amt + ' ชิ้น');
    $('.total-price').text('ราคา ' + price + ' บาท / ชิ้น');
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
    console.log(arr);
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

