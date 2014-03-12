pragmApp.controller('filesController', function($scope) {
		$scope.lan = 'cool';
        
        // Load Handler ----------------------------
		$scope.loadinginfo = "";
		$scope.loadshow = 'none';
        $scope.updateLoad = function(){
            if($scope.loadinginfo==""){
		      $scope.loadshow = 'none';
                tab.position("slide10In");
            } else {
		      $scope.loadshow = 'block';
                tab.position("slideOut");
              document.getElementById('loadingslide').className = 'loadingslideIN';
            }
        }
        data.databind('loadinginfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.loadinginfo = x;
          $scope.updateLoad();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        // Alert handler   ---------------------------------------------------------
		$scope.alertinfo = "";
		$scope.alertshow = 'none';
        $scope.updateAlert = function(){
            //console.log("Update Angular "+$scope.alertinfo);
            if($scope.alertinfo==""){
		      $scope.alertshow = 'none';
                if(!$scope.shareshowbool){
                    tab.position("slideOut");
                }
            } else {
		      $scope.alertshow = 'block';
                tab.position("slideIn");
            }
        }
        data.databind('alertinfo', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.alertinfo = x;
          $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        $scope.unalert = function(){
            data.alertinfo = "";
            $scope.alertinfo = "";
            $scope.updateAlert();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }
        
        // Something else -------------------------------------------
		$scope.dirObject = { };
        if(data.acutalDir != ""){
            $scope.actualDir = data.acutalDir;
        } else {
            $scope.actualDir = data.login.userID;
            data.acutalDir = data.login.userID;
        }
        $scope.mainDir = data.login.userID;
        $scope.dirShow = [ ];
        $scope.superFolder = [ ];
        $scope.activeObject = {};
        $scope.activeArray = [];
        $scope.actactive = "";
        $scope.inactivetimer;
        $scope.lastactivate;
        $scope.activenum = 0;
        
        addFile.AddFile = false;
        addFile.AddFileChoice = false;
        
        $scope.getactive = function(key){
            if($scope.activeArray[key]){
                return "fileListUlactive";
            } 
            return "fileListUlli";
        }
        
        $scope.setactive = function(key){
            if($scope.draganddropactive != true){
                if(!global.ctrl && !global.shift){
                    $scope.lastactivate = null;
                    $scope.lastactivate;
                    $scope.activeArray = null;
                    $scope.activeArray = [];
                }
                if($scope.activeArray != [] && global.shift){
                    if($scope.lastactivate){
                        var i = $scope.getPos(key);
                        var k = $scope.getPos($scope.lastactivate);
                        //console.log("von "+i+" nach "+k);
                        if(i>k){
                            var o = i;
                            i = k;
                            k = o;
                        }
                        while(i<=k){
                            //console.log("count"+i);
                            $scope.activeArray[$scope.dirShow[i]] = true;
                            i++;
                        }
                    } else {
                        $scope.activeArray[key] = true;
                        $scope.lastactivate = key;
                    }
                }
                if(!global.shift){
                    if($scope.activeArray[key]){
                        $scope.activeArray[key] = false;
                    } else {
                        $scope.activeArray[key] = true;
                        $scope.lastactivate = key;
                    }
                }
                var selectionarray = [];
                var activecount = 0;
                for(i in $scope.activeArray){
                    if($scope.activeArray[i] == true){
                        activecount++;
                        selectionarray.push(i);
                    }
                }
                data.selectionarray = selectionarray;
                selectionarray = null;
                $scope.activenum = activecount;
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        }
        
        $scope.getPos = function(key){
            var i = 0;
            while($scope.dirShow[i] != key && $scope.dirShow.length >= i){
                i++;
            }
            return i;   
        }
        
        $scope.setinactive = function(){
            if(!global.ctrl && !global.shift){
                $scope.forceinactiv();
            }
        }
        
        $scope.forceinactiv = function(){
            $scope.lastactivate = null;
            $scope.lastactivate;
            $scope.activeArray = null;
            $scope.activeArray = [];
            var selectionarray = [];
            var activecount = 0;
            for(i in $scope.activeArray){
                if($scope.activeArray[i] == true){
                    activecount++;
                    selectionarray.push(i);
                }
            }
            data.selectionarray = selectionarray;
            selectionarray = null;
            $scope.activenum = activecount;
        };
        
        // Drag and Drop -----------------------------------------------
        
        $scope.draganddrop = false;
        $scope.draganddropactive = false;
        $scope.elmdisplay  = "none";
        $scope.moveto  = "none";
        $scope.movetofile  = "";
        $scope.elmtop  = 300;
        $scope.elmleft  = 300;
        
        $scope.clog = function(){
            //console.log('mousemove cLOG');
        }
        
        $scope.mousedown = function(key, $event){
            if($scope.activeArray[key] == true){
                //$scope.elmtop   = $event.clientY-global.chY;
                //$scope.elmleft  = $event.clientX;
                $scope.draganddrop = true;  // INCOMMENT
                //$scope.elmdisplay = "block";
            }
        };
        
        $scope.mouseup = function(){
            if($scope.draganddrop == true && $scope.movetofile != "" && $scope.movetofile != $scope.actualDir){
                console.log("Move files "+JSON.stringify(data.selectionarray)+" to "+$scope.movetofile);
                L3.moveFileList(data.selectionarray, $scope.movetofile);
            }
            $scope.draganddrop = false;
            $scope.elmdisplay = "none";
            $scope.draganddropactive = false;
        };
        
        $scope.mousemove = function($event){
            if($scope.draganddrop == true){
                $scope.elmtop   = $event.clientY-global.chY;
                $scope.elmleft  = $event.clientX+5;
                $scope.elmdisplay = "block";
                $scope.draganddropactive = true;
            }
        };
        
        $scope.mouseover = function(key){
            if($scope.activeArray[key] == true || key.substr(0,1) == 3){
                $scope.moveto = "...";
                $scope.movetofile  = "";
            } else {
                if($scope.dirObject[key]){
                    $scope.moveto = $scope.dirObject[key].name;
                } else {
                    if(key == "4DELETED00"){
                        $scope.moveto = "DELETED";
                    } else {
                        $scope.moveto = "NO NAME FOUND";
                    }
                }
                $scope.movetofile  = key;
            }
        };
        
        $scope.mouseout = function(){
            $scope.moveto = "...";
            $scope.movetofile  = "";
        };
        
        
        // Move / Copy  ---------------------------------------------
        
        $scope.moveclipboard;
        $scope.cilpboardaction;
        
        globalEvent.ctrlbind('X', function(){
            if(uiControl.lastview == 'files'){
                console.log("CRTL+X");
                $scope.moveclipboard = data.selectionarray;
                $scope.cilpboardaction = 'move';
                //data.set('alertinfo', 'Saved to clipboard!');
            }
        });
        
        globalEvent.ctrlbind('C', function(){
            if(uiControl.lastview == 'files'){
                console.log("CRTL+C");
                $scope.moveclipboard = data.selectionarray;
                $scope.cilpboardaction = 'copy';
                //data.set('alertinfo', 'Saved to clipboard!');
            }
        });
        
        globalEvent.ctrlbind('V', function(){
            if(uiControl.lastview == 'files'){
                console.log("CRTL+V");
                if($scope.cilpboardaction == 'move'){
                    console.log("Move files "+JSON.stringify($scope.moveclipboard)+" to "+$scope.actualDir);
                    L3.moveFileList($scope.moveclipboard, $scope.actualDir);
                }
                if($scope.cilpboardaction == 'copy'){
                    console.log("Copy files "+JSON.stringify($scope.moveclipboard)+" to "+$scope.actualDir);
                    L3.copyFileList($scope.moveclipboard, $scope.actualDir);
                }
                $scope.cilpboardaction = '';
            }
        });
        
        globalEvent.ctrlbind('A', function(){
            console.log("CRTL+A");
            for(i in $scope.dirShow){
                $scope.activeArray[$scope.dirShow[i]] = true;
            }
            var selectionarray = [];
            var activecount = 0;
            for(i in $scope.activeArray){
                if($scope.activeArray[i] == true){
                    activecount++;
                    selectionarray.push(i);
                }
            }
            data.selectionarray = selectionarray;
            selectionarray = null;
            $scope.activenum = activecount;
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
        
        
        // Filelist creation --------------------------------------------
        $scope.update = function () {
            $scope.forceinactiv();
            var id = $scope.actualDir;
            var tempdir = $scope.dirObject[id].content;
            if(tempdir[0]==""){
                tempdir = [];
            }
            var tempdirX = [];
            for(i in tempdir){
                if(!(tempdir[i] in $scope.dirObject)){
                    tempdirX.push(tempdir[i]);
                    tempdir.splice(i,1);
                }
            }
            for(i in tempdirX){
                L3.checkKillLink(id, tempdirX[i]);
            }
            $scope.dirShow = tempdir;
            //console.log($scope.dirShow);
            var temparray = [ ];
            temparray.push(id);
            while(id != $scope.mainDir){
                if(id in $scope.dirObject){
                    if($scope.dirObject[id].parent in $scope.dirObject){
                        id = $scope.dirObject[id].parent;
                    } else {
                        id = dirCreator.searchParent(id);
                        if(!id){
                            id = $scope.mainDir;
                        }
                    }
                } else {
                    console.log("Search "+id);
                    //id = dirCreator.searchParent(id);
                    console.log("Found  "+id);
                    if(!id){
                    //    id = $scope.mainDir;
                    }
                }
                temparray.push(id);
            }
            temparray.reverse();
            $scope.superFolder = null;
            $scope.superFolder = temparray;
            temparray = null;
        };
        
        $scope.openFileAngu = function (id) {
            console.log("Openfile: "+id);
            switch(id.substr(0,1)){
                case "3":
                    //Datei Oeffnen
                    $scope.cilpboardaction = '';
                    uiControl.loadFile(id);
                    break;
                case "4":
                    $scope.forceinactiv();
                    $scope.actualDir = id;
                    data.acutalDir = id;
                    $scope.update();
                      $scope.update();
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }
                    
                    //this.showDir(id);
                    //this.generateFileSuperPath(id);
                    //this.lastDir = id;
                    break;
                case "5":
                    $scope.forceinactiv();
                    $scope.actualDir = id;
                    data.acutalDir = id;
                    $scope.update();
                      $scope.update();
                        if(!$scope.$$phase) {
                            $scope.$apply();
                        }
                    //this.showDir(id);
                    //this.generateFileSuperPath(id);
                    //this.lastDir = id;
                    break;
            }
        };
    
        
        
        
        // Share Popup handler ------------------------------------------
        
        $scope.shareshow = 'none';
        $scope.shareshowbool = false;
        //if($scope.sharedata == undefined){$scope.sharedata = [];}
        //if($scope.fileinfoid == undefined){$scope.fileinfoid = '';}
        //if($scope.filedata == undefined){$scope.filedata = {}; $scope.filedata = data.dirObject[$scope.fileinfoid];}
        $scope.filedata = {};
        $scope.sharedata = [];
        $scope.fileinfoid = '';
        //$scope.filedata = data.dirObject[$scope.fileinfoid];
        $scope.rightinfo = ['readonly', 'write', 'admin'];
        $scope.addvalue = 0;
        $scope.addname = "no name";
    
        $scope.loadfileshare = function(){
            $scope.sharedata = null;
            $scope.sharedata = [];
            if($scope.filedata){
                for(key in $scope.filedata.share){
                    $scope.sharedata.push({"id": key, "value": $scope.filedata.share[key]});
                }
                console.log(JSON.stringify($scope.sharedata));
            } else {
                $scope.shareclose();
            }
        };
        
        $scope.updateShare = function(){
            //console.log("Update Angular "+$scope.alertinfo);
            if(!$scope.shareshowbool){
		      $scope.shareshow = 'none';
                tab.position("slideOut");
                console.log("deactivate bboo");
            } else {
		      $scope.shareshow = 'block';
                tab.position("fastIn");
                $scope.loadfileshare();
            }
        }
        
        $scope.shareclose = function(){
            if(true){
                data.set('shareshow', false);
            }
        };
        
        data.databind('shareshow', function(x){
          //console.log("Data: "+JSON.stringify(x));
          $scope.shareshowbool = x;
          $scope.updateShare();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
    

        $scope.shareUpdater = function(){
            var out = {};
            for(key in $scope.sharedata){
                if($scope.sharedata[key].id == "5GUESTUSER" && $scope.sharedata[key].value > 1){
                    $scope.sharedata[key].value = 1;
                    uiControl.alert("Guest can not be admin!");
                }
                out[$scope.sharedata[key].id] = $scope.sharedata[key].value;
                
                console.log("KEY=>"+key);
            };
            console.log(JSON.stringify($scope.sharedata));
            console.log(JSON.stringify(out));
            $scope.filedata.share = out;
            L3.setFileInfo('share', $scope.fileinfoid, out);
        };
    
        $scope.pushsharedata =  function(){
            if($scope.addname.length == 10 && $scope.addname.substr(0,1) == "5"){
                if($scope.addname == "5GUESTUSER" && $scope.addvalue > 1){
                    $scope.addvalue = 1;
                    uiControl.alert("Guest can not be admin!");
                }
                $scope.filedata.share[$scope.addname] = $scope.addvalue;
                $scope.loadfileshare();
                L3.setFileInfo('share', $scope.fileinfoid, $scope.filedata.share);
            } else {
                uiControl.alert("ID '"+$scope.addname+"' is invalid!");
            }
        };
        
        $scope.changeName = function(){
            L3.setFileInfo('name', $scope.fileinfoid, $scope.filedata.name);
        };
        
        $scope.deleteshare = function(index){
            $scope.sharedata.splice(index,1);
            $scope.shareUpdater();
        };
    
        $scope.configFile = function(id){
            $scope.fileinfoid = id;
            $scope.filedata = data.dirObject[$scope.fileinfoid];
            data.set('shareshow', true);
        }
        
        //$scope.loadfileshare();
    
        $scope.sharedinfo = function(key){
            if($scope.dirObject[key].shared != { }){
                return "Shared";
            }
            return "";
        };
    
        
        data.databind('dirObject', function(x){
          //console.log("Data: "+JSON.stringify(x));
		  $scope.dirObject = x;
          $scope.update();
          $scope.filedata = data.dirObject[$scope.fileinfoid];
          $scope.updateShare();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });
	});