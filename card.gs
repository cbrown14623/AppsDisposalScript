
// ################################## Card builder page ##################################

/**
 * ## Initialises the card service homepage. ##
 * This is referenced in teh appsscript.json
 * @param {object} e - details of environment and user activating the GWAO (Google Workspace Add-on)
 * @return build homepage card.
 */
function onhomepage(e) {

  return createSelectionCard(e);
};

/**
 * ## Initial Card Builder ##
 * Main function to generate the initial card on load.
 * @param {Object} e : Event object.
 * @return {CardService.Card} The card to show the user.
 */
function createSelectionCard(e) {

  const builder = CardService.newCardBuilder();

  builder.addSection(buildSection())
  return builder.build()
};

function rebuildWithForm() {

  PropertiesService.getScriptProperties().setProperty("filePick", JSON.stringify(false));

  const builder = CardService.newCardBuilder();

  builder.addSection(formSection())

  return CardService.newNavigation().updateCard(builder.build())
}

function rebuildNew() {

  const builder = CardService.newCardBuilder();

  builder.addSection(buildSection())
  
  return CardService.newNavigation().updateCard(builder.build())
}

/**
 * ## Rebuild Card Builder ##
 * This is activated after first initialisation of the homepage. 
 * 
 * Main function to generate the layout of the homepage card when button clicked. 
 * @param {Object} e : Event object.
 * @return {CardService.Card} The card to show the user.
 */
function rebuildSelectionCard(e) {


  PropertiesService.getScriptProperties().setProperty("filePick", JSON.stringify(false));

  const builder = CardService.newCardBuilder();

  builder.addSection(buildSection())

  return CardService.newNavigation().updateCard(builder.build())
}

function rebuildWithSuccess() {

  const builder = CardService.newCardBuilder();

  builder.addSection(successSection())

  return CardService.newNavigation().updateCard(builder.build())
}

/**
 * Builds a section for the card service card. 
 * 
 * @return {CardService.CardSection}
 */
function buildSection() {

  // ## Widgets ##
  

  let buttonPickerWidget = () => {
    let button = CardService.newTextButton()
      .setText("Select Spreadsheet")
      .setOpenLink(CardService.newOpenLink()
        //Change this to the deployed URL once you are ready to deploy it. (e.g. ending in '/exec')
        .setUrl("https://script.google.com/a/macros/rrps.net/s/AKfycbx5OCjnKRYo-KlPIX61hvQ9Nh7W1Z6XC8Z2hzP4nB6njyrYglWa1wC4HyHtmtNIKQYV/exec")
        //Create a window dialog containing the Google Picker.
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        //Reload the page once selections have been made. 
        .setOnClose(CardService.OnClose.RELOAD_ADD_ON))

    return button;
  }
   let textWidget = () => {
    return CardService
      .newTextParagraph()
      .setText("<i>If you know how to use this app click Select Spreadsheet, otherwise read below.</i>")
  }
  let textWidgetTwo = () => {
    return CardService
      .newTextParagraph()
      .setText("<b><u><font color='#F6412D'>Step One:</font></u></b> Select an Import file. As an example, an imported file from Follett must contain a column of chromebook model data, asset tag data, and serial data. It doesn't matter if the file has headers or empty cells.")
  }
  let textWidgetThree = () => {
    return CardService
      .newTextParagraph()
      .setText("<b><u><font color='#FF9800'>Step Two:</font></u></b> Fill Out the Form")
  }

  let textWidgetFour = () => {
    return CardService
      .newTextParagraph()
      .setText("<b><u><font color='#0000FF'>Begin Process</font></u></b>")
  }

  let textWidgetFive = () => {
    return CardService
      .newTextParagraph()
      .setText("Select a Chromebook import file.")
  }

  // Must be done on a rebuild. 
  let buttonFileRemoveWidget = () => {
    let button = CardService.newTextButton()
      .setText("Clear Selection")
      .setOnClickAction(CardService.newAction().setFunctionName("rebuildSelectionCard"))
    return button
  }

  // Must be done on a rebuild. 
  let buttonFileNextWidget = () => {
    let button = CardService.newTextButton()
      .setText("Next Step")
      .setOnClickAction(CardService.newAction().setFunctionName("rebuildWithForm"))
    return button
  }


  //Creates the set of buttons
  const buttonSet = () => {
    let bSet = CardService.newButtonSet()
      .addButton(buttonPickerWidget())
      .addButton(buttonFileRemoveWidget())
      .addButton(buttonFileNextWidget())


    return bSet;
  };
  // ## End Widgets ##


  //Create the details section.
  const detailsSection = CardService.newCardSection()
    .setHeader("<b>Welcome to the Disposal App</b>")
    .addWidget(textWidget())
    .addWidget(textWidgetTwo())
    .addWidget(textWidgetThree())
    .addWidget(CardService.newDivider())
    .addWidget(textWidgetFour())
    .addWidget(textWidgetFive())
    .addWidget(getFilesAndFoldersDataWidget())
    .addWidget(CardService.newDivider())
    .addWidget(buttonSet())

  return detailsSection;
};

/**
 * Builds a section for the card service card. 
 * 
 * @return {CardService.CardSection}
 */
function formSection() {

  // ## Widgets ##

  let formWidget = () => {
    let button = CardService.newTextButton()
      .setText("Fill Out Form")
      .setOpenLink(CardService.newOpenLink()
        //Change this to the deployed URL once you are ready to deploy it. (e.g. ending in '/exec')
        .setUrl("https://docs.google.com/forms/d/e/1FAIpQLSf7S0aAZGarynN0av2-xWO_B1L4owrCTNJSsist3kx951Colg/viewform?usp=sf_link")
        //Create a window dialog containing the Google Picker.
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        //Reload the page once selections have been made. 
        .setOnClose(CardService.OnClose.NOTHING))

    return button;
  }

  // Must be done on a rebuild. 
  let buttonFinishWidget = () => {
    
    let button = CardService.newTextButton()
      .setText("Next")
      .setOnClickAction(CardService.newAction().setFunctionName("rebuildWithSuccess"))
    return button
  }
  const buttonSet = () => {
    let bSet = CardService.newButtonSet()
      .addButton(buttonFinishWidget())

    return bSet;
  };

  //Create the details section.
  const detailsSection = CardService.newCardSection()
    .setHeader("Disposal Process: Part II")
    .addWidget(formWidget())
    .addWidget(buttonSet())

  return detailsSection;
};

function successSection() {

  // ## Widgets ##
 
  let successWidget = () => {
    let successText = CardService.newDecoratedText()
      .setIconUrl("https://drive.google.com/uc?id=1nbPREhtWptyZqotivoz3-ZKm-TRKezqK")
      .setText("Your disposal is now being created. You will be emailed a link with your disposal url shortly.")
      .setWrapText(true)
    return successText
  }

  //Create the details section.
  const detailsSection = CardService.newCardSection()
    .setHeader("Disposal Completed")
    .addWidget(successWidget())
  return detailsSection;
};



/**
 * Calls the stored files and folders if the file picker is selected
 * otherwise returns a request to select docs and removes files from Property Service.
 * 
 * Doc links are added with their title and url as a hyperlink in each page.
 * 
 * @return {CardService.TextParagraph} text widget string either request to select docs or a list of doc links.
 */
function getFilesAndFoldersDataWidget() {
  let filePick = JSON.parse(PropertiesService.getScriptProperties().getProperty("filePick"));
 
  let prop = PropertiesService.getScriptProperties().getProperty("files")
   console.log(filePick, prop)
  let paragraph = "";
  if (prop == null || !filePick) {

    paragraph = `<i>Please select your spreadsheet</i>`;

    clearFilesFromPropServ() // Ensures there are no files in the Properties Service;

  } else {


    paragraph += `<p>File Selected</p>`

  }

  PropertiesService.getScriptProperties().setProperty("filePick", JSON.stringify(false));
  return CardService.newTextParagraph()
    .setText(paragraph)
}



