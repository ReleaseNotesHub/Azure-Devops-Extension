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
let serviceValue;
let spaceValue;
let projectValue;
let publishValue;
let mergeValue;
let mergeOptionsValue;
let releaseOptionsValue;
let releaseNameValue;
let releaseDescriptionValue;
let versionNumberValue;
let versionNumberExpressionValue;
let labelValue;
let labelExpressionValue;
let createOnNotFoundValue;
var endPointUrlValue;
var endPointApiKey;
let isDebugOutput;
const testVersionFormatExpression = "^(\\d+\\.)?(\\*|\\d+)$|^(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$|^(\\d+\\.)?(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            serviceValue = tl.getInput("ReleaseNotesHubService", true);
            spaceValue = tl.getInput("space", true);
            projectValue = tl.getInput("project", true);
            publishValue = tl.getInput("publish", true);
            mergeValue = tl.getInput("merge", true);
            mergeOptionsValue = tl.getInput("mergeOptions", true);
            releaseOptionsValue = tl.getInput("releaseOptions", true);
            releaseNameValue = tl.getInput("releaseName", false);
            releaseDescriptionValue = tl.getInput("releaseDescription", false);
            versionNumberValue = tl.getInput("versionNumber", false);
            versionNumberExpressionValue = tl.getInput("versionNumberExpression", false);
            labelValue = tl.getInput("label", false);
            labelExpressionValue = tl.getInput("labelExpression", false);
            createOnNotFoundValue = tl.getInput("createOnNotFound", true);
            endPointUrlValue = tl.getEndpointUrl(serviceValue, true);
            var endPointAuthValue = tl.getEndpointAuthorization(serviceValue, true);
            endPointApiKey = endPointAuthValue.parameters["apitoken"];
            let debugOutput = tl.getVariable("system.debug");
            debugOutput = debugOutput || "false";
            isDebugOutput = debugOutput.toLowerCase() === "true";
            if (!isDebugOutput) {
                console.log("Set variable 'system.debug = true' to run in debug mode.");
            }
            if (isDebugOutput) {
                console.log('ReleaseNotesHub Step is running is debug mode.');
                console.log('isDebugOutput', isDebugOutput);
                console.log('serviceValue', serviceValue);
                console.log('spaceValue', spaceValue);
                console.log('projectValue', projectValue);
                console.log('publishValue', publishValue);
                console.log('mergeValue', mergeValue);
                console.log('mergeOptionsValue', mergeOptionsValue);
                console.log('releaseOptionsValue', releaseOptionsValue);
                console.log('releaseNameValue', releaseNameValue);
                console.log('releaseDescriptionValue', releaseDescriptionValue);
                console.log('versionNumber', versionNumberValue);
                console.log('versionNumberExpression', versionNumberExpressionValue);
                console.log('preReleaseLabel', labelValue);
                console.log('labelExpression', labelExpressionValue);
                console.log('createOnNotFound', createOnNotFoundValue);
                console.log('endPointUrlValue', endPointUrlValue);
                console.log('endPointApiKey', endPointApiKey);
                for (let key in endPointAuthValue.parameters) {
                    let value = endPointAuthValue.parameters[key];
                    console.log(key, value);
                }
            }
            if (releaseOptionsValue == "WithVersion") {
                yield runWithVersion();
            }
            else if (releaseOptionsValue == "LatestRelease") {
                yield runLatestRelease();
            }
        }
        catch (err) {
            if (isDebugOutput) {
                console.log("Error", err);
            }
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
function runWithVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isDebugOutput) {
            console.log('Executing RnHub Release Pull with Version.');
        }
        if (versionNumberValue == null) {
            throw new Error("Version Number not set. This is a required value.");
        }
        var versionExp = new RegExp(versionNumberExpressionValue);
        var match = versionExp.exec(versionNumberValue);
        if (match == null || match.length == 0) {
            throw new Error("Version Number could not be resolved from '" + versionNumberValue + "' using regular expression '" + versionNumberExpressionValue + "'");
        }
        let versionMajor = getVersionGroup(match, 1, "Major Version");
        let versionMinor = getVersionGroup(match, 2, "Minor Version");
        let versionBuild = getVersionGroup(match, 3, "Build Version");
        let versionRevision = getVersionGroup(match, 4, "Version Revision");
        let versionLabel = labelValue;
        if (labelExpressionValue !== null) {
            var versionExp = new RegExp(labelExpressionValue);
            var match = versionExp.exec(versionLabel);
            if (match !== null && match.length >= 1) {
                versionLabel = match[1];
                if (isDebugOutput) {
                    console.log("Resolved Label", versionLabel);
                }
            }
            else {
                throw new Error("Version Label could not be resolved from " + versionLabel + " using regular expression " + labelExpressionValue);
            }
        }
        let url = endPointUrlValue + "api/pull/PullVersion/" + projectValue;
        let data = "{";
        data += "\"version\": {";
        data += "\"versionMajor\":" + versionMajor;
        if (versionMinor !== null)
            data += ",\"versionMinor\":" + versionMinor;
        if (versionBuild !== null)
            data += ",\"versionBuild\":" + versionBuild;
        if (versionRevision !== null)
            data += ",\"versionRevision\":" + versionRevision;
        if (versionLabel !== null) {
            data += ",\"preReleaseLabel\": \"" + versionLabel + "\"";
            data += ",\"isSemanticVersion\": true";
        }
        data += "}";
        if (releaseNameValue !== null) {
            data += ",\"name\": \"" + releaseNameValue + "\"";
        }
        if (releaseDescriptionValue !== null) {
            data += ",\"description\": \"" + releaseDescriptionValue + "\"";
        }
        data += ",\"publish\":" + publishValue;
        data += ",\"createOnNotFound\":" + createOnNotFoundValue;
        data += ",\"merge\":" + mergeValue;
        data += ",\"mergePoint\":" + mergeOptionsValue;
        data += "}";
        yield runHttpPost(url, data);
    });
}
function getVersionGroup(groups, index, compmentName) {
    if (groups == null || groups.length <= index) {
        return null;
    }
    let value = groups[index];
    let isVersionNumericValue = isNumber(value);
    if (!isVersionNumericValue) {
        throw new Error(compmentName + " '" + value + "' must be numeric.");
    }
    if (isDebugOutput) {
        console.log("Resolved " + compmentName + " is", value);
    }
    return value;
}
function runLatestRelease() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isDebugOutput) {
            console.log('Executing RnHub Pull for latest Release.');
        }
        let url = endPointUrlValue + "api/pull/PullLatestRelease/" + projectValue;
        let data = "{";
        data += "{\"publish\":" + publishValue + "}";
        data += ",\"merge\":" + mergeValue;
        data += ",\"mergePoint\":" + mergeOptionsValue;
        data += "}";
        yield runHttpPost(url, data);
    });
}
function runHttpPost(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let httpClient = new httpc.HttpClient("ReleaseNotesHub", []);
        if (isDebugOutput) {
            console.log('Post to url', url);
            console.log('Post data', data);
        }
        let result = yield httpClient.post(url, data, {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "ApiKey " + endPointApiKey
        });
        console.log('Response Status Code', result.message.statusCode);
        let body = yield result.readBody();
        //let obj:any = JSON.parse(body);
        if (isDebugOutput) {
            console.log('Response Body', body);
        }
        if (result.message.statusCode !== 200) {
            throw new Error("Call to ReleaseNotesHub failed.");
        }
    });
}
function isValidVersion(version) {
    var versionExp = new RegExp(testVersionFormatExpression);
    return versionExp.test(version);
}
function isNumber(value) {
    return ((value !== null) && !isNaN(Number(value.toString())));
}
run();
