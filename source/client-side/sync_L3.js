/******************************************************************************************
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
#       Filename......................: sync_L3.js
#       Version/Release...............: 0.5xx
#
******************************************************************************************/



var L3_typ = function L3_typ(){
    
    this.file = false;
    this.beforeEvent = "loadFirst";
    this.loadedFile = false;
    this.loginDat = { };
    this.firstload = true;
    this.callbacks = { };
	
    this.init = function(){
        //Random generierter Username 
        if(!this.clientName) {
        this.clientName = (Math.random()*100000000000000000);
	    this.clientName = this.clientName.toString();
	    this.clientName = this.clientName.substring(0, 5);
        }
        //return this.clientName;
        
        L2.send(sID.clientName, this.clientName);
        //L3.login();
        
        //L2.send(sID.getServer, String(sID.fileList));
        
    };
    
    this.recieve = function(id, data){
        this.aID = String(id);
        this.idType = parseInt(this.aID.substr(0, 1));
        
        if(this.aID.length!=10) {
            
          error.report(2, id);
         return false;   
        }
        
        switch(this.idType){
          case 1:
                L3.saveContent(id, data);
                break;
          case 2:
                L3.saveData(id, data);
                if(id==sID.fileList){globalEvent.onConnect();}
                break;
          default:
                error.report(2, id);
                break;
        }
    };
    
    this.saveContent = function(id, daten){
        //if(!check.id(300, this.file)){
        //    error.report(2, this.file);
        //    return false;
        //}
        //console.log(id);
        //console.log(daten);
        console.log(L3.file);
        if(!data.files[L3.file]){
            data.files[L3.file] = { }
        }
        data.files[L3.file][id] = daten;
        
        data.edited_sync(this.file, id);
        
        };
    
    this.saveData = function(id, daten){
        //if(!check.id(300, this.file)){
        //    error.report(2, this.file);
        //    return false;
        //}
        id = ""+id+"";

        switch(id){
            case sID.fileList:
                data.fileList = daten;
                data.set('dirObject', JSON.parse(daten));
                //dirCreator.setDir(daten);
                console.log("Beforeevent => "+this.beforeEvent);
                switch(this.beforeEvent){
                        case "loadFirst":
                            if(uiControl.disconnectdata.lastDir && uiControl.disconnectdata.lastDir != ""){
                                //console.log("CON1 "+uiControl.disconnectdata.lastDir);
                                //dirCreator.lastDir = uiControl.disconnectdata.lastDir;
                                //dirCreator.mainDir = data.login.userID;
                                //dirCreator.showDir(uiControl.disconnectdata.lastDir);
                            } else {
                                //console.log("CON2 "+data.login.userID);
                                //dirCreator.lastDir = data.login.userID;
                                //dirCreator.mainDir = data.login.userID;
                                //dirCreator.showDir(dirCreator.mainDir);
                            }
                            uiControl.view('files');
                            //dirCreator.refreshShow();
                            //uiControl.loadHandlerFin();
                            this.beforeEvent = "";
                        break;
                        case "addFile":
                            //dirCreator.refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                            this.beforeEvent = "";
                        break;
                        case "refresh":
                            //dirCreator.refreshShow();
                            uiControl.loadHandlerFin();
                            uiControl.view('files');
                        break;
                        case "":
                            //dirCreator.refreshShow();
                        break;
                }
                break;
            
            case sID.userList:
                data.users = daten;
                break;
                
            case sID.deleteID:
                data.delete_sync(daten);
                break;

            case sID.message:
                uiControl.alert(daten);
                break;

            case sID.Login:
                data.login = JSON.parse(daten);
                if(data.login.userRight < 5){
                    uiControl.loginGood();
                } else {
                    uiControl.loginBad();
                }
                break;

            case sID.legitimationID:
                data.legitimationID = daten;
                if(this.firstload){
                    L3.login();
                    L3.firstload = false;
                } else {
                    
                }
                break;
                
            case sID.updated:
                console.log("UPDATE");
                if(this.callbacks.load){
                    this.callbacks.load();
                    this.callbacks.load = null;
                }
                if(this.loadedFile){
                    uiControl.loadHandlerFin();
                    //uiControl.view('editor');
                    this.loadedFile = false;
                }
                break;
                
            case sID.fileunloadtrue:
                console.log("UNLOAD Done");
                L3.file = false;
                if(this.callbacks.unload){
                    this.callbacks.unload();
                    this.callbacks.unload = null;
                }
                /*if(uiControl.switchfilebool){
                    uiControl.switchfilebool = false;
		            uiControl.resetUI();
                    L3.file = uiControl.switchfile;
                    uiControl.view('editor');
                    L3.loadFile(uiControl.switchfile);
                } else {
                    if(uiControl.unloadfile){
                        uiControl.unloadfile = false;
                        L3.file = "0000000000";
		                uiControl.view('files');
		                uiControl.resetUI();
                    } else {
                        L3.file = "0000000000";
                    }
                }*/
                break;
                
            default:
                error.report(2, id);
                return false;
                break;
        }
        
        
        data.edited_sync(this.file, id);
        
        };
    
    this.showCache = function(){ // does not belong over here
        if(uiControl.file && uiControl.file!="0000000000"){
            if(!data.files[uiControl.file]) {
                data.files[uiControl.file] =  { };
            } else {
                for(key in data.files[uiControl.file]){
                    data.edited_sync(uiControl.file, key);
                }
            }
        } else {
            console.log("Error: uiControl.file needs to be prepared before switching UI!");
        }
    };
    
    this.loadFile = function(id){
        L3.file = id;
        /*if(!data.files[id]) {
            data.files[id] =  { };
        } else {
            for(key in data.files[id]){
                data.edited_sync(id, key);
            }
        }*/
        uiControl.loadHandler();
        this.loadedFile = true;
        L2.send(sID.file, id);  
    };
    
    this.loadFileCallback = function(id, callback){
        if(!L3.file){
            L3.callbacks.load = callback;
            L3.file = id;
            L2.send(sID.file, id);  
        } else {
            this.unloadFileCallback(id, function(){
                L3.callbacks.load = callback;
                L3.file = id;
                L2.send(sID.file, id);
            });
        }
    };

    this.unloadFileCallback = function(id, callback){
        this.callbacks.unload = callback;
        L2.send(sID.unloadFile, '');  
    };
    
    this.uiEdit = function (file, id){
        if(L3.file == file){ // Todo: catch wrong ID's
            L2.send(id, data.files[file][id]);
        }
    };

    this.unloadFile = function(id){
        L2.send(sID.unloadFile, '');  
    };
    
    this.send = function(id){
        L2.send(id, data.files[this.file][id]);
    };

    this.login = function(){
        L3.loginDat.legitimationID = data.legitimationID;
        L2.send(sID.Login, JSON.stringify(L3.loginDat));
    }
    
    this.delete = function (id){
        L2.send(sID.deleteID, id);
    };

    this.addFile = function(name, dir, type){
        var temp = new Object();
        temp.name = name;
        temp.dir = dir;
        temp.type = type;
        this.beforeEvent = "addFile";
        uiControl.loadHandler('creating file');
        L2.send(sID.addFile, JSON.stringify(temp));
    }
    
    this.refreshDir = function(){
        this.beforeEvent = "refresh";
        uiControl.loadHandler('refreshing dir');
        L2.send(sID.getServer, sID.fileList);
    };
    
     this.reset = function(){
         data.reset();
         this.beforeEvent = "loadFirst";
         if(this.file && this.file != ""){
             this.beforeEvent = "";
         }
         this.file = false;
         this.loadedFile = false;
         this.firstload = true;
         if(data.login){
             if(data.login.userRight){
                if(data.login.userRight < 5){
                    //uiControl.view('load');
                    //setTimeout("location.reload();", 5000);
                    console.log('reset L3');
                }
             }
         }
     };
        
    };
    
   
var L3 = new L3_typ();
    
