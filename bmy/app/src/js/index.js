import { ga } from 'ga';
import 'layerApp';
import 'layerAppCss';
import BaseFetch from 'BaseFetch';
import baseApp from 'baseApp';

ga();

$(function() {

    class JoinActive {
        constructor() {
            this.action(); //添加事件
        }

        IsPhone(value) { //判断是否合法手机号
            if (value.match(/^1[3|4|5|7|8]\d{9}$/)) {
                return true;
            } else {
                return false;
            }
        }
        IsCnName(value) { //判断是否合法中文名和英文名
            if (value.match(/^[\u4e00-\u9fa5a-zA-Z-]+$/)) {
                return true;
            } else {
                return false;
            }
        }

        action() {
            let _that = this;
            $("#conmmitBtn").off().on('click', function() {
                var name = $("#name");
                var phone = $("#phoneNum");
                var vip = $("#vipNum");
                var produhref = $("#producHref");
                if ($.trim(name.val()) == "") {
                    layerApp.open({
                        content: "请输入姓名",
                        skin: 'msg',
                        time: 2000
                    });
                    return;
                } else {
                    if (!_that.IsCnName($.trim(name.val())) || $.trim(name.val()).length < 2) {
                        layerApp.open({
                            content: "请输入正确姓名",
                            skin: 'msg',
                            time: 2000
                        });
                        return;
                    }
                }
                if ($.trim(phone.val()) == "") {
                    layerApp.open({
                        content: "请输入手机号",
                        skin: 'msg',
                        time: 2000
                    });
                    return;
                } else {
                    if (!_that.IsPhone($.trim(phone.val()))) {
                        layerApp.open({
                            content: "请输入正确手机号",
                            skin: 'msg',
                            time: 2000
                        });
                        return;
                    }
                }

                if ($.trim(phone.val()) != "" && $.trim(phone.val()).length == 11 && $.trim(name.val()) != "") {
                    $.ajax({
                        type: "POST",
                        url: "/activity/JoinTour/JoinTour.ashx",
                        dataType: "json",
                        data: {
                            method: "save",
                            Name: name.val(),
                            Phone: phone.val(),
                            MileageCard: vip.val(),
                            Url: produhref.val()
                        },
                        timeout: 5000,
                        async: false,
                        success: function(data) {
                            console.log(data);
                            layerApp.open({
                                content: '感谢您参与本次活动！',
                                btn: '确认',
                                yes: function(index, layero) {
                                    window.location.href = 'http://vacations.ceair.com/app/#/';
                                },
                                btn2: function(index, layero) {

                                }

                                ,
                                cancel: function() {
                                    //右上角关闭回调


                                }
                            });
                        },
                        error: function() {

                        },
                        complete: function() {

                        }
                    });
                }

                return false;

            });
        }
    }

    let join = new JoinActive();
    join;

});
