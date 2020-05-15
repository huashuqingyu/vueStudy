import sysManager from "./sysManager"
import other from "./other"

var  menusList = [
    {   
        id: '1',
        icon: 'el-icon-menu',
        index: 'dashboard',
        title: '系统首页'
    }
],
menusList = menusList.concat(other)
menusList = menusList.concat(sysManager)

// 权限筛选后，格式化菜单
function createMenuFunc (menus){ 
    var createMenu = []

    for(var i=0; i<menus.length; i++){
        if(!menus[i].parentId){

            if(menus[i].haschild){
                menus[i].subs = []
            }
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


// 格式化菜单树
function createMenuTreeFunc (){ 
    var createMenu = []

    for(var i=0; i<menusList.length; i++){
        if(!menusList[i].parentId){
            var treeNode = new Object;
            treeNode.id = menusList[i].id
            treeNode.label = menusList[i].title
            if(menusList[i].subs){
                treeNode.children = []
            }
            createMenu.push(treeNode)
        }
    }
    for(var i=0; i<menusList.length; i++){
        if(menusList[i].parentId){
            var treeNode = new Object;
            treeNode.id = menusList[i].id
            treeNode.label = menusList[i].title
            var parent=createMenu.find(function (obj) {
                return obj.id === menusList[i].parentId
            })
            parent.children.push(treeNode)
        }
    }
    return createMenu
}

export  {menusList, createMenuFunc, createMenuTreeFunc}


