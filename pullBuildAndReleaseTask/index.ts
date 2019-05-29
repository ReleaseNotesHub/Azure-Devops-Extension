import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const serviceString: string = tl.getInput('ReleaseNotesHubService', true);
        if (serviceString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const spaceString: string = tl.getInput('space', true);
        if (spaceString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const projectString: string = tl.getInput('project', true);
        if (projectString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const publishString: string = tl.getInput('publish', true);
        if (publishString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const releaseString: string = tl.getInput('release', true);
        if (releaseString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const majorVersionString: string = tl.getInput('majorVersion', true);
        if (majorVersionString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const minorVersionString: string = tl.getInput('minorVersion', true);
        if (minorVersionString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const buildVersionString: string = tl.getInput('buildVersion', true);
        if (buildVersionString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const revisionVersionString: string = tl.getInput('revisionVersion', false);
        if (revisionVersionString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const preReleaseLabelString: string = tl.getInput('preReleaseLabel', false);
        if (preReleaseLabelString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

        const createOnNotFoundString: string = tl.getInput('createOnNotFound', true);
        if (createOnNotFoundString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }

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
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();