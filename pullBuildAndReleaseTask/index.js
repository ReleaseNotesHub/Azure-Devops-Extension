"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const httpc = require("typed-rest-client/HttpClient");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let serviceString = tl.getInput('ReleaseNotesHubService', true);
            let spaceString = tl.getInput('space', true);
            let projectString = tl.getInput('project', true);
            let publishString = tl.getInput('publish', true);
            let releaseString = tl.getInput('release', true);
            let majorVersionString = tl.getInput('majorVersion', true);
            let minorVersionString = tl.getInput('minorVersion', true);
            let buildVersionString = tl.getInput('buildVersion', true);
            let revisionVersionString = tl.getInput('revisionVersion', false);
            let preReleaseLabelString = tl.getInput('preReleaseLabel', false);
            let createOnNotFoundString = tl.getInput('createOnNotFound', true);
            var endPointUrlString = tl.getEndpointUrl(serviceString, true);
            var endPointAuth = tl.getEndpointAuthorization(serviceString, true);
            var endPointApiKey = endPointAuth.parameters["apitoken"];
            let debugOutput = tl.getVariable("system.debug");
            debugOutput = debugOutput || "false";
            let isDebugOutput = debugOutput.toLowerCase() === "true";
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
            let httpClient = new httpc.HttpClient('ReleaseNotesHub', []);
            let url = endPointUrlString + "api/pullrevisions/PullLatestRelease/" + projectString;
            let data = "{}";
            console.log('url', url);
            console.log('data', data);
            let result = yield httpClient.post(url, data, {
                'Accept': 'application/json',
                'Authorization': 'ApiKey ' + endPointApiKey
            });
            let body = yield result.readBody();
            let obj = JSON.parse(body);
            console.log(obj);
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
