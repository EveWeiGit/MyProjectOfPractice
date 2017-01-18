import { ga } from 'ga';
import 'layerApp';
import 'layerAppCss';
import BaseFetch from 'BaseFetch';
import baseApp from 'baseApp';

ga();
var getParam = (url = window.location.href) => {
    var pattern = /(\w+)=([^\#&]*)/ig;
    var parames = {};
    url.replace(pattern, function(attr, key, value) {
        parames[key] = decodeURI(value);
    });
    return parames;
}
$(function() {

    var scrollTop = sessionStorage.getItem('scroll');
    sessionStorage.removeItem('scroll');
    $(window).scrollTop(scrollTop);
    $(window).scroll(function() {
        sessionStorage.setItem('scroll', $(window).scrollTop());
    });

     function parseUrl(url) {
        var pattern = /(\w+)=([^\#&]*)/ig,
            parames = {};
        url = url || window.location.href;
        url.replace(pattern, function(attr, key, value) {
            parames[key] = decodeURI(value);
        });
        return parames;
    }

    $("#Recommend").click(function() {
        var p = parseUrl(window.location.href).p || '';
        $("#Recommend").attr("href", "http://selfservice.ceair.com/lowpriceinter/lowpriceinter/index?p="+p);

    });


    var tab = $(".tab");
    var btn = $("button");
    btn.click(function() {
        var $this = $(this);
        var $t = $this.index();
        var LocationHref = window.location.href;
        window.location.href = LocationHref.split('#')[0] + $(this).attr('str');
        btn.removeClass();
        $this.addClass('active');
        tab.addClass('hide').eq($t).removeClass('hide');
    });

    var _hash = window.location.hash;
    switch (_hash) {
        case "#NewYear":
            $("button[str='#NewYear']").click();
            break;
        case "#CrowdTicket":
            $("button[str='#CrowdTicket']").click();
            break;
        case "#JoinIdCard":
            $("button[str='#JoinIdCard']").click();
            break;
        case "#LifeApp":
            $("button[str='#LifeApp']").click();
            break;
        case "#SpringTiket":
            $("button[str='#SpringTiket']").click();
            break;
        case "#TravelProduct":
            $("button[str='#TravelProduct']").click();
            break;
        default:
            console.log('1');
            break;
    }




    $.fn.tap = function(fn, Pop) {
        if (!("_tommyfoks_tapPlugin" in window)) {
            window._tommyfoks_tapPlugin = [];
        }
        var collection = this,
            isTouch = 'ontouchstart' in window,
            tstart = isTouch ? "touchstart" : "mousedown",
            tmove = isTouch ? "touchmove" : "mousemove",
            tend = isTouch ? "touchend" : "mouseup",
            tcancel = isTouch ? "touchcancel" : "mouseout";
        collection.each(function() {
            var i = {};
            i.target = this;
            _tommyfoks_tapPlugin.push(i);
            $(i.target).on(tstart, function(e) {
                var p = "touches" in e ? e.touches[0] : (isTouch ? e.originalEvent.touches[0] : e.originalEvent);
                i.startX = p.clientX;
                i.startY = p.clientY;
                i.endX = p.clientX;
                i.endY = p.clientY;
                i.startTime = +new Date;
            });
            $(i.target).on(tmove, function(e) {
                var p = "touches" in e ? e.touches[0] : (isTouch ? e.originalEvent.touches[0] : e.originalEvent);
                i.endX = p.clientX;
                i.endY = p.clientY;
            });
            $(i.target).on(tend, function(e) {
                if ((+new Date) - i.startTime < 300) {
                    if (Math.abs(i.endX - i.startX) + Math.abs(i.endY - i.startY) < 20) {
                        fn.call(i.target, e);
                    }
                }
                i.startTime = undefined;
                i.startX = undefined;
                i.startY = undefined;
                i.endX = undefined;
                i.endY = undefined;
                e.preventDefault();
            });
        });
        return collection;
    };

    class Render {

        init() {
            let obj = this.booking();
            $('#Booking').tap(obj.fun);


        }

        booking() {
            var getParam = function(url) {
                var pattern = /(\w+)=([^\#&]*)/ig;
                var parames = {};
                url.replace(pattern, function(attr, key, value) {
                    parames[key] = decodeURI(value);
                });
                return parames;
            };
            var showlogin = {};
            showlogin.ShowCus = function() {
                var u = navigator.userAgent,
                    w = window.location.href,
                    t;
                if (w.match(/index/ig)) {
                    t = getParam(w);
                } else {
                    t = getParam(document.referrer);
                }
                if (t && t["t"] == "wap") {
                    return "wap";
                }
                if (u.match(/Android/i) != null) { //android
                    return "Android";
                } else if (u.match(/iPhone|iPod/i) != null) { //IOS
                    return "IOS";
                } else {
                    return "WP";
                }
            };

            function parseDate(e, separator) {
                var t = new RegExp(/^(\d{1})$/),
                    a = (e.getMonth() + 1 + "").replace(t, "0$1"),
                    n = (e.getDate() + "").replace(t, "0$1");

                function Format() {
                    var o = {
                        "M+": this.getMonth() + 1,
                        "d+": this.getDate(),
                        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
                        "H+": this.getHours(),
                        "m+": this.getMinutes(),
                        "s+": this.getSeconds(),
                        "q+": Math.floor((this.getMonth() + 3) / 3),
                        "S": this.getMilliseconds()
                    };
                    var week = {
                        "0": "\u65e5",
                        "1": "\u4e00",
                        "2": "\u4e8c",
                        "3": "\u4e09",
                        "4": "\u56db",
                        "5": "\u4e94",
                        "6": "\u516d"
                    };
                    if (/(y+)/.test(separator)) {
                        separator = separator.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    }
                    if (/(E+)/.test(separator)) {
                        separator = separator.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
                    }
                    for (var k in o) {
                        if (new RegExp("(" + k + ")").test(separator)) {
                            separator = separator.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                        }
                    }
                    return separator;
                }
                return {
                    year: e.getFullYear(),
                    month: a,
                    date: n,
                    format: Format.call(e, separator)
                }
            }

            function onFlightBooking() {
                var customer = showlogin.ShowCus();
                switch (customer) {
                    case "Android":
                        SelectAirportInfo.clickOnAirportInfo('SHA', 'PEK', '上海虹桥', '北京首都', 'CN', 'CN', parseDate(new Date(), 'yyyyMMdd').format, '', 'DC');
                        break;
                    case "IOS":
                        clickOnAirportInfo('SHA', 'PEK', '上海虹桥', '北京首都', 'CN', 'CN', parseDate(new Date(), 'yyyyMMdd').format, '', 'DC');
                        break;
                    case "WP":
                        external.notify('clickOnAirportInfo?SHA&PEK&上海虹桥&北京首都&CN&CN&' + parseDate(new Date(), 'yyyyMMdd').format + '&&DC');
                        break;
                    case "wap":
                        window.location.href = "http://m.ceair.com/pages/booking/index.html";
                }
            };
            return {
                fun: onFlightBooking,
                customer: showlogin.ShowCus()
            }
        }
    }
    new Render().init();
});
