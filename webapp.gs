// ################################## Web App page ##################################
 
/**
* Initialises the HTML webapp services providing a title and metatags.
* -Enabled for Template so I can insert: <?!= include("JS"); ?>
*
* return {object} Html Serive object that generates the webapp.
*/
function doGet() {
  let html = HtmlService
    .createTemplateFromFile("FilePicker")
    .evaluate()
    .setTitle("Disposal Process")
  return html;
 
};
 
/**
* Imports or includes other files for the main html document.
*
*
*/
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
};
 
 
 
 
 
// #### Server - client connectors. ####
 
/**
* An object of picker configurations.
* Called when picker is initialised.
*
* @return {ojbect} configurations for auth
*/
function pickerConfig(){
  // DriveApp.getFiles()
  DriveApp.getRootFolder() // Try this
  return {
    oauthToken: ScriptApp.getOAuthToken(),
    // Add developer key from Google Cloud Project > APIs and services > Credentials
    // developerKey: "<developerkey"
    
  }
};
 
 
 
/**
* Retrieves a list of files and folders from the File Picker popup.
* Stores the files in the user's Properties Service.
* @example
* [{id, name, url},{id, name, url},...]
*
* @param {array} fileId - Array of file/folder objects.
*/
function storeDriveSelections(fileId){
  
  // Append current list of files and folders.
  let storedDocs = JSON.parse(PropertiesService.getScriptProperties()
    .getProperty("files"));
 
  // let updateArray = () => {
  //   //Combine current list with incoming and remove duplicates.
  //   return [...new Map([fileId,...storedDocs].map(item => [item.id, item])).values()]
 
  // };
  
  // // IF not stored ids just input the fileId otherwise add both to array.
  // let docsAll = (storedDocs === null)? fileId : updateArray();
 if (storedDocs === null) {
  //Add storedDocs to selected docs;
  PropertiesService.getScriptProperties()
    .setProperty("files", JSON.stringify(fileId))
 
  // Allows us to only keep these properties when using is working on saved properties.
  PropertiesService.getScriptProperties()
    .setProperty("filePick",JSON.stringify(true));
 }
  

};



 
 
 
/**
* Removes "files" data from Property service.
*
* Called when:
*   1. Card is refreshed and is not part of the file selection process.
*   2. When the "CLEAR ALL" button is selected.
*/
function clearFilesFromPropServ(){
 
  // Allows us to only keep these properties when using is working on saved properties.
  PropertiesService.getScriptProperties()
    .deleteProperty("files");
    
};
