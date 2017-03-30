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

    class Receive {
        constructor() {
            this.action(); //添加事件
        }

        action() {
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
            title = "翼猫红包领取";
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

        function parseUrl(url) {
        var pattern = /(\w+)=([^\#&]*)/ig,
            parames = {};
        url = url || window.location.href;
        url.replace(pattern, function(attr, key, value) {
            parames[key] = decodeURI(value);
        });
        return parames;
    }
    	$("#btn").off().on("click",function(e){
            e.preventDefault();
            var urlback=window.location.href;
    			//活动到期
    		let lastTime=new Date(2017, 4, 24).getTime();
    		let today=new Date().getTime();
    		if(today>=lastTime){
    		layerApp.open({
    			content:"抱歉，活动已结束",
    			skin:'msg',
    			time:2000
    		});
    		}
    		$.ajax({//http://10.0.10.187:8001
    			url:"/api/ActivitiesExtend/BindingLottery?cardMarketID=SC_20_YM4",
    			type:"POST",
    			data:{},
                beforeSend:function(request){
                    request.setRequestHeader("redirectUrl", urlback);
                },
    			success:function(data){
    				console.log(data);
    				// data.Code="2";//模拟数据
    				switch (data.Code) {
    					case "0":
    						//20元红包弹框
			    		$(".sucessShow").fadeIn(500);

			    		//点击关闭
			    		$(".close").off().on("click",function(){
			    			$(".sucessShow").stop().fadeOut(500);
			    		});

			    		//前往积分商城
			    		$(".goShop").off().on("click",function(){
			    			window.location.href=" http://shopping.ceair.com/";
			    		});
			    		//分享
			    		$(".goShare").off().on("click",function(){
			    			$(".sucessShow").hide();
			    			$(".share").fadeIn(500);
			    		});

			    		//点击小红包图片
			    		$(".share").off().on("click",function(){
			    			$(".share").stop().fadeOut(500);
			    		});
    						break;
    					case "2":
    						window.location.href = "http://m.ceair.com/mobile/user/user!loginOtherPage.shtml?channel=712&redirectUrl="+ data.Message;
    					break;
    					default:
    					//重复领取红包
    						layerApp.open({
			    			content:"您已经领过红包啦",
			    			skin:'msg',
			    			time:2000
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
    }
}
    new Receive();
});
