import axios from 'axios';
import global from "./global";


const service = {

   getTableByFiledPage:function(strTableName,strOrder,query){

       console.log(query)
       var  Query=[];
       Query.push(query);


       axios.get(global.BASE_URL + '/dataInfro/getDataByPageFieldForVue', {
           params: {
               strTableName: strTableName,
               strOrder: strOrder,
               QueryMoel:JSON.stringify(Query)
           }
       })
       .then((response) => {
           this.tableData = response.data.tableData;
           this.totalCount = Number(response.data.countData[0].F_COUNT);
       })

   }
}

export default service;
