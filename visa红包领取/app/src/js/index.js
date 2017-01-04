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
$(document).ready(function() {
    var config = {
        ajaxUrl: "/activity/visa2017/visa2017Handler.ashx",
        vCode: "/activity/ValidateCode.aspx" //http://eb.ceair.com/activity/ValidateCode.aspx
    };
    $("#imgcode").attr("src", config.vCode);

    function judgeLogin(redirectUrl) {
        

        var showlogin = {};
        //判断客户端类型
        showlogin.ShowCus = function() {
            var u = navigator.userAgent,
                w = window.location.href,
                t = getParam(w);
            if (t && t["t"] == "wap") {
                return "wap";
            }
            if (u.match(/Android/i) != null) { //android设备
                return "Android";
            } else if (u.match(/iPhone|iPod/i) != null) { //IOS
                return "IOS";
            } else {
                return "WP";
            }
        };
        //登录
        showlogin.APPLogin = function(redirectUrl, title) {
            var customer = showlogin.ShowCus();
            var url = window.location.href;
            url = url.replace(/\&/g, '&amp;');
            title = "visah红包领取";
            switch (customer) {
                case "wap":
                    window.location.href = "http://m.ceair.com/mobile/user/user!loginOtherPage.shtml?channel=712&redirectUrl=" + redirectUrl;
                    break;
                case "Android":
                    Login.clickOnLogin(url, title, "mobile_login");
                    break;
                case "IOS":
                    clickOnLogin(url, title, "mobile_login");
                    break;
                case "WP":
                    external.notify("clickOnLogin?" + url + "&" + title + "&mobile_login");
                    break;
            }
        };
        return {
            goLogin: function() {
                showlogin.APPLogin(redirectUrl)
            }
        }
    }



    $.ajax({
        url: config.ajaxUrl,
        type: "post",
        data: {
            "type": "1",
            // "t":"ceair310109visa"
        },
        dataType: "json",
        success: function(data) {
            console.log(data);
            if (data.SuccessCode != "0") {
                var button = $("#btn");
                button.attr("disabled", "true");
                button.css({ "background-color": "#DBDBDB", "color": "#DB3B2F" });
                button.text("十点开抢");
            } else {
                $("#btn").addClass("btnNow");
            }

            switch (data.SuccessCode) {
                case "0":
                    $("#btn").addClass("btnNow");
                    break;
                case "-1":
                    console.log("活动尚未开始");
                    break;
                case "-2":
                    $("#btn").text("十点开抢");
                    break;
                default:
                    console.log("系统繁忙，请稍后再试");
            }
        },
        error: function() {

        },
        complete: function() {

        }
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

    //点击更换验证码
    $("#imgcode").click(function() {
        var timeCache = new Date().getTime();
        $(this).attr("src", config.vCode + "?_=" + timeCache);

    });
    var authcode = $("#validcode");
    if ($("#btn").prop("disabled") == true) {
        return
    } else {

        $("#btn").click(function() {
            var p = parseUrl(window.location.href).p || '';
            if (authcode.val() != "" && authcode.val().length == 4) {
                $.ajax({
                    type: "POST",
                    url: config.ajaxUrl,
                    dataType: "json",
                    data: {
                        "type": "5",
                        "authcode": $("#validcode").val(),
                        // "t":"ceair310109visa",
                        "p": p,
                        "url":  (getParam().t && getParam().t == "wap") ? window.location.href : ""
                    },
                    success: function(data) {

                        if (data.SuccessCode == "-2") {
                            var button = $("#btn");
                            button.attr("disabled", "true");
                            button.css({ "background-color": "#DBDBDB", "color": "#DB3B2F" });
                            button.text("十点开抢");
                        } else {
                            $("#btn").addClass("btnNow");
                        }
                        switch (data.SuccessCode) {
                            case "0":
                            case "-1":
                            case "-2":
                            case "-3":
                                 layerApp.open({
                                    content: data.Message,
                                    skin: 'msg'
                                    ,time: 2000
                                });
                                break;
                            case "-4":
                                judgeLogin(data.Message).goLogin();
                                break;
                            default:
                                layerApp.open({
                                    content: "系统繁忙，请稍后再试",
                                    skin: 'msg'
                                    ,time: 2000
                                });
                                
                        }
                    },
                    error: function() {

                    },
                    complete: function() {

                    }

                });
            } else {
                if ((authcode.val() == "" || authcode.val().length != 4) && $("#btn").prop("disabled") == false) {
                     layerApp.open({
                                    content: "请输入正确验证码",
                                    skin: 'msg'
                                    ,time: 2000
                                });
                    return false;
                }
            }

        });
    }
});
