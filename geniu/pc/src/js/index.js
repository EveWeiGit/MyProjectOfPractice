 import 'es5';
 import {ga} from 'ga';
 import 'layerPc301';

 ga(); 
 $(function(){

	class Index{
		constructor(){
			this.action();//添加事件
		}

		IsPhone(value) { //判断是否合法手机号
            if (value.match(/^1[3|4|5|7|8]\d{9}$/)) {
                return true;
            } else {
                return false;
            }
        }

        IsEmail(value){//判断是否合法邮箱
        	if(value.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i)){
        		return true;

        	}else{
        		return false;
        	}
        }
         
        LoginJump(curHref){//跳登录
            var loginURL="https://passport.ceair.com/cesso/login.html?redirectUrl=";
            window.location.href=loginURL + curHref;
        } 

        action(){
        	let _that=this;
            var showWindow= $(".window");
            $(".showModel").on("click",function(){
                showWindow.hide();
            });
            var login=window.location.href.split('?')[1];
            if(login=="L"){
                showWindow.show();
            }
            $(".receive").off().on('click',function(){
                $.ajax({
                    type:"POST",
                    url:"/activity/genius/GeniusHandler.ashx",//http://192.168.1.37:802
                    dataType:"json",
                    data:{},
                    success:function(data){
                        console.log(data);
                        switch (data.SuccessCode){
                            case "1"://已登录
                            showWindow.show();
                            break;
                            case "-2"://未登录
                            _that.LoginJump(window.location.href+"?L");
                            break;
                            case "-3"://服务器繁忙，请稍后再试！
                            case "-4"://很抱歉，今日激活码已领完，请明日再来！
                            case "-5"://很抱歉，激活码已领完，感谢您的参与！
                            case "-6"://活动尚未开始，敬请期待！
                            case "-7"://请使用万里行账号登录！
                           layer.open({
                            content:data.Message,
                            skin:'msg',
                            time:3000
                        });
                            break;
                        }

                    },
                    error:function(){

                    },
                    complete:function(){

                    }
                });
                

        	});

            $(".commitBtn").click(function(){
                 var phone=$("#phone");
                var email=$("#email");
                if($.trim(phone.val())==""){
                    layer.open({
                        content:"请输入手机号",
                        skin:'msg',
                        time:3000
                    });
                    return;
                }else{
                    if(!_that.IsPhone($.trim(phone.val()))){
                        layer.open({
                            content:"请输入正确的手机号",
                            skin:'msg',
                            time:3000
                        });
                        return;
                    }
                }

                if($.trim(email.val())==""){
                    layer.open({
                        content:"请输入邮箱",
                        skin:'msg',
                        time:3000
                    });
                    return;
                }else{
                    if(!_that.IsEmail($.trim(email.val()))){
                        layer.open({
                            content:"请输入正确的邮箱",
                            skin:'msg',
                            time:3000
                        });
                        return;
                    }
                }

                if($.trim(phone.val()) !=""&& $.trim(phone.val()).length==11 && $.trim(email.val()) !=""){
                    $.ajax({
                        type:"POST",
                        url:"/activity/genius/GeniusHandler.ashx",//http://192.168.1.37:802
                        dataType:"json",
                        data:{
                            phoneno:phone.val(),
                            email:email.val()
                        },
                        async:false,
                        success:function(data){
                            console.log(data);
                            // data.SuccessCode="-7";
                            switch (data.SuccessCode) {
                                case "1"://已登录
                                showWindow.show();
                                break;
                                case "-2"://未登录
                                _that.LoginJump(window.location.href+"?L");
                                break;
                                case "0"://领取成功
                                case "-1"://您已领取过了，请登录您的邮箱或手机点击激活链接进行激活。
                                case "-3"://服务器繁忙，请稍后再试
                                case "-4"://很抱歉，今日激活码已领完，请明日再来！
                                case "-5"://很抱歉，激活码已领完，感谢您的参与！
                                case "-7"://请使用万里行账号登录！
                                   layer.open({
                                    content:data.Message,
                                    skin:'msg',
                                    time:3000
                                });
                                   showWindow.hide();
                                    break;
                                default:
                                    
                                    break;
                            }
                        },
                        error:function(){

                        },
                        complete:function(){

                        }
                    });
                }


            });
        }
	}
	new Index();
 });
