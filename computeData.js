const getClicksSubset = clicks_object =>{
    let resultset_object={};
    let result_counter_object={};
    let final_resultset=[];
    let prev_time_period=-1;
    let prev_date_period = -1;
    let outputResultSet = [];
    // iterating over each occurrence of the clicks object
    clicks_object.forEach(element => {
     let timestamp= getTimeStamp(element); // function which returns hours and date from the given timestamp
     let time_period = timestamp.time_period_hours; // finding out the selected element's hours
     let current_date_period = timestamp.date_period; // finding out the selected element's date
          
     if(prev_date_period!=-1 && prev_date_period!=current_date_period){ //check for different dates
        final_resultset = final_resultset.concat(Object.values(resultset_object));
        final_resultset =  removeGreaterThanTenIP(final_resultset,result_counter_object);
        outputResultSet = outputResultSet.concat(final_resultset); // concatenate the final result into one array
        final_resultset = [];
        result_counter_object = {};
        resultset_object = {};
        prev_time_period=-1;
        prev_date_period = -1;
        resultset_object =  getResultObject(resultset_object,result_counter_object,element);
     }else{
         if(prev_time_period ==-1 || time_period == prev_time_period){
            resultset_object =  getResultObject(resultset_object,result_counter_object,element);
         }else{
            final_resultset = final_resultset.concat(Object.values(resultset_object));
            resultset_object = {};
            resultset_object = getResultObject(resultset_object,result_counter_object,element);
         }
         prev_time_period = time_period;
     }
     prev_date_period = current_date_period; 
  
    });
    final_resultset = final_resultset.concat(Object.values(resultset_object));
    final_resultset =  removeGreaterThanTenIP(final_resultset,result_counter_object);
    outputResultSet = outputResultSet.concat(final_resultset);
    return outputResultSet; // the final subset of given input set
  }
  
  // function for removing those IPs whose count is greater than 10
  removeGreaterThanTenIP = (final_resultset,result_counter_object) => {
      let updatedResultSet = [];
    for(var i=0;i<final_resultset.length;i++){
        let IP =  final_resultset[i].ip;
        let count = result_counter_object[IP];
        if(count<=10){
            updatedResultSet.push(final_resultset[i]);
        }
    }
    return updatedResultSet;
  }


  // this function checks whether the given IP exists in the final counter array. If yes, then it updates the count of that IP. If no, it adds the IP to the counter array
  const getResultObject = (resultset_object,result_counter_object,element)=>{
        let isInIpCount=result_counter_object.hasOwnProperty(element.ip); 
        if(isInIpCount){
          let count = ++result_counter_object[element.ip];
          result_counter_object[element.ip] = count;
        }else{
          result_counter_object[element.ip] = 1;
        }
        if(!resultset_object.hasOwnProperty(element.ip)){
          resultset_object[element.ip] = element;
        }else{
            // checking if the amount of the current IP click more than the existing click. If yes then it replaces the existing click object for the given IP
          if(resultset_object[element.ip].amount<element.amount){
            resultset_object[element.ip] = element;
          }else if(resultset_object[element.ip].amount==element.amount){ //checking if the amount is same then the click with earlier timestamp should be recorded.
            if(new Date(element.timestamp)< new Date(resultset_object[element.ip].timestamp)){
                resultset_object[element.ip] = element;
            }
          }
        }
        return resultset_object;
  }

  // function for returning the hours and time period
  const getTimeStamp = element =>{
    let time_period_hours = new Date(element.timestamp).getHours(); 
    let date_period = new Date(element.timestamp).toLocaleDateString();
    return {time_period_hours,date_period}
  }
module.exports = {
    clicksComputeSubset : getClicksSubset
}