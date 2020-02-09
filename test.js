const test_data= require('./test_inputs.js');
const getData = require ('./computeData.js');

const assert= require('assert');

describe('While creating subset',function(){
    context('have no input arguments', function(){
        it('should return an error', function(){
            assert.throws(()=>getData.clicksComputeSubset(),'No Input!'            
            );
        });
    });
    context('have invalid input arguments', function(){
        it('show thorw an error', function(){
            assert.throws(()=>getData.clicksComputeSubset({abc:9011}), "Invalid Arguments");
        });
    });
    context('with valid arguments', function(){
        it('should have equal array length'), function(){
            assert.equal(test_data.output.length, getData.clicksComputeSubset(test_data.input).length);
        }
    });
    
});