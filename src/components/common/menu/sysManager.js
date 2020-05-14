const sysManager = [
    {
    id: '2',
    icon: 'el-icon-setting',
    index: 'sysManager',
    subs: [],
    title: '系统管理',
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
    }
]


export default sysManager;