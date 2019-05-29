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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serviceString = tl.getInput('ReleaseNotesHubService', true);
            if (serviceString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const spaceString = tl.getInput('space', true);
            if (spaceString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const projectString = tl.getInput('project', true);
            if (projectString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const publishString = tl.getInput('publish', true);
            if (publishString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const releaseString = tl.getInput('release', true);
            if (releaseString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const majorVersionString = tl.getInput('majorVersion', true);
            if (majorVersionString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const minorVersionString = tl.getInput('minorVersion', true);
            if (minorVersionString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const buildVersionString = tl.getInput('buildVersion', true);
            if (buildVersionString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const revisionVersionString = tl.getInput('revisionVersion', false);
            if (revisionVersionString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const preReleaseLabelString = tl.getInput('preReleaseLabel', false);
            if (preReleaseLabelString == 'bad') {
                tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                return;
            }
            const createOnNotFoundString = tl.getInput('createOnNotFound', true);
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
    });
}
run();
