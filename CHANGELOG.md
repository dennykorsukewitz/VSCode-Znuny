# Changelog

All notable changes to the "Znuny" extension will be documented in this file.

## [1.2.0]

### GenerateFilelist

Fixed spacing in FileList GenerateFilelist. Thanks to Emin Yazi (@eyazi). [PR#4](https://github.com/dennykorsukewitz/VSCode-Znuny/pull/4)

### Customizer

Added new Setting `znuny.customizer.informationMessages` - Information messages will be displayed.

### AddFolderToWorkspace

This Function provides a searchable list of folders (Workspaces) that can be added **simultaneous** to the current VSC Workspace. All configured folders will be displayed.

**Shortcut:** ```strg + alt + k, p```<br>
**Command:**  ```AddFolderToWorkspace: Add Folder to Workspace.```

### RemoveFolderFromWorkspace

This Function provides a searchable list of folders (Workspaces) that can be removed **simultaneous** from the current VSC Workspace. All current open folders are displayed.

**Shortcut:** ```strg + alt + k, shift + p```<br>
**Command:**  ```AddFolderToWorkspace: Remove Folder from Workspace.```

## [1.1.6]

### QuoteWithMarker

- Updated README.md.
- Tidied code.

## [1.1.5]

### QuoteWithMarker

#### Placeholder

The following placeholders have been added for the `znuny.quoteWithMarker.codeMarker` setting:

- `${year}`   => current year
- `${month}`  => current month
- `${day}`    => current day

Example:

`MyMarker - Copyright (C) 2012-${year} Denny Korsukéwitz, https://dennykorsukewitz.github.io/`

## [1.1.4]

### QuoteWithMarker

LanguageID detection has been added to support more languages.
There is also a new configuration `znuny.quoteWithMarker.lineComment` that can be customized.

### Snippets

#### Added Snippets

- `znuny.Scaffolding.ConfigFile.code-snippets`
- `znuny.Scaffolding.SOPM.code-snippets`
- `znuny.Scaffolding.System.code-snippets`
- `znuny.Scaffolding.UnitTest.code-snippets`
- `znuny.SOPM.Framework.code-snippets`
- `znuny.SOPM.ChangeLog.code-snippets`
- `znuny.SOPM.Code.code-snippets`
- `znuny.SOPM.Database.code-snippets`
- `znuny.SOPM.Description.code-snippets`
- `znuny.SOPM.Filelist.code-snippets`
- `znuny.SOPM.Intro.code-snippets`
- `znuny.SOPM.License.code-snippets`
- `znuny.SOPM.ModuleRequired.code-snippets`
- `znuny.SOPM.Name.code-snippets`
- `znuny.SOPM.OS.code-snippets`
- `znuny.SOPM.PackageAllowDirectUpdate.code-snippets`
- `znuny.SOPM.PackageIsBuildable.code-snippets`
- `znuny.SOPM.PackageIsDownloadable.code-snippets`
- `znuny.SOPM.PackageIsRemovable.code-snippets`
- `znuny.SOPM.PackageIsVisible.code-snippets`
- `znuny.SOPM.PackageRequired.code-snippets`
- `znuny.SOPM.URL.code-snippets`
- `znuny.SOPM.Vendor.code-snippets`
- `znuny.SOPM.Version.code-snippets`

#### Updated all Snippets

Added available versions to each generated snippet (name).

## [1.1.3]

### Snippets

#### Added Snippets

- `znuny.LayoutObject.AddPopupProfiles.code-snippets`
- `znuny.MentionObject.RemoveAllMentions.code-snippets`
- `znuny.SessionObject.GetOrphanedSessionIDs.code-snippets`

#### Updated Snippets

- `znuny.ActivityObject.DataAdd.code-snippets`
- `znuny.ActivityObject.DataGet.code-snippets`
- `znuny.ActivityObject.DataListGet.code-snippets`
- `znuny.ActivityObject.DataSearch.code-snippets`
- `znuny.CSVObject.CSV2Array.code-snippets`
- `znuny.CacheObject.Get.code-snippets`
- `znuny.CalendarObject.CalendarCreate.code-snippets`
- `znuny.CalendarObject.CalendarImport.code-snippets`
- `znuny.CalendarObject.CalendarUpdate.code-snippets`
- `znuny.CalendarObject.TicketAppointmentDelete.code-snippets`
- `znuny.CheckItemObject.StringClean.code-snippets`
- `znuny.CustomerUserObject.CustomerUserAdd.code-snippets`
- `znuny.CustomerUserObject.CustomerUserUpdate.code-snippets`
- `znuny.CustomerUserObject.SetPassword.code-snippets`
- `znuny.DynamicFieldObject.ObjectMappingGet.code-snippets`
- `znuny.DynamicFieldValueObject.AllValuesDelete.code-snippets`
- `znuny.DynamicFieldValueObject.ValueDelete.code-snippets`
- `znuny.DynamicFieldValueObject.ValueGet.code-snippets`
- `znuny.DynamicFieldValueObject.ValueSearch.code-snippets`
- `znuny.DynamicFieldValueObject.ValueSet.code-snippets`
- `znuny.DynamicFieldValueObject.ValueValidate.code-snippets`
- `znuny.EmailObject.Send.code-snippets`
- `znuny.FormDraftObject.FormDraftDelete.code-snippets`
- `znuny.FormDraftObject.FormDraftGet.code-snippets`
- `znuny.GenericAgentObject.JobRun.code-snippets`
- `znuny.JSONObject.Encode.code-snippets`
- `znuny.JWTObject.Encode.code-snippets`
- `znuny.LinkObject.LinkCleanup.code-snippets`
- `znuny.LinkObject.LinkListWithData.code-snippets`
- `znuny.LinkObject.ObjectDescriptionGet.code-snippets`
- `znuny.LinkObject.ObjectPermission.code-snippets`
- `znuny.LogObject.GetLogEntry.code-snippets`
- `znuny.MailAccountObject.MailAccountCheck.code-snippets`
- `znuny.MailAccountObject.MailAccountFetch.code-snippets`
- `znuny.MailAccountObject.MailAccountUpdate.code-snippets`
- `znuny.MailQueueObject.Create.code-snippets`
- `znuny.MailQueueObject.Delete.code-snippets`
- `znuny.MailQueueObject.Get.code-snippets`
- `znuny.MailQueueObject.List.code-snippets`
- `znuny.MailQueueObject.Send.code-snippets`
- `znuny.MainObject.Dump.code-snippets`
- `znuny.MainObject.FileDelete.code-snippets`
- `znuny.MainObject.FileGetMTime.code-snippets`
- `znuny.MainObject.FilenameCleanUp.code-snippets`
- `znuny.MentionObject.GetTicketMentions.code-snippets`
- `znuny.MentionObject.GetUserMentions.code-snippets`
- `znuny.NotificationEventObject.NotificationImport.code-snippets`
- `znuny.PIDObject.PIDCreate.code-snippets`
- `znuny.PIDObject.PIDUpdate.code-snippets`
- `znuny.PackageObject.AnalyzePackageFrameworkRequirements.code-snippets`
- `znuny.PackageObject.DeployCheck.code-snippets`
- `znuny.PackageObject.PackageFileGetMD5Sum.code-snippets`
- `znuny.PackageObject.PackageInstall.code-snippets`
- `znuny.PackageObject.RepositoryAdd.code-snippets`
- `znuny.PackageObject.RepositoryPackageListGet.code-snippets`
- `znuny.QueueObject.NameExistsCheck.code-snippets`
- `znuny.QueueObject.QueueGet.code-snippets`
- `znuny.SLAObject.SLAUpdate.code-snippets`
- `znuny.ServiceObject.ServiceAdd.code-snippets`
- `znuny.ServiceObject.ServiceUpdate.code-snippets`
- `znuny.StandardTemplateObject.NameExistsCheck.code-snippets`
- `znuny.StateObject.StateGetStatesByType.code-snippets`
- `znuny.StatsObject.Export.code-snippets`
- `znuny.StatsObject.GetStaticFiles.code-snippets`
- `znuny.StatsObject.GetStatsList.code-snippets`
- `znuny.StatsObject.StatsCleanUp.code-snippets`
- `znuny.StatsObject.StatsInstall.code-snippets`
- `znuny.StatsObject.StatsListGet.code-snippets`
- `znuny.StatsObject.StatsResultCacheCompute.code-snippets`
- `znuny.StatsObject.StatsResultCacheGet.code-snippets`
- `znuny.StatsObject.StatsRun.code-snippets`
- `znuny.StatsObject.StatsUninstall.code-snippets`
- `znuny.StatsObject.StringAndTimestamp2Filename.code-snippets`
- `znuny.StdAttachmentObject.StdAttachmentList.code-snippets`
- `znuny.SupportDataCollectorObject.Collect.code-snippets`
- `znuny.SysConfigObject.ConfigurationDeploy.code-snippets`
- `znuny.SysConfigObject.ConfigurationNavigationTree.code-snippets`
- `znuny.SysConfigObject.SettingAddItem.code-snippets`
- `znuny.SysConfigObject.SettingEffectiveValueCheck.code-snippets`
- `znuny.SysConfigObject.SettingEffectiveValueGet.code-snippets`
- `znuny.SysConfigObject.SettingReset.code-snippets`
- `znuny.SysConfigObject.SettingUpdate.code-snippets`
- `znuny.SystemDataObject.SystemDataDelete.code-snippets`
- `znuny.SystemDataObject.SystemDataGet.code-snippets`
- `znuny.SystemDataObject.SystemDataUpdate.code-snippets`
- `znuny.TemplateGeneratorObject.GenericAgentArticle.code-snippets`
- `znuny.TemplateGeneratorObject.Sender.code-snippets`
- `znuny.TicketAttributeRelationsObject.GetTicketAttributeRelations.code-snippets`
- `znuny.TypeObject.NameExistsCheck.code-snippets`
- `znuny.ObjectManager.PostMasterObject.code-snippets`

## [1.1.2]

### Snippets

#### Updated Snippets

- `znuny.ArticleObject.ArticleSearchIndexSQLJoin.code-snippets`
- `znuny.ArticleObject.ArticleSearchIndexSQLJoinNeeded.code-snippets`
- `znuny.ArticleObject.ArticleSearchIndexWhereCondition.code-snippets`
- `znuny.BackendObject.EditFieldRender.code-snippets`
- `znuny.CalendarObject.CalendarImport.code-snippets`
- `znuny.CalendarObject.TicketAppointmentProcessRule.code-snippets`
- `znuny.CustomerGroupObject.GroupCustomerAdd.code-snippets`
- `znuny.DBCRUDObject.DataAdd.code-snippets`
- `znuny.DynamicFieldValueObject.ValueSet.code-snippets`
- `znuny.ExcelObject.Array2Excel.code-snippets`
- `znuny.FormDraftObject.FormDraftAdd.code-snippets`
- `znuny.FormDraftObject.FormDraftUpdate.code-snippets`
- `znuny.GenericAgentObject.JobAdd.code-snippets`
- `znuny.HelperObject.FillTestEnvironment.code-snippets`
- `znuny.HelperObject.SetupTestEnvironment.code-snippets`
- `znuny.JWTObject.Decode.code-snippets`
- `znuny.NotificationEventObject.NotificationAdd.code-snippets`
- `znuny.NotificationEventObject.NotificationUpdate.code-snippets`
- `znuny.ParamObject.SaveFormDraft.code-snippets`
- `znuny.SchedulerDBObject.FutureTaskAdd.code-snippets`
- `znuny.SchedulerDBObject.RecurrentTaskExecute.code-snippets`
- `znuny.SchedulerDBObject.TaskAdd.code-snippets`
- `znuny.SchedulerObject.TaskAdd.code-snippets`
- `znuny.SeleniumObject.InputFieldIDMapping.code-snippets`
- `znuny.SysConfigObject.SettingAddItem.code-snippets`
- `znuny.SysConfigObject.SettingsSet.code-snippets`
- `znuny.SysConfigObject.SettingsUpdatedList.code-snippets`
- `znuny.TransitionObject.TransitionCheck.code-snippets`
- `znuny.UnitTestWebserviceObject.Mock.code-snippets`
- `znuny.UnitTestWebserviceObject.Process.code-snippets`
- `znuny.WebserviceHistoryObject.WebserviceHistoryAdd.code-snippets`

## [1.1.1]

Added missing glob node_module in package.json and vsix file.

## [1.1.0]

### AddFolderToWorkspace

This Function provides a searchable list of folders (Workspaces) that can be added to the current VSC Workspace. All configured folders will be displayed.

**Shortcut:** ```strg + alt + z, p``` \
**Command:**  ```Znuny: Add Folder to Workspace.```

### Customizer

This function fetches Znuny files from GitHub and adds origin to header.

**Shortcut:** ```strg + alt + z, c``` \
**Command:**  ```Znuny: Fetch Znuny files from GitHub.```

### GenerateFilelist

Inserts the SOPM Filelist content containing all files of a selectable project.
The following file types will be added: `pm | tt | t | xml | js | html.tmpl`

**Shortcut:** ```strg + alt + z, f``` \
**Command:**  ```Znuny: Insert Filelist to SOPM.```

### ObjectDependencies

This function inserts the `@ObjectDependencies` array by parsing the file content. Only regular used OM (ObjectManager) calls are supported.

**Shortcut:** ```strg + alt + z, d``` \
**Command:**  ```Znuny: Insert @ObjectDependencies.```

### QuoteWithMarker

This function quotes the selected area and adds a custom marker to it.

`QuoteWithMarker` can be very useful especially for custom files `Custom/**`.

**Shortcut:** ```strg + alt + z, q``` \
**Command:**  ```Znuny: Quote with Marker.```

## [1.0.5]

### Snippets

#### Added Snippets

- `znuny.ActivityObject.Add.code-snippets`
- `znuny.ActivityObject.DataAdd.code-snippets`
- `znuny.ActivityObject.DataDelete.code-snippets`
- `znuny.ActivityObject.DataGet.code-snippets`
- `znuny.ActivityObject.DataListGet.code-snippets`
- `znuny.ActivityObject.DataSearch.code-snippets`
- `znuny.ActivityObject.DataUpdate.code-snippets`
- `znuny.ActivityObject.Get.code-snippets`
- `znuny.ActivityObject.GetLink.code-snippets`
- `znuny.ActivityObject.InitConfig.code-snippets`
- `znuny.ActivityObject.ListGet.code-snippets`
- `znuny.LayoutObject.CleanUpCSSSelector.code-snippets`
- `znuny.LayoutObject.ColorPicker.code-snippets`
- `znuny.LayoutObject.ConvertToCSS.code-snippets`
- `znuny.LayoutObject.CreateDynamicCSS.code-snippets`
- `znuny.LayoutObject.LoaderCreateDynamicCSS.code-snippets`

#### Updated Snippets

- `znuny.ArticleObject.ArticleSearchIndexRebuildFlagSet`
- `znuny.ArticleObject.ArticleSearchIndexSQLJoin.code-snippets`
- `znuny.ArticleObject.ArticleSearchIndexSQLJoinNeeded.code-snippets`
- `znuny.ArticleObject.ArticleSearchIndexWhereCondition.code-snippets`
- `znuny.BackendObject.EditFieldRender`
- `znuny.BackendObject.EditFieldValueGet`
- `znuny.BackendObject.EditFieldValueGet`
- `znuny.CommunicationLogObject.ObjectLog`
- `znuny.CommunicationLogObject.ObjectLogStop`
- `znuny.CustomerUserObject.CustomerUserUpdate`
- `znuny.DBCRUDObject.DataUpdate.code-snippets`
- `znuny.HelperObject.ProvideTestDatabase.code-snippets`
- `znuny.PriorityObject.PriorityAdd`
- `znuny.PriorityObject.PriorityUpdate`
- `znuny.SeleniumObject.GetSeleniumHome`
- `znuny.StateObject.StateAdd`
- `znuny.StateObject.StateUpdate`

## [1.0.4]

### Snippets

#### Added Snippets

- `znuny.UtilObject.IsITSMIncidentProblemManagementInstalled.code-snippets`

#### Updated Snippets

- `znuny.ArticleObject.ArticleSearchIndexRebuildFlagSet.code-snippets`
- `znuny.BackendObject.EditFieldRender.code-snippets`
- `znuny.BackendObject.EditFieldValueGet.code-snippets`
- `znuny.CommunicationLogObject.ObjectLog.code-snippets`
- `znuny.CommunicationLogObject.ObjectLogStop.code-snippets`
- `znuny.CustomerUserObject.CustomerUserUpdate.code-snippets`
- `znuny.DBObject.QueryCondition.code-snippets`
- `znuny.DebugLogObject.LogAdd.code-snippets`
- `znuny.GenericAgentObject.JobRun.code-snippets`
- `znuny.HelperObject.TestUserCreate.code-snippets`
- `znuny.LinkObject.ObjectSearch.code-snippets`
- `znuny.LoaderObject.MinifyFiles.code-snippets`
- `znuny.MailQueueObject.List.code-snippets`
- `znuny.MainObject.FileDelete.code-snippets`
- `znuny.Module.AgentTicketNoteToLinkedTicket.code-snippets`
- `znuny.PDFObject.HLine.code-snippets`
- `znuny.PDFObject.Image.code-snippets`
- `znuny.PackageObject.PackageBuild.code-snippets`
- `znuny.ParamObject.SaveFormDraft.code-snippets`
- `znuny.QueueObject.QueueUpdate.code-snippets`
- `znuny.SeleniumObject.WaitFor.code-snippets`
- `znuny.SysConfigObject.ConfigurationSearch.code-snippets`
- `znuny.SysConfigObject.SettingEffectiveValueCheck.code-snippets`
- `znuny.SystemMaintenanceObject.SystemMaintenanceAdd.code-snippets`
- `znuny.TemplateGeneratorObject.Attributes.code-snippets`
- `znuny.TemplateGeneratorObject.Template.code-snippets`
- `znuny.TicketObject.TicketAcl.code-snippets`
- `znuny.UnitTestObject.Run.code-snippets`
- `znuny.VirtualFSObject.Write.code-snippets`
- `znuny.WebserviceHistoryObject.WebserviceHistoryUpdate.code-snippets`

## [1.0.3]

### ⭐ StatusBar

- The status bar gets an additional **Znuny** item and the entire status bar is displayed in the Znuny color ![#ff9b00](https://placehold.co/15x15/ff9b00/ff9b00.png) if the active file is a "Znuny file".
  - If the active file belongs to a **Znuny framework** ("Znuny file") in the workspace, the **product name** and **version** are displayed from the RELEASE file.
  - If the active file belongs to a **Znuny package** ("Znuny file") in the workspace, the **vendor** and the largest **framework version** are displayed from the SOPM file.

### Snippets

- Fixed - Broken snippet - Functions/TicketObject/znuny.TicketObject.TicketSearch.code-snippets [#2](https://github.com/dennykorsukewitz/VSCode-Znuny/issues/2)
- Added missing DiffObject snippet for 6.0
- Tidied Snippets

## [1.0.2]

### Snippets

- Escaped '\$' to use scalarref (scalar reference)
- Escaped '\@' to use arrayref (array reference)
- Escaped '\%' to use hashref (hash reference)
- Escaped '\&' to use coderef (code reference)
- Escaped '\*' to use globref (glob reference)
- Applied new escaped strings to snippets

## [1.0.1]

### Snippets

- Fixed syntax typos
- Tidied snippet filenames for better readability
- Added DynamicFields
  - ⭐ WebserviceText
  - ⭐ WebserviceMultiselect
  - ⭐ WebserviceDropdown
- Added SeleniumObject
  - ⭐ VerifiedClick
  - ⭐ VerifiedSubmit

## [1.0.0]

### Initial release of Znuny Snippets extension

- CodePolicy
- ConfigXML
- Customizing
- Debugging
- DynamicFields
- Functions
- GitLab
- Language
- Licensing
- Modules
- Needed
- ObjectManager
- Perl
- POD
- Selenium
- VariableCheck
