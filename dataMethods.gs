//===========================MISC FUNCTIONS===================================//
function data() {
  let fileId = JSON.parse(PropertiesService.getScriptProperties()
    .getProperty("files"));
  //===========================IMPORT FORM RESPONSES===================================//

  // Form Responses
  // const form = formid

  const responses = form.getResponses()
  const responseEmail = responses[responses.length - 1].getRespondentEmail()
  const lastResponses = responses[responses.length - 1].getItemResponses();
  const responseList = []

  // Last Responses
  for (let response = 0; response < lastResponses.length; response++) {
    let itemResponse = lastResponses[response];
    responseList.push(itemResponse.getResponse())
  }

  // Import File Responses
  const cbCol = responseList[5] - 1
  const assetCol = responseList[6] - 1
  const serialCol = responseList[7] - 1

  //===========================IMPORT CHROMEBOOK DATA===================================//
  const cbModel = "C202"
  const cbS = "C202S"

  const chromebookData = SpreadsheetApp.openById(fileId);
  const cbSheet = chromebookData.getActiveSheet();
  const cbData = cbSheet.getDataRange();




  //===========================DISPOSAL INFO===================================//
  // const disposal = Drive.Files.get("<disposalid>", { "supportsAllDrives": true }).id;
  const disposalId = DriveApp.getFileById(disposal)

  // Making Disposal Template Copy

  const disposalCopy = disposalId.makeCopy()
  disposalCopy.setName(responseList[0])



  // Rename Copied Disposal Spreadsheet
  const id = disposalCopy.getId()
  const openDisposal = SpreadsheetApp.openById(id);





  //===========================CREATE ARRAY OF IMPORTED DATA===================================//

  // Get imported file values

  const values = cbData.getValues();
  const arr = []

  values.forEach((row) => {
    if (row[assetCol] === undefined || row[assetCol] === "") {
      row[assetCol] === "None"
      arr.push([row[assetCol], row[cbCol], row[serialCol]])

    } else {
      arr.push([row[assetCol], row[cbCol], row[serialCol]])

    }

  })


  //===========================DIVIDE UP IMPORTED DATA ARRAY===================================//

  const filteredArr = arr.filter((item) => {
    return (item[1].includes(`${cbModel}` || item[1].includes(`${cbS}`)))
  })



  // Array.prototype.chunk = function (chunkLength) {

  //   let result = []
  //   let sheetLength = Math.floor(this.length / chunkLength);
  //   let remainder = this.length % chunkLength;


  //   // If array is divisible by chunklength
  //   if (this.length / chunkLength === 0) {
  //     for (sheet = 0; sheet < sheetLength; sheet++) {
  //       result.push(this.splice(0, chunkLength))
  //     }
  //   }
  //   // If array is not divible by chunklength
  //   else if (this.length / chunkLength !== 0) {
  //     for (sheet = 0; sheet < sheetLength; sheet++) {
  //       result.push(this.splice(0, chunkLength))
  //     }
  //     result.push(this.splice(0, remainder))
  //   }

  //   // Else clause
  //   else {
  //     return "There is an error."
  //   }

  //   return result
  // }

  Array.prototype.chunk = function (chunkLength) {

    let result = []
    let sheetLength = Math.floor(this.length / chunkLength);
    console.log(`sheetlength: ${sheetLength}`)
    let remainder = this.length % chunkLength;
    console.log(`remainder: ${remainder}`)
    for (sheet = 0; sheet < sheetLength; sheet++) {
      result.push(this.splice(0, chunkLength))
    }
    if (remainder !== 0) {
      result.push(this.splice(0, remainder))
    }
    return result
  }


  const disposalArray = filteredArr.chunk(20)

  console.log(disposalArray.length)


  //===========================CREATE SHEETS IN COPIED DISPOSAL FORM AND SET DATA===================================//


  // Create all Sheets
  const createSheets = () => {
    // Disposal Fields
    openDisposal.getRange(`'Page 1'!C3`).setValue(responseList[1]);
    openDisposal.getRange(`'Page 1'!D3:E3`).setValue(responseList[2]);
    openDisposal.getRange(`'Page 1'!J3:K3`).setValue(responseList[3]);
    openDisposal.getRange(`'Page 1'!D4:K4`).setValue(responseList[4]);
    let sheetLength = disposalArray.length;

    openDisposal.getRange(`'Page 1'!G3`).setValue(`1 of ${sheetLength}`);

    let sIdx = 1
    while (sIdx != sheetLength) {
      let sheet = openDisposal.getSheetByName("Page 1").copyTo(openDisposal).setName(`Page ${sIdx + 1}`)
      sheet.getRange('G3').setValue(`${sIdx + 1} of ${sheetLength}`);
      sheet.getRange(`'Page ${sIdx}'!B7:D26`).setValues(disposalArray[sIdx - 1])
      sIdx++
    }
    
    let sheet = openDisposal.getSheetByName(`Page ${sheetLength}`).activate()
    
    sheet.getRange('G3').setValue(`${sheetLength} of ${sheetLength}`);
    sheet.getRange(`B7:D${disposalArray[disposalArray.length - 1].length + 6}`).setValues(disposalArray[disposalArray.length - 1])
    if (disposalArray[disposalArray.length - 1].length !== 20) {
      sheet.getRange(`B${disposalArray[disposalArray.length - 1].length + 7}:H26`).clearContent()
    }
  }
  createSheets()
  let url = disposalCopy.getUrl()
  triggerEmail(url, responseEmail)
  disposalCopy.setOwner(responseEmail)
}

//===========================FORM TRIGGER FOR SENDING EMAIL OF CREATED FILE===================================//


// function triggerData() {
//   ScriptApp.newTrigger('data')
//     .forForm('1m1phabPdBsndIyT8o7QAOlj8y0RnoJOyskouvyDGpTM')
//     .onFormSubmit()
//     .create()
// }


function triggerEmail(disposalLink, email) {
  let recipient = email
  let subject = "DO NOT REPLY - Disposal Creation Notification"
  let body = `Here is your disposal creation link: ${disposalLink}`
  GmailApp.sendEmail(recipient, subject, body)
}


