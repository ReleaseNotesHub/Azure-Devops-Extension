## Welcome to ReleaseNotesHub
### Release Your Potential
ReleaseNotesHub is a SaaS solution for the publication of Release Notes.
It provides a portal through which Release Notes can be shared and queried.

RnHub accelerates the development life-cycle while integrating seamlessly with your DevOps workflow.
Integrate with any Bug or Task management system, including GitHub, Azure Devops, TFS or Jira.

<a  href="https://imgur.com/lgLUA41"><img  src="https://i.imgur.com/lgLUA41.gif"  width="40%"  height="40%"  title="source: imgur.com"  /></a>

### Add a service connection to ReleaseNotesHub
Before adding any Build or Release tasks to your process, configure a "ReleaseNotesHub" service connection in the Project Settings under Service connections.

### Tasks and Widgets
This extension adds the following tasks:
- Trigger ReleaseNotesHub Pull
- Trigger ReleaseNotesHub Publish Release

### Trigger ReleaseNotesHub Pull
Options include:
  - ReleaseNotesHub service/server end point: The configured service connection
  - Space: ReleaseNotesHub spaces are restricted based on permissions.
  - Project: ReleaseNotesHub projects filtered based on selected sace. 
  - Publish Release: When enabled, release is created and then published.
  - Merge Release: When enabled, merge options are displayed.
  - Merge Options:
    - [Opition 1] Merge from Last merge point to current release. If no merge point exists, merge from last published release to current release.
    - [Opition 2] Merge from last published release to current release.

#### Pull Release Notes for latest Release in RnHub
<a href="https://imgur.com/vlv19Tm"><img src="https://i.imgur.com/vlv19Tm.png" title="source: imgur.com" /></a>

#### Pull Release notes for BuildNumber
<a href="https://imgur.com/fs0KVY7"><img src="https://i.imgur.com/fs0KVY7.png" title="source: imgur.com" /></a>

Options include:
  - Version Number: Version number to be used. This can be extracted from the build name .e.g. 'Build 2019.1.20-rc'.
  - Regex Filter to extract build number: Regular expression filter to get build number from the build name .e.g. '\\d+\\.\\d+\\.\\d+'.
  - Semantic Label: Sematic pre-release Label.
  - Regex Filter to extract Semantic Label: Regular expression filter to get label from the build name .e.g. '((-)(.*)). 
   - Create Release if not found: Create Release with version if not found.     
    - Release Name: Release name to use when creating a new release.
    - Release Description: Release description to use when creating a new release.

#### Pull Release notes for Version
<a href="https://imgur.com/ccNelmM"><img src="https://i.imgur.com/ccNelmM.png" title="source: imgur.com" /></a>

Options include:
  - Major Version: Major version for release.
  - Minor Version: Minor version for release.
  - Build: Build for Release. 
  - Revision: Revision for Release.   
  - Semantic Label: Sematic pre-release Label.
  - Create Release if not found: Create Release with version if not found.     
    - Release Name: Release name to use when creating a new release.
    - Release Description: Release description to use when creating a new release.

### Trigger ReleaseNotesHub Publish Release
Options include:
  - ReleaseNotesHub service/server end point: The configured service connection
  - Space: ReleaseNotesHub spaces are restricted based on permissions.
  - Project: ReleaseNotesHub projects filtered based on selected sace. 
  - Publish Release: When enabled, release is created and then published.
  - Publish Options:
    - [Opition 1] Publish Release notes for BuildNumber and latest Revision.
    - [Opition 2] Publish Release notes for Version and latest Revision.

#### Publish Release notes for BuildNumber and latest Revision
<a href="https://imgur.com/haLiuc6"><img src="https://i.imgur.com/haLiuc6.png" title="source: imgur.com" /></a>

Options include:
  - Version Number: Version number to be used. This can be extracted from the build name .e.g. 'Build 2019.1.20-rc'.
  - Regex Filter to extract build number: Regular expression filter to get build number from the build name .e.g. '\\d+\\.\\d+\\.\\d+'.
  - Semantic Label: Sematic pre-release Label.
  - Regex Filter to extract Semantic Label: Regular expression filter to get label from the build name .e.g. '((-)(.*)). 

#### Publish Release notes for Version and latest Revision
<a href="https://imgur.com/YZt39yq"><img src="https://i.imgur.com/YZt39yq.png" title="source: imgur.com" /></a>

Options include:
  - Major Version: Major version for release.
  - Minor Version: Minor version for release.
  - Build: Build for Release. 
  - Revision: Revision for Release.   
  - Semantic Label: Sematic pre-release Label.