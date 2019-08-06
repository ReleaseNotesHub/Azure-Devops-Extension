import tl = require('azure-pipelines-task-lib/task');
import httpc = require('typed-rest-client/HttpClient');
let serviceValue: string;
let spaceValue: string;
let projectValue: string;
let publishValue: string;
let releaseValue: string;
let releaseNameValue: string;
let releaseDescriptionValue: string;
let majorVersionValue: string;
let minorVersionValue: string;
let buildVersionValue: string;
let revisionVersionValue: string;
let preReleaseLabelValue: string;
let createOnNotFoundValue: string;
let versionNumberValue: string;
let versionNumberExpressionValue: string;
let labelExpressionValue: string;
var endPointUrlValue: any;
var endPointApiKey: any;
let isDebugOutput: boolean;
const testVersionFormatExpression: string = "^(\\d+\\.)?(\\*|\\d+)$|^(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$|^(\\d+\\.)?(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$";

async function run() {
    try {
        serviceValue = tl.getInput('ReleaseNotesHubService', true);
        spaceValue = tl.getInput('space', true);
        projectValue = tl.getInput('project', true);
        publishValue = tl.getInput('publish', true);
        releaseValue = tl.getInput('release', true);
        releaseNameValue = tl.getInput('releaseName', false); 
        releaseDescriptionValue = tl.getInput('releaseDescription', false); 
        majorVersionValue = tl.getInput('withVersion_majorVersion', false);
        minorVersionValue = tl.getInput('withVersion_minorVersion', false);
        buildVersionValue = tl.getInput('withVersion_buildVersion', false);
        revisionVersionValue = tl.getInput('withVersion_revisionVersion', false);
        preReleaseLabelValue = tl.getInput('preReleaseLabel', false);        
        createOnNotFoundValue = tl.getInput('createOnNotFound', true);   
        versionNumberValue = tl.getInput('withVersionVariable_versionNumber', false);
        versionNumberExpressionValue = tl.getInput('withVersionVariable_versionNumberExpression', false);     
        labelExpressionValue = tl.getInput('withVersionVariable_labelExpression', false);     
        endPointUrlValue = tl.getEndpointUrl(serviceValue, true);
        var endPointAuthValue = tl.getEndpointAuthorization(serviceValue, true);
        endPointApiKey = endPointAuthValue.parameters["apitoken"];

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
            console.log('serviceValue', serviceValue);      
            console.log('spaceValue', spaceValue);        
            console.log('projectValue', projectValue);       
            console.log('publishValue', publishValue);      
            console.log('releaseValue', releaseValue);       
            console.log('releaseNameValue', releaseNameValue);       
            console.log('releaseDescriptionValue', releaseDescriptionValue);        
            console.log('withVersion_majorVersion', majorVersionValue);    
            console.log('withVersion_minorVersion', minorVersionValue);         
            console.log('withVersion_buildVersion', buildVersionValue);          
            console.log('withVersion_revisionVersion', revisionVersionValue);
            console.log('preReleaseLabel', preReleaseLabelValue);
            console.log('createOnNotFound', createOnNotFoundValue);   
            console.log('withVersionVariable_versionNumber', versionNumberValue);      
            console.log('withVersionVariable_versionNumberExpression', versionNumberExpressionValue);   
            console.log('withVersionVariable_labelExpression', labelExpressionValue);    
            console.log('endPointUrlValue', endPointUrlValue);  
            console.log('endPointApiKey', endPointApiKey);  

            for (let key in endPointAuthValue.parameters) {
                let value = endPointAuthValue.parameters[key];
                console.log(key, value);   
            }               
        }

        if (releaseValue == 'WithVersionVariable'){
            await runWithVersionVariable();
        }
        else if (releaseValue == 'WithVersion'){
            await runWithVersion();
        }
        else if (releaseValue == 'LatestRelease'){
            await runLatestRelease();
        }   
    }
    catch (err) {
        if (isDebugOutput){
            console.log('Error', err);
        }
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

async function runWithVersionVariable() {
    if (isDebugOutput){
        console.log('Executing RnHub Release Pull using BuildNumber.');
    }
    if (releaseNameValue == null) {
        throw new Error("Release Name not set. This is a required value.");
    }
    if (versionNumberValue == null) {
        throw new Error("Version Number not set. This is a required value.");
    }

    let versionNumber: string = versionNumberValue;

    if (versionNumberExpressionValue !== null) {
        var versionExp = new RegExp(versionNumberExpressionValue);
        var match = versionExp.exec(versionNumber);
        if (match !== null && match.length >= 1)
        {
            versionNumber = match[0];
            if (isDebugOutput){
                console.log('Resolved BuildNumber', versionNumber);
            }
        }
        else
        {
            throw new Error("Version Number could not be resolved from " + versionNumber + " using regular expression " + versionNumberExpressionValue);
        }   
    }  

    let versionLabel: string = preReleaseLabelValue; 
    
    if (labelExpressionValue !== null) {
        var versionExp = new RegExp(labelExpressionValue);
        var match = versionExp.exec(versionLabel);
        if (match !== null && match.length >= 1)
        {
            versionLabel = match[0];
            if (isDebugOutput){
                console.log('Resolved Label', versionLabel);
            }
        }
        else
        {
            throw new Error("Version Label could not be resolved from " + versionLabel + " using regular expression " + labelExpressionValue);
        }   
    }  

    let isValidVersionValue: boolean = isValidVersion(versionNumber);
    if (!isValidVersionValue) {
        throw new Error("Did not find match for Version '" + versionNumber + "' with '" + testVersionFormatExpression + "'");
    }

    var versionNumberValues = versionNumber.split(".");
    let isVersionNumericValue: boolean = isVersionNumeric(versionNumberValues);
    if (!isVersionNumericValue) {
        throw new Error("Each component of Version must be numeric.");
    }

    let url: string = endPointUrlValue + "api/pullrevisions/PullVersion/" + projectValue
    let data: string = "{" + "\"versionMajor\":" + versionNumberValues[0];
    if (versionNumberValues.length >= 2) data += ",\"versionMinor\":" + versionNumberValues[1];
    if (versionNumberValues.length >= 3) data += ",\"versionBuild\":" + versionNumberValues[2];
    if (versionNumberValues.length >= 4) data += ",\"versionRevision\":" + versionNumberValues[3];
    if (versionLabel !== null) {
        data += ",\"preReleaseLabel\": \"" + versionLabel + "\"";
    }
    data += ",\"name\": \"" + releaseNameValue + "\"";
    if (releaseDescriptionValue !== null) {
        data += ",\"description\": \"" + releaseDescriptionValue + "\"";
    }
    data += ",\"publish\":" + publishValue;
    data += ",\"createOnNotFound\":" + createOnNotFoundValue + "}";
    await runHttpPost(url, data);
}

async function runWithVersion() {
    if (isDebugOutput){
        console.log('Executing RnHub Release Pull using Version.');
    }
    if (releaseNameValue == null) {
        throw new Error("Release Name not set. This is a required value.");
    }
    if (majorVersionValue == null) {
        throw new Error("Major Release Version not set. This is a required value.");
    }

    if (!isNumber(majorVersionValue)) {
        throw new Error("Major Release Version must be numeric.");
    }

    if (minorVersionValue !== null && !isNumber(minorVersionValue)) {
        throw new Error("Minor Release Version must be numeric.");
    }

    if (buildVersionValue !== null && !isNumber(buildVersionValue)) {
        throw new Error("Build Release Version must be numeric.");
    }
    
    if (revisionVersionValue !== null && !isNumber(revisionVersionValue)) {
        throw new Error("Release Revision must be numeric.");
    } 

    let url: string = endPointUrlValue + "api/pullrevisions/PullVersion/" + projectValue
    let data: string = "{" + "\"versionMajor\":" + majorVersionValue;
    if (minorVersionValue !== null) data += ",\"versionMinor\":" + minorVersionValue;
    if (buildVersionValue !== null) data += ",\"versionBuild\":" + buildVersionValue;
    if (revisionVersionValue !== null) data += ",\"versionRevision\":" + revisionVersionValue;
    if (preReleaseLabelValue !== null) {
        data += ",\"preReleaseLabel\": \"" + preReleaseLabelValue + "\"";
    }
    data += ",\"name\": \"" + releaseNameValue + "\"";
    if (releaseDescriptionValue !== null) {
        data += ",\"description\": \"" + releaseDescriptionValue + "\"";
    }
    data += ",\"publish\":" + publishValue;
    data += ",\"createOnNotFound\":" + createOnNotFoundValue + "}";
    await runHttpPost(url, data);
}

async function runLatestRelease() {
    if (isDebugOutput){
        console.log('Executing RnHub Pull for latest Release.');
    }
    let url: string  = endPointUrlValue + "api/pullrevisions/PullLatestRelease/" + projectValue
    let data: string = "{\"publish\":" + publishValue + "}";
    await runHttpPost(url, data);
}

async function runHttpPost(url: string, data: string) {
    let httpClient: httpc.HttpClient = new httpc.HttpClient('ReleaseNotesHub', []);
    if (isDebugOutput)
    {
        console.log('Post to url', url);  
        console.log('Post data', data); 
    } 

    let result = await httpClient.post(url, data, {
        'Content-Type': 'application/json',
        'Accept': 'application/json',           
        'Authorization': 'ApiKey ' + endPointApiKey
    });

    console.log('Response Status Code', result.message.statusCode);   

    let body: string = await result.readBody(); 
    //let obj:any = JSON.parse(body);

    if (isDebugOutput){
        console.log('Response Body', body); 
    }    

    if (result.message.statusCode !== 200){
        throw new Error("Call to ReleaseNotesHub failed.");
    }
}

function isValidVersion(version: string): boolean
{
    var versionExp = new RegExp(testVersionFormatExpression);
    return versionExp.test(version);
}

function isVersionNumeric(version: string[]): boolean
{
    for (var value in version)
    {
        if (!isNumber(value)) return false;
    }
    return true
}

function isNumber(value: string | number): boolean
{
   return ((value !== null) && !isNaN(Number(value.toString())));
}

run();