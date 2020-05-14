import sysManager from "./sysManager"
import other from "./other"

var  menusOld = [
    {   
        id: '1',
        icon: 'el-icon-menu',
        index: 'dashboard',
        title: '系统首页'
    }
],
menusOld = menusOld.concat(other)
menusOld = menusOld.concat(sysManager)


function createMenuFunc (menus){ 
    var createMenu = []

    for(var i=0; i<menus.length; i++){
        if(!menus[i].parentId){
            createMenu.push(menus[i])
        }
    }
    for(var i=0; i<menus.length; i++){
        if(menus[i].parentId){
            var parent=createMenu.find(function (obj) {
                return obj.id === menus[i].parentId
            })
            parent.subs.push(menus[i])
        }
    }
    return createMenu
}

export  {menusOld, createMenuFunc}


