import 'es5';
import {ga} from 'ga';
 ga(); 
 
$(document).ready(function(){
	$(".pop-close").click(function(){
		$(".pop-wrap").animate({left:'-1920px'});
		$(".pop-small").animate({display:'block',left:'0px'});

	});
	$(".pop-small").click(function(){
		$(".pop-small").animate({display:'block',left:'-172px'});
		$(".pop-wrap").animate({left:'0px',display:'block'});
	});
	$(".pop-link").click(function(){
		window.open("http://www.lancome.com.cn/product/LAN00306.html?utm_source=Google&utm_medium=NVD_DISP&utm_content=143226357_11-01Google_Google_headbanner&utm_campaign=CN_20161219_UV_LPD_LAN_FS_Regular_NVD_DISP_DIG");
	});
});

