# Changelog

All notable changes to the "Znuny" extension will be documented in this file.

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
