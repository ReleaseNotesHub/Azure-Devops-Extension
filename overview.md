## Welcome to ReleaseNotesHub
### Release Your Potential
ReleaseNotesHub is a SaaS solution that automates the generation and publication of release notes.
RnHub has reinvented the way in which release notes are captured, stored and made available to the customer.
It does'nt produce a static document or wiki article for a release. Instead, RnHub is a search engine for release notes. The platform allows the consumer to search, discover and explore changes made to an app, service or software solution.

<a href="https://imgur.com/osp2Dhl"><img src="https://i.imgur.com/osp2Dhl.png" title="source: imgur.com" width="30%"/></a>

With RnHub the creation of Release Notes becomes another step within your CI/CD pipeline. With the appropriate permission, RnHub can pull or receive content from any ticket or task management system which can then be aggregated, sanitised and published via the RnHub platform. RnHub can pull content from many systems including TFS, Azure Devops, GitHub, Jira and Asana.

<a href="https://imgur.com/6PStpRa"><img src="https://i.imgur.com/6PStpRa.png" title="source: imgur.com" width="30%"/></a>

### Add a service connection to ReleaseNotesHub
Before adding any Build or Release tasks to your process, configure a "ReleaseNotesHub" service connection in the Project Settings under Service connections.

Options include:
  - Server Url: https://api.releasenoteshub.com
  - API Token: ApiKey as retrieved from your user profile https://www.releasenoteshub.com/profile. Please note the prefix “ApiKey” is required!

<a href="https://i.imgur.com/wOMcV5h.png"><img src="https://i.imgur.com/wOMcV5h.png" title="source: imgur.com" width="25%"/></a>

### Tasks and Widgets
This extension adds the following tasks:
- [Trigger ReleaseNotesHub Pull](#TriggerPull)
- [Trigger ReleaseNotesHub Publish Release](#TriggerPublish)

### <a id="TriggerPull"></a>Trigger ReleaseNotesHub Pull
Options include:
  - ReleaseNotesHub service/server end point: The configured service connection
  - Space: ReleaseNotesHub spaces are restricted based on permissions.
  - Project: ReleaseNotesHub projects filtered based on selected space. 
  - Publish Release: When enabled, release is created and then published.
  - Merge Release: Merge notes from previous merge point or published release.

#### Pull Release Notes for latest Release in RnHub
<a href="https://imgur.com/JqiWNWa"><img src="https://i.imgur.com/JqiWNWa.png" title="source: imgur.com" width="40%"/></a>

#### Pull Release notes for BuildNumber
<a href="https://imgur.com/sLANrxD"><img src="https://i.imgur.com/sLANrxD.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Version Number: Version number to be used. This can be extracted from the build name .e.g. 'Build 2019.1.20-rc'.
  - Regex Filter to extract build number: Regular expression filter to get build number from the build name .e.g. '\\d+\\.\\d+\\.\\d+'.
  - Semantic Label: Sematic pre-release Label.
  - Regex Filter to extract Semantic Label: Regular expression filter to get label from the build name .e.g. '((-)(.*))'. 
   - Create Release if not found: Create Release with version if not found.     
    - Release Name: Release name to use when creating a new release.
    - Release Description: Release description to use when creating a new release.

#### Pull Release notes for Version
<a href="https://imgur.com/VHKBYU7"><img src="https://i.imgur.com/VHKBYU7.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Major Version: Major version for release.
  - Minor Version: Minor version for release.
  - Build: Build for Release. 
  - Revision: Revision for Release.   
  - Semantic Label: Sematic pre-release Label.
  - Create Release if not found: Create Release with version if not found.     
    - Release Name: Release name to use when creating a new release.
    - Release Description: Release description to use when creating a new release.

### <a id="TriggerPublish"></a>Trigger ReleaseNotesHub Publish Release

Options include:
  - ReleaseNotesHub service/server end point: The configured service connection
  - Space: ReleaseNotesHub spaces are restricted based on permissions.
  - Project: ReleaseNotesHub projects filtered based on selected sace. 
  - Publish Release: When enabled, release is created and then published.
  - Publish Options:
    - [Opition 1] Publish Release notes for BuildNumber and latest Revision.
    - [Opition 2] Publish Release notes for Version and latest Revision.

#### Publish Release notes for BuildNumber and latest Revision
<a href="https://imgur.com/JA5214z"><img src="https://i.imgur.com/JA5214z.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Version Number: Version number to be used. This can be extracted from the build name .e.g. 'Build 2019.1.20-rc'.
  - Regex Filter to extract build number: Regular expression filter to get build number from the build name .e.g. '\\d+\\.\\d+\\.\\d+'.
  - Semantic Label: Sematic pre-release Label.
  - Regex Filter to extract Semantic Label: Regular expression filter to get label from the build name .e.g. '((-)(.*))'. 

#### Publish Release notes for Version and latest Revision
<a href="https://imgur.com/jIYHXef"><img src="https://i.imgur.com/jIYHXef.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Major Version: Major version for release.
  - Minor Version: Minor version for release.
  - Build: Build for Release. 
  - Revision: Revision for Release.   
  - Semantic Label: Sematic pre-release Label.

  ### Helpful Resources
  - [ReleaseNotesHub website](https://www.releasenoteshub.com)
  - [Help Center](http://support.releasenoteshub.com)
  - [GitHub](https://github.com/ReleaseNotesHub)
  - [Twitter](https://twitter.com/ReleaseNotesHub)
  - [Facebook](https://www.facebook.com/ReleaseNotesHub)
  - [LinkedIn](https://www.linkedin.com/company/releasenoteshub)
  - [YouTube](https://www.youtube.com/channel/UCX7IYTohJCCTKr32UveJbjw)    
  - [Contact our team](http://support.releasenoteshub.com/form)      
