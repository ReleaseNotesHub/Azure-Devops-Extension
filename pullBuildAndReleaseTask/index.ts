import tl = require('azure-pipelines-task-lib/task');
import httpc = require('typed-rest-client/HttpClient');

async function run() {
    try {
        let serviceString: string = tl.getInput('ReleaseNotesHubService', true);
        let spaceString: string = tl.getInput('space', true);
        let projectString: string = tl.getInput('project', true);
        let publishString: string = tl.getInput('publish', true);
        let releaseString: string = tl.getInput('release', true);
        let majorVersionString: string = tl.getInput('majorVersion', true);
        let minorVersionString: string = tl.getInput('minorVersion', true);
        let buildVersionString: string = tl.getInput('buildVersion', true);
        let revisionVersionString: string = tl.getInput('revisionVersion', false);
        let preReleaseLabelString: string = tl.getInput('preReleaseLabel', false);
        let createOnNotFoundString: string = tl.getInput('createOnNotFound', true);
        var endPointUrlString = tl.getEndpointUrl(serviceString, true);
        var endPointAuth = tl.getEndpointAuthorization(serviceString, true);
        var endPointApiKey = endPointAuth.parameters["apitoken"];

        let debugOutput = tl.getVariable("system.debug");
        debugOutput = debugOutput || "false";
        let isDebugOutput: boolean  = debugOutput.toLowerCase() === "true";

        console.log('serviceString', serviceString);      
        console.log('spaceString', spaceString);        
        console.log('projectString', projectString);       
        console.log('publishString', publishString);      
        console.log('releaseString', releaseString);        
        console.log('majorVersionString', majorVersionString);        
        console.log('buildVersionString', buildVersionString);
        console.log('revisionVersionString', revisionVersionString);
        console.log('preReleaseLabelString', preReleaseLabelString);
        console.log('createOnNotFoundString', createOnNotFoundString);  
        console.log('isDebugOutput', isDebugOutput);   

        console.log('endPointUrlString', endPointUrlString);  
        console.log('endPointApiKey', endPointApiKey);  

        for (let key in endPointAuth.parameters) {
            let value = endPointAuth.parameters[key];
            console.log(key, value);   
        }   
        
        let httpClient: httpc.HttpClient = new httpc.HttpClient('ReleaseNotesHub', []);

        let url: string  = endPointUrlString + "api/pullrevisions/PullLatestRelease/" + projectString
        let data: string = "{}";

        console.log('url', url);  
        console.log('data', data);  

        let result = await httpClient.post(url, data, {
            'Accept': 'application/json',
            'Authorization': 'ApiKey ' + endPointApiKey
        });

        let body: string = await result.readBody(); 
        let obj:any = JSON.parse(body);

        console.log(obj);        
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();