Carefully write-up the "cost" in time and byte count as well as any other pros and cons you encounter to receive full credit.

Status report 1:
I have been working on making the log in functionality working with Firebase for about 2 hours and have already have the log in functionality working. Next step setting up and connecting the database.

Status report 2:
After many hours I have a working log in page that will move you to and from blog edit page. Next step, set up and connect firebase.

Status report 3:
Able to read from the database and place blogposts into blogedit.html. For points, the next step is to add a blogs section on my website to place those blog posts.

Status report 4:
Able to add blog posts to index. Now can try to connect the edit and delete buttons.

Status report 5:
Styled blog posts. Going to try to implement edit and delete.

Status report 6:
Implemented edit and delete. Need to style blogedit.html, reminify index.html

The cost in time to make the CRUD blog implementation wasn't too much. Overall maybe around 10-12 hours. I tried to do it in increments, first making sure files were connected, components were connected and going from there. Luckily I was able to reuse and do minor changes to the crud assignment from last homework and Firebase had a premade log in UI that did a lot of the login work for me. The documentation for Firebase was pretty well made, I only really struggled understanding some parts but I was able to navigate through it. The most difficult part was figuring out how to move the user from one page to the next while keeping them signed in. Another difficult part was figuring out how to organize the code, how much I should put in separate files, and how separating it out would effect the functionality. With all the new javascript files and files in general, the resource size increased from 850ms to 1.2mb. What this cost us is the increase in page load to 1.7 seconds. Double what it was before, 847 ms. The DOMContentLoaded doubled, from 504ms to 1.7 mb. It costs us a total of 8 more requests. A big pro/win was Firebase's premade log-in ui. The ease of it being premade and following what it needed to work helped give me more time to focus on the more important parts of the assignment. A con, was having all these extra network requests and extra code essentially slowed my performance in half. I can imagine trying to add more functionality and using frameworks to fancy up my page and causing it to slow way down. A big pro is being able to use javascript to do all this functionality and not some intermediate language. With thise I was able to use my existing code.
