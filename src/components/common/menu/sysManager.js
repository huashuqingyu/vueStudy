const sysManager = [
    {
    id: '2',
    icon: 'el-icon-setting',
    index: 'sysManager',
    title: '系统管理',
    haschild: true
    },
    {   
        id:'2-1',
        parentId:'2',
        index: 'dicManeger',
        title: '字典管理'
    },
    {
        id: '2-2',
        parentId:'2',
        icon: 'el-icon-lx-copy',
        index: 'user',
        title: '用户管理'
    },
    {
        id: '2-3',
        parentId:'2',
        icon: 'el-icon-lx-copy',
        index: 'role',
        title: '权限管理'
    }
]


export default sysManager;