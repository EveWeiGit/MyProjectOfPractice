import { ga } from 'ga';
import 'layerApp';
import 'layerAppCss';
import BaseFetch from 'BaseFetch';
import baseApp from 'baseApp';

ga();

$(function() {
    var acti= $("#active");
    var lott=$("#lottery");

    acti.click(function() {
   var Acti=$("#activeContent");
   var hide=Acti.css("display");
    if(hide=="none"){
         acti.css("background-image","url('images/up.png')");
         Acti.slideDown();
     }else{
       
         acti.css("background-image","url('images/down.png')");
         Acti.slideUp();
     }
 });
   lott.click(function() {
    var lottery=$("#lotteryContent");
    var hide=lottery.css("display");
    if(hide=="none"){
        lott.css("background-image","url('images/up.png')");
          lottery.slideDown();  
    }else{
         lott.css("background-image","url('images/down.png')");
          lottery.slideUp();
    }
         
     
   });
      
});
