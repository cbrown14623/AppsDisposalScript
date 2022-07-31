# AppsDisposalScript
Google Script Disposal Automation Process

Automates our inventory disposal process by allowing bulk additions from a database file to our disposal Google Sheet Template using Google Apps Script. Instead of taking hours for one Technician to complete our disposal process, they can complete it in under 2 minutes. 

Created for my organization's IT Technicians to help them save time on our District's disposal process. Instead of using a scanner and scanning in one disposal item at a time with its serial number, asset tag, and description it allows the technicians to run this Google Workspace addon and create their disposal sheets in bulk from a database file. 

HOW THEY RUN THE PROGRAM
---------------------------------------------------------------------------------
  Open up any Google Sheet from your drive. 
  Click on the ‘Extensions’ Tab -> Addons -> Get Addons
  Click on the top left Hamburger Icon, then scroll down and click RRPS apps
  Install my application, accept permissions

    Note: It will only show up in Google Sheets on the right sidebar popout

  Read the instructions of the application once you click on the icon. 
  
  Make sure you move your imported sheet into the Apps Script Disposals Folder in Drive under “Shared with me”. 
  
  Then select your Follett or imported chromebook sheet using the google drive api picker I built.
    
    Note: make sure its converted to a google sheet 
  
  As you can tell, it doesn’t matter if you have headers or multiple columns… as long as you have an asset tags column, serial numbers column, and ANY chromebook models column. You don't have to parse 202s.
  Clear your selection if you selected the wrong file or click ‘Next Step’.
  Click ‘Fill Out Form’
  
   Fill out the form and click submit on the form. You can submit another response if you messed up your answers. 

    Note: if you don’t click submit, your sheet will not be built
   
  Finally click Next and your disposal will be built. You will receive an email with your drive file when it is completed and another email letting you know you are now the owner of the file. 
  
    Note: Right now, my app can create about 600 chromebooks in 55 seconds. So about 30 sheets / min. So you can get an idea of how long it will take for the number you have. 

