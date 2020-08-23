import * as vsts from "azure-devops-node-api/WebApi";
import * as vss from 'azure-devops-node-api/interfaces/Common/VSSInterfaces';
import * as tasks from "azure-pipelines-task-lib";
import { isNullOrWhitespace } from "./inputs";

export interface ReleaseEnvironmentVariables {
    releaseName: string;
    releaseId: string;
    releaseUri: string;
}

export interface BuildEnvironmentVariables {
    buildNumber: string;
    buildId: number;
    buildName: string;
    buildRepositoryName: string;
    buildRepositoryProvider: string;
    buildRepositoryUri: string;
    buildSourceVersion: string;
}

export interface AgentEnvironmentVariables {
    agentBuildDirectory: string;
}

export interface SystemEnvironmentVariables {
    projectName: string;
    projectId: string;
    teamCollectionUri: string;
    defaultWorkingDirectory: string;
}

export type VstsEnvironmentVariables = ReleaseEnvironmentVariables & BuildEnvironmentVariables & AgentEnvironmentVariables & SystemEnvironmentVariables;

export const getVstsEnvironmentVariables = (): VstsEnvironmentVariables => {
    return {
        projectId: process.env["SYSTEM_TEAMPROJECTID"],
        projectName: process.env["SYSTEM_TEAMPROJECT"],
        buildNumber: process.env["BUILD_BUILDNUMBER"],
        buildId: Number(process.env["BUILD_BUILDID"]),
        buildName: process.env["BUILD_DEFINITIONNAME"],
        buildRepositoryName: process.env["BUILD_REPOSITORY_NAME"],
        releaseName: process.env["RELEASE_RELEASENAME"],
        releaseUri: process.env["RELEASE_RELEASEWEBURL"],
        releaseId: process.env["RELEASE_RELEASEID"],
        teamCollectionUri: process.env["SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],
        defaultWorkingDirectory: process.env["SYSTEM_DEFAULTWORKINGDIRECTORY"],
        buildRepositoryProvider: process.env["BUILD_REPOSITORY_PROVIDER"],
        buildRepositoryUri: process.env["BUILD_REPOSITORY_URI"],
        buildSourceVersion: process.env["BUILD_SOURCEVERSION"],
        agentBuildDirectory: process.env["AGENT_BUILDDIRECTORY"],
    };
};

export async function updateBuildNumberField(client: vsts.WebApi, _workItemType: string, workItemStatus: string, fieldName: string, buildNumber: string, overrideField: boolean, isDebugOutput: boolean = false) {
    const environment = getVstsEnvironmentVariables();
    if (isDebugOutput) { console.log(`Environment = ${environment.buildRepositoryProvider}`); }

    const workItemRefs = await client.getBuildApi().then((x) => x.getBuildWorkItemsRefs(environment.projectName, environment.buildId));

    if (isDebugOutput) 
    {
        console.log('WorkItemRefs Found: ' + workItemRefs.length);
        workItemRefs.forEach(function (value) {
            console.log('WorkItemRefId: ' + value.id);
        }); 
    }

    if (workItemRefs.length > 0) {
        let fields: string[] = [fieldName, "System.State"];
        var workItems = await client.getWorkItemTrackingApi().then((x) => x.getWorkItems(workItemRefs.map((x) => Number(x.id)), fields));
       
        if (isDebugOutput) 
        {        
            console.log('WorkItem Instances Found: ' + workItems.length);
            workItems.forEach(function (value) {
                if (value.fields)
                {
                    console.log('WorkItemId: ' + value.id);
                    console.log('System.State: ' + value.fields["System.State"]);
                    console.log(`${fieldName}: ` + value.fields[fieldName]);
                }
            });
        } 
        
        var filteredItems = workItems.filter((x) => x.fields && (overrideField || isNullOrWhitespace(x.fields[fieldName])) 
        && (isNullOrWhitespace(workItemStatus) || x.fields["System.State"] === workItemStatus));
        
        if (isDebugOutput) 
        { 
            console.log('Filtered WorkItems Found: ' + filteredItems.length); 
            filteredItems.forEach(function (value) {
                console.log('Filtered WorkItemId: ' + value.id);
            }); 
        }

        filteredItems.forEach(async function (value) {
            if (isDebugOutput)  { console.log('Updating field for WorkItemId: ' + value.id); }
            let patch: vss.JsonPatchDocument = [{ "op": "add", "path": `/fields/${fieldName}`, "value": buildNumber }];
            await client.getWorkItemTrackingApi().then((x) => x.updateWorkItem(null, patch, value.id));
        });
    }
}

export const createVstsConnection = (environment: SystemEnvironmentVariables) => {
    var vstsAuthorization = tasks.getEndpointAuthorization("SystemVssConnection", true);
    var token = vstsAuthorization.parameters["AccessToken"];
    let authHandler = vsts.getPersonalAccessTokenHandler(token);
    return new vsts.WebApi(environment.teamCollectionUri, authHandler);
};
