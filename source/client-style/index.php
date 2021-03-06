<!--/******************************************************************************************
#
#       Copyright 2014 Dustin Robert Hoffner
#
#       Licensed under the Apache License, Version 2.0 (the "License");
#       you may not use this file except in compliance with the License.
#       You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#       Unless required by applicable law or agreed to in writing, software
#       distributed under the License is distributed on an "AS IS" BASIS,
#       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#       See the License for the specific language governing permissions and
#       limitations under the License.
#       
#       Projectname...................: pragm
#
#       Developer/Date................: Dustin Robert Hoffner, 16.01.2014
#       Filename......................: index.html
#       Version/Release...............: 0.5xx
#
******************************************************************************************/-->
<?php 
$temp = trim(file_get_contents('config.json')); 
$temp = str_replace ("\t","",$temp);
$temp = str_replace ("\n","",$temp);
$temp = str_replace ("\r","",$temp);
$temp = str_replace ("\0","",$temp);
$temp = str_replace ("\x0B","",$temp);
?>
<!DOCTYPE HTML>
<html ng-app="pragmApp">
<head>


<title id="title">pragm</title>
<link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,600" rel="stylesheet" type="text/css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js"></script>
<script type="text/javascript" src="socket.io.min.js"></script> <!--node_modules/socket.io-client/dist/socket.io.min.js-->
<script type="text/javascript">var globalconfig = '<?php echo $temp; ?>';</script>

<!-- #buildSoftwareCut# -->

</head><!--ng-view-->
<body class="body" name="body" id="body" onload="globalEvent.onload();" onmouseup="globalEvent.drop();" onclick="globalEvent.onclick();" onmousemove="globalEvent.mousemove();" ng-controller="loginController">

<!--<div class="loading" id="pleasewait">
    <div class="loadicon"></div>
</div>

<div class="background"></div>-->
<div class="fileTabs" id="fileTabs" style="height: 0px;">
    <div class="fileTabButton" onclick="uiControl.unloadFile(); tab.deactivateTab();">
        <div unselectable="on" class="fileTabsPragm" id="pragmico2"></div>
     </div>
    <nobr>
    <ul class="Tabs" id="tabsUL">
    </ul>
    </nobr>
    <div class="TabsIn1" onclick="uiControl.unloadFile(); tab.deactivateTab();"></div>
    <div class="TabsIn2"></div>
    <!--<ul class="draweditul" id="draweditul" style="">
        <li class="draweditli" style="min-width: 31px;" unselectable="on" title="add rect (out of work)"><input class="unselectinput" type="button" onclick="addrect();"><img src="img/doc/rect.png"></li>
        <li class="draweditli" style="min-width: 31px;" unselectable="on" title="add circle (out of work)"><input class="unselectinput" type="button" onclick="addline(3,3);"><img src="img/doc/circle.png"></li>
        <li class="draweditli" style="min-width: 31px;" unselectable="on" title="add triangle (out of work)"><input class="unselectinput" type="button" onclick="rich.fontEdit('insertunorderedlist');"><img src="img/doc/triangle.png"></li>
        <li class="draweditli" style="min-width: 31px;" unselectable="on" title="add line (out of work)"><input class="unselectinput" type="button" onclick="addline(0,0);"><img src="img/doc/line.png"></li>
        <li class="draweditli" style="min-width: 31px;" unselectable="on" title="add arrow (out of work)"><input class="unselectinput" type="button" onclick="addline(0,1);"><img src="img/doc/arrow.png"></li>
        <li class="draweditli" style="min-width: 31px;" unselectable="on" title="delete element (out of work)"><input class="unselectinput" type="button" onclick="killfocusline();"><img src="img/doc/delete.png"></li>
     </ul>-->
    </div>
    
    <div class="angularView" ng-view></div>
    
<!--<ul class="editul" id="editarea" unselectable="on">
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'pragm');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" unselectable="on" onclick="uiControl.unloadFile();"><img src="img/doc/pragm_1.png" id="pragmico1" unselectable="on" style="margin-top: -5px;"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Print');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" unselectable="on" onclick="rich.fontEdit('Print')"><img src="img/doc/print.png" unselectable="on"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Bold');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" unselectable="on" onclick="rich.fontEdit('bold')"><img src="img/doc/fett.png" unselectable="on"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Italic');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" unselectable="on" onclick="rich.fontEdit('italic')"><img src="img/doc/kursiv.png" unselectable="on"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Underline');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" unselectable="on" onclick="rich.fontEdit('underline')"><img src="img/doc/unter.png" unselectable="on"></li>
 <li onmouseout="rich.unshowtitle(); rich.fontchangehide();" onmouseover="rich.donthide(this.id); rich.showtitle(this.offsetWidth, this.offsetLeft, 'Font');" id="fontchangeButton" onmouseout="rich.dohide();" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontchange(1);"><img src="img/doc/fontfamily.png"></li>
 <li onmouseout="rich.unshowtitle(); rich.sizechangehide();" onmouseover="rich.donthide(this.id); rich.showtitle(this.offsetWidth, this.offsetLeft, 'Font size');" id="sizechangeButton" onmouseout="rich.dohide();" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.sizechange(1);"><img src="img/doc/fontsize.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Justified');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('justifyfull');"><img src="img/doc/block.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Align left');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('justifyleft');"><img src="img/doc/textleft.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Centered');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('justifycenter');"><img src="img/doc/textcenter.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Align right');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('justifyright');"><img src="img/doc/textright.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Increase indent');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('indent');"><img src="img/doc/tab.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Decrease indent');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('outdent');"><img src="img/doc/untab.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Bullets');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('insertunorderedlist');"><img src="img/doc/list.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Numbering');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('insertorderedlist');"><img src="img/doc/numblist.png"></li>
 <!--<li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Add link (Out of order)');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('');"><img src="img/doc/addlink.png"></li>
 <li onmouseout="rich.unshowtitle();" onmouseover="rich.showtitle(this.offsetWidth, this.offsetLeft, 'Add image (Out of order)');" class="editli" style="min-width: 31px;" unselectable="on"><input class="unselectinput" type="button" onclick="rich.fontEdit('');"><img src="img/doc/addimg.png"></li>-->
<!--</ul>


<div class="title" id="showtitle" style="left: -200px;"><div class="titleeck"></div>Mein Cooler Titel</div>
<div class="displayBlocker" id="displayBlocker"></div>
<div class="noteconBackground" id="noteconBackground">
    <div class="fileListOverlay">
        <div class="infoBox" id="Infobox">
            <div class="nameBox" id="nameBox">Bob King</div>
            
            <div class="infoline" id="infoline">data storage (80% free)</div>
            <div class="userstate" id="userstate"><div class="userstorage" id="userstorage"></div></div><br>
            <div class="infoline" id="infoline">Language choice:</div>
            <select class="infoline" >
                <option>English</option>
                <option disabled>(not available)</option>
            
            </select>
            <br><br>
            <div class="infoline" id="infoline">Please help <br>to keep pragm free!</div>
            <input class="infoline" type="button" value="Get Involved" onclick="OpenInNewTab();">
            <div class="infoline" id="infoline">or</div>
            <input class="infoline" type="button" value="Donate" onclick="alert('out of order');">
            <!--<ul class="datachoice">
                <li>files</li>
                <li>settings</li>
            </ul>-->
        
       <!-- </div>
        <div class="newsBox" id="newsbox">
            <div class="news" id="news">News</div>
            <div class="newsline" id="newsline">pragm is cool</div>
        </div>
    <div class="fileOperationsBar">
        <ul class="dirShow" id="dirShow">
        </ul>
        <ul class="dirButtons">
            <li class="dirButtonsLi" style="z-index: 2;" onclick="alert('out of work - Out of order');" title="delete file (out of work)"><img src="img/doc/loeschen.png" style="margin-top: -3px; opacity: 0.6; "></li>
            <li class="dirButtonsLi" id="AddFile" title="add file/folder">
                <nobr>
                    <img src="img/doc/addFile.png" style="margin-top: -3px; opacity: 0.6;">
                    <div class="AddFileOverlay" onclick="addFile.toggleAddFile();"></div>
                    <img src="img/doc/file.png" style="position: relative; margin-top: -3px; bottom: 0px; opacity: 0.6; margin-left: 9px;" id="AddFileChoice" onclick="addFile.toggleAddFileChoice();">
                    <input type="text" class="AddFileInput" id="AddFileInput" onkeydown="addFile.checkEnter();">
                </nobr>
            </li>
            <li class="dirButtonsLi" style="z-index: 2;" onclick="L3.refreshDir();" title="refresh dir"><img src="img/doc/refresh.png" style="margin-top: -3px; opacity: 0.6;"></li>
        </ul>
        </div>    
    <ul class="fileListUl" id="fileListUl">

    </ul>
        <div class="fileListCut">
            
        </div>
    </div>
</div>

<div class="notecon" id="notecon" ondblclick="textbox.addfield();" onmousedown="console.log();">
	<div class="noteheadline" contenteditable="true" oninput="staticItems.saveid(this.id);" onfocus="staticItems.focus();" onblur="staticItems.blur();" id="1031111111">My Headline</div>
    <div class="notedateline" contenteditable="true" oninput="staticItems.saveid(this.id);" onfocus="staticItems.focus();" onblur="staticItems.blur();" id="1031111112">Mittwoch 7.November 2012<br>12:42</div>
</div>


