## Welcome to ReleaseNotesHub
### Release Your Potential
ReleaseNotesHub is a SaaS solution that automates the generation and publication of release notes.
ReleaseNotesHub has reinvented the way in which release notes are captured, stored and made available to the customer.
It does'nt produce a static document or wiki article for a release. Instead, ReleaseNotesHub is a search engine for release notes. The platform allows the consumer to search, discover and explore changes made to an app, service or software solution.

<a href="https://imgur.com/osp2Dhl"><img src="https://i.imgur.com/osp2Dhl.png" title="source: imgur.com" width="30%"/></a>

With ReleaseNotesHub the creation of Release Notes becomes another step within your CI/CD pipeline. With the appropriate permission, ReleaseNotesHub can pull or receive content from any ticket or task management system which can then be aggregated, sanitised and published via the ReleaseNotesHub platform. ReleaseNotesHub can pull content from many systems including TFS, Azure Devops, GitHub, Jira and Asana.

<a href="https://imgur.com/6PStpRa"><img src="https://i.imgur.com/6PStpRa.png" title="source: imgur.com" width="30%"/></a>

### Add a service connection for ReleaseNotesHub
Before adding any Build or Release tasks to your process, configure a "ReleaseNotesHub" service connection in the Project Settings under Service connections.

Options include:
  - Server Url: https://api.releasenoteshub.com
  - API Token: ApiKey as retrieved from your user profile https://www.releasenoteshub.com/profile.

<a href="https://i.imgur.com/wOMcV5h.png"><img src="https://i.imgur.com/wOMcV5h.png" title="source: imgur.com" width="25%"/></a>

### Tasks and Widgets
This extension adds the following tasks:
- [Trigger ReleaseNotesHub Pull](#TriggerPull)
- [Trigger ReleaseNotesHub Publish Release](#TriggerPublish)
- [Update BuildNumber Field on WorkItems associated with ChangeSet](#UpdateBuildNumber)

### <a id="TriggerPull"></a>Trigger ReleaseNotesHub Pull
Options include:
  - ReleaseNotesHub service/server end point: The configured service connection
  - Space: ReleaseNotesHub spaces are restricted based on permissions.
  - Project: ReleaseNotesHub projects filtered based on selected space. 
  - Publish Release: When enabled, release is created and then published.
  - Merge Release: Merge notes from previous merge point or published release.

#### Pull Release Notes for latest Release in ReleaseNotesHub
<a href="https://imgur.com/oCXYw7f"><img src="https://i.imgur.com/oCXYw7f.png" title="source: imgur.com" width="40%"/></a>

#### Pull Release notes for BuildNumber
<a href="https://imgur.com/pYBm8zs"><img src="https://i.imgur.com/pYBm8zs.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Version Number: Version number to be used. This can be extracted from the build name .e.g. 'Build 2019.1.20-rc'.
  - Regex Filter to extract build number: Regular expression filter to get build number from the build name .e.g. '\\d+\\.\\d+\\.\\d+'.
  - Semantic Label: Sematic pre-release Label.
  - Regex Filter to extract Semantic Label: Regular expression filter to get label from the build name .e.g. '((-)(.*))'. 
  - Ignore if Release exists: If release already exists then ignore pull request.    
  - Create Release if not found: Create Release with version if not found.     
    - Release Name: Release name to use when creating a new release.
    - Release Description: Release description to use when creating a new release.

#### Pull Release notes for Version
<a href="https://imgur.com/icW6cGh"><img src="https://i.imgur.com/icW6cGh.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Major Version: Major version for release.
  - Minor Version: Minor version for release.
  - Build: Build for Release. 
  - Revision: Revision for Release.   
  - Semantic Label: Sematic pre-release Label.
  - Ignore if Release exists: If release already exists then ignore pull request.      
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
<a href="https://imgur.com/1l1tUIy"><img src="https://i.imgur.com/1l1tUIy.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Version Number: Version number to be used. This can be extracted from the build name .e.g. 'Build 2019.1.20-rc'.
  - Regex Filter to extract build number: Regular expression filter to get build number from the build name .e.g. '\\d+\\.\\d+\\.\\d+'.
  - Semantic Label: Sematic pre-release Label.
  - Regex Filter to extract Semantic Label: Regular expression filter to get label from the build name .e.g. '((-)(.*))'. 

#### Publish Release notes for Version and latest Revision
<a href="https://imgur.com/QS6dyd2"><img src="https://i.imgur.com/QS6dyd2.png" title="source: imgur.com" width="40%"/></a>

Options include:
  - Major Version: Major version for release.
  - Minor Version: Minor version for release.
  - Build: Build for Release. 
  - Revision: Revision for Release.   
  - Semantic Label: Sematic pre-release Label.

  ### <a id="UpdateBuildNumber"></a>Update BuildNumber Field on WorkItems associated with ChangeSet
  <a href="https://imgur.com/8rPwhPH"><img src="https://i.imgur.com/8rPwhPH.png" title="source: imgur.com" width="40%"/></a>

  Options include:
  - WorkItem Type
  - WorkItem State
  - Override Field Value: Always override target field with curret build number. 
  - Field Name: Target Field Name for BuildNumber e.g. 'Custom.BuildNumber'.
  - Version Number: Version number to be used. This can be extracted from the build name .e.g. 'Build 2019.1.20-rc'.
  - Regex Filter to extract build number: Regular expression filter to get build number from the build name .e.g. '\\d+\\.\\d+\\.\\d+'.

  ### Helpful Resources
  - [ReleaseNotesHub website](https://www.releasenoteshub.com)
  - [Help Center](http://support.releasenoteshub.com)
  - [GitHub](https://github.com/ReleaseNotesHub)
  - [Twitter](https://twitter.com/ReleaseNotesHub)
  - [Facebook](https://www.facebook.com/ReleaseNotesHub)
  - [LinkedIn](https://www.linkedin.com/company/releasenoteshub)
  - [YouTube](https://www.youtube.com/channel/UCX7IYTohJCCTKr32UveJbjw)    
  - [Contact our team](http://support.releasenoteshub.com/form)      
