const getClicksSubset = clicks_object =>{
    let result_object={};
    let result_count={};
    let final_result=[];
    let prev_time_period=-1;
    let prev_date_period = -1;
    let outputResultSet = [];
    clicks_object.forEach(element => {
     let timestamp= getTimeStamp(element);
     let time_period = timestamp.time_period_hours;
     let date_period = timestamp.date_period;
     
     if(prev_date_period!=-1 && prev_date_period!=date_period){
      final_result = final_result.concat(Object.values(result_object));
      final_result =  removeGreaterTenIP(final_result,result_count);
      outputResultSet = outputResultSet.concat(final_result);
      final_result = [];
      result_count = {};
      result_object = {};
      prev_time_period=-1;
      prev_date_period = -1;
      result_object =  getResultObject(result_object,result_count,element);
     }else{
      if(prev_time_period ==-1 || time_period == prev_time_period){
        result_object =  getResultObject(result_object,result_count,element);
       }else{
          final_result = final_result.concat(Object.values(result_object));
          result_object = {};
          result_object = getResultObject(result_object,result_count,element);
          // console.log(Object.values(result_object));
       }
       prev_time_period = time_period;
     }
     prev_date_period = date_period;
  
  
  
    });
    final_result = final_result.concat(Object.values(result_object));
    final_result =  removeGreaterTenIP(final_result,result_count);
    outputResultSet = outputResultSet.concat(final_result);
     console.log(outputResultSet,outputResultSet.length);
  
  }
  
  removeGreaterTenIP = (final_result,result_count) => {
  let updatedResultSet = [];
  for(var i=0;i<final_result.length;i++){
    let IP =  final_result[i].ip;
    let count = result_count[IP];
    if(count<=10){
      updatedResultSet.push(final_result[i]);
    }
  }
  return updatedResultSet;
  }
  
  const getResultObject = (result_object,result_count,element)=>{
        let isInIpCount=result_count.hasOwnProperty(element.ip); 
        if(isInIpCount){
          let count = ++result_count[element.ip];
          result_count[element.ip] = count;
        }else{
          result_count[element.ip] = 1;
        }
        if(!result_object.hasOwnProperty(element.ip)){
          result_object[element.ip] = element;
        }else{
          if(result_object[element.ip].amount<element.amount){
            result_object[element.ip] = element;
          } 
        }
        return result_object;
  }
  
  const getTimeStamp = element =>{
    let time_period_hours = new Date(element.timestamp).getHours(); 
    let date_period = new Date(element.timestamp).toLocaleDateString();
    return {time_period_hours,date_period}
    }
module.exports = {
    clicksComputeSubset : getClicksSubset
}