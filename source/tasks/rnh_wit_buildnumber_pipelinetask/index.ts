import tl = require('azure-pipelines-task-lib/task');
import * as utils from "../Utils";

let workItemTypeValue: string;
let workItemStatusValue: string;
let fieldNameValue: string;
let overrideFieldValue: boolean;
let isDebugOutput: boolean;
let versionNumberVariableValue: string;
let versionNumberExpressionValue: string;

async function run() {
    try {
        workItemTypeValue = tl.getInput('workItemType', true);
        workItemStatusValue = tl.getInput('workItemStatus', false);
        fieldNameValue = tl.getInput('fieldName', true);
        let overrideString = tl.getInput('overrideField', true);
        overrideString = overrideString || "false";
        overrideFieldValue = overrideString.toLowerCase() === "true";
        versionNumberVariableValue = tl.getInput('versionNumberVariable', false);
        versionNumberExpressionValue = tl.getInput('versionNumberExpression', false);           


        let debugOutput = tl.getVariable("system.debug");
        debugOutput = debugOutput || "false";
        isDebugOutput = debugOutput.toLowerCase() === "true";

        if (!isDebugOutput)
        {
            console.log("Set variable 'system.debug = true' to run in debug mode.");
        }
        if (isDebugOutput)
        {
            console.log('ReleaseNotesHub Step is running is debug mode.');
            console.log('isDebugOutput', isDebugOutput);   
            console.log('workItemType', workItemTypeValue);      
            console.log('workItemStatus', workItemStatusValue);        
            console.log('fieldName', fieldNameValue);   
            console.log('overrideField', overrideFieldValue);     
            console.log('versionNumberVariable', versionNumberVariableValue);   
            console.log('versionNumberExpression', versionNumberExpressionValue);                       
        }

        let versionNumber: string = versionNumberVariableValue;

        if (versionNumberExpressionValue && versionNumberVariableValue) {
            var versionExp = new RegExp(versionNumberExpressionValue);
            var match = versionExp.exec(versionNumber);
            if (match !== null && match.length >= 1)
            {
                versionNumber = match[0];
            }
            else
            {
                throw new Error("Version Number could not be resolved from " + versionNumber + " using regular expression " + versionNumberExpressionValue);
            }   
        }  

        if (isDebugOutput){
            console.log('Resolved BuildNumber', versionNumber);
        }
  
        const environmentVariables = utils.getVstsEnvironmentVariables();
        const vstsConnection = utils.createVstsConnection(environmentVariables); 
        await utils.updateBuildNumberField(vstsConnection, workItemTypeValue, workItemStatusValue, fieldNameValue, versionNumber, overrideFieldValue, isDebugOutput);
    }
    catch (err) {
        if (isDebugOutput){
            console.log("An exception was thrown while updating the BuildNumber.");
            console.log('Error', err);
        }
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();