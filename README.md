# 134b-hw5  
https://cse134b-hw5-f0af8.firebaseapp.com  

*For the graders*  
*Part 1* - HTTP with Javascript:  
For GET and DELETE requests the only fields used will be the ID field. This is to show that in order to GET or DELETE a specific resource I only need the id of that resource.  
For POST and PUT requests all the fields will be used. Since we are either placing or replacing a resource, all the fields will be used in doing so.  

*Part 2* - Emergent Features:  
See Changelog.md.  
Many of the HTML/CSS files have been minified and are being used in "production" in '134b-hw5/public/' directory. To find the unminified files you will find them in the '134b-hw5/' directory with the format file_big.extension For example: '134b-hw5/public/404.html' has a corresponding '134b-hw5/404_big.html'  

*Extra Credit Part 3* - CRUD Application:  
See CRUD.md.  
You can view the blog posts in 'index.html'. These are read from the Firebase Database.  
To edit/add/delete blogs you will need to navigate to 'blogedit.html'. You need authorization to access 'blogedit.html'. If you are not authorized, you will be shown 'Acess Denied' and you will be navigated back to 'login.html'. If you are authorized, a list of the blogs from the Firebase Database will be shown on the screen and you will be able to edit/add/delete them. If you click the sign out button your access to 'blogedit.html' will be denied and you will be navigated back to 'login.html'.  
'login.html' is the log-in page. At the time of writing this you are able to create an account and gain access to 'blogedit.html', but you will be unable to edit/add/delete blogs. This has been done through the Firebase database security rules to prevent anyone from creating an account and being able to edit the blogs. I have authorized an account for you that has the ability to edit/add/delete blogs.  
The credentials for the account with write access are:  
Email: grader@grader.com  
Pass: caSbaUBQA#  
Changes you make in 'blogedit.html' will be reflected there and in the Blog section in 'index.html'.  
  
Thank you for reading.