<ul class="fontchange" id="fontchange" style="height: 0px;" onmouseout="rich.fontchangehide();" onmouseover="rich.fontchange(1);">
<li style="font-family: Helvetica;"><input type="button" class="unselectinput" onclick="rich.fontEdit('fontname', 'Helvetica');">Helvetica</li>
<li style="font-family: Arial;"><input type="button" class="unselectinput" onclick="rich.fontEdit('fontname', 'Arial');">Arial</li>
<li style="font-family: Tahoma;"><input type="button" class="unselectinput" onclick="rich.fontEdit('fontname', 'Tahoma');">Tahoma</li>
<li style="font-family: Comic Sans;"><input type="button" class="unselectinput" onclick="rich.fontEdit('fontname', 'Comic Sans MS');">Comic Sans MS</li>
<li style="font-family: Times New Roman;"><input type="button" class="unselectinput" onclick="rich.fontEdit('fontname', 'Times New Roman');">Times New Roman</li>
<li style="font-family: Courier New;"><input type="button" class="unselectinput" onclick="rich.fontEdit('fontname', 'Courier New');">Courier New</li>
<li style="font-family: Monotype Corsiva;"><input type="button" class="unselectinput" onclick="rich.fontEdit('fontname', 'Monotype Corsiva');">Monotype Corsiva</li>
</ul>

<ul class="sizechange" id="sizechange" style="height: 0px;" onmouseout="rich.sizechangehide();" onmouseover="rich.sizechange(1);">
<li><input type="button" class="unselectinput" onclick="rich.fontEdit('fontsize', 1);">7px</li>
<li><input type="button" class="unselectinput" onclick="rich.fontEdit('fontsize', 2);">10px</li>
<li><input type="button" class="unselectinput" onclick="rich.fontEdit('fontsize', 3);">12px</li>
<li><input type="button" class="unselectinput" onclick="rich.fontEdit('fontsize', 4);">13px</li>
<li><input type="button" class="unselectinput" onclick="rich.fontEdit('fontsize', 5);">17px</li>
<li><input type="button" class="unselectinput" onclick="rich.fontEdit('fontsize', 6);">23px</li>
<li><input type="button" class="unselectinput" onclick="rich.fontEdit('fontsize', 7);">35px</li>
</ul>

<div class="foot">
<span class="colornote" id="colornote" onclick="color.togglecolor();"><input type="button" unselectable="on" class="unselectinput"></span>
<ul class="colorshemer" id="colorshemer">
    <li unselectable="on" id="color0" onclick="color.setcolor(this.style.background);" style="background: #ca0000;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color1" onclick="color.setcolor(this.style.background);" style="background: #ff0000;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color2" onclick="color.setcolor(this.style.background);" style="background: #ffb970;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color3" onclick="color.setcolor(this.style.background);" style="background: #ff8200;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color4" onclick="color.setcolor(this.style.background);" style="background: #ffca00;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color5" onclick="color.setcolor(this.style.background);" style="background: #ffde5f;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color6" onclick="color.setcolor(this.style.background);" style="background: #00ca01;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color7" onclick="color.setcolor(this.style.background);" style="background: #009801;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color8" onclick="color.setcolor(this.style.background);" style="background: #006abc;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color9" onclick="color.setcolor(this.style.background);" style="background: #0090ff;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color10" onclick="color.setcolor(this.style.background);" style="background: #a149ff;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color11" onclick="color.setcolor(this.style.background);" style="background: #6800d5;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color12" onclick="color.setcolor(this.style.background);" style="background: #000000;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color13" onclick="color.setcolor(this.style.background);" style="background: #1a1a1a;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color14" onclick="color.setcolor(this.style.background);" style="background: #333333;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color15" onclick="color.setcolor(this.style.background);" style="background: #4d4d4d;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color16" onclick="color.setcolor(this.style.background);" style="background: #666666;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color17" onclick="color.setcolor(this.style.background);" style="background: #808080;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color18" onclick="color.setcolor(this.style.background);" style="background: #999999;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color19" onclick="color.setcolor(this.style.background);" style="background: #b2b2b2;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color20" onclick="color.setcolor(this.style.background);" style="background: #cccccc;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color21" onclick="color.setcolor(this.style.background);" style="background: #e5e5e5;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color22" onclick="color.setcolor(this.style.background);" style="background: #ffffff;"><input type="button" unselectable="on" class="unselectinput"></li>
    <li unselectable="on" id="color23" onclick="color.setcolor(this.style.background);" style="background: transparent; border: 1px solid black;"><input type="button" unselectable="on" class="unselectinput"></li>
</ul>

<div class="borderchange">
<div class="slideline">
<div class="slider" onmousedown="slidestart();" id="slider" style="left: 0px;"></div>
</div>
<input type="text" class="slidesolve" value="0" id="slidesolve" onchange="slideset(this.value);"><div class="slideeinheit">%</div>


</div>
</div>

<div class="loginbody" id="loginHTML">
    <div class="loginTop">
        <div class="loginLogo"></div>
    </div>
    <div class="loginLine" id="madebyinfo">created 2014 by Dustin Hoffner | powered by Johannes Valouch</div>
    <div class="loginCenter">
    <div class="centerPic"></div>
    <form class="loginForm" action="" onsubmit="uiControl.login(); return false;">
    <h1>Welcome</h1>
    Username<br>
    <input class="alertinput" type="text" name="username" id="loginUsername" value="Bob"><br><br>
    Password<br>
    <input class="alertinput" type="password" name="password" id="loginPassword" value="123"><br><br>
    <input class="loginSubmit" type="submit" name="login" value="login"><br>
    </form>
        </div>
</div>

<!--<div class="messagebox">Bad Login</div>-->
    
</body>
</html>
