## Final project of CS50 Web Programming with Python and JavaScript
# Rockermind

Rockermind is a website where if you are a Fan, you can meet new bands, their music and the places where they play. You can follow them to see their posts and react to them, see their upcoming concerts and listen to some of their music. If you are a Rocker, you can make post, see your popularity statistics and accept concerts. On the other hand, if you are a Place Owner, you can create new events and hire bands to play in them.

# Why do I think Rockermind is enough to pass the course?

I tried to use as many things from the course as I could. And in order to achieve a project that is sufficiently different from the others, specifically the social network project, I have to say that complexity and approach of Rockermind is not in posts management. Instead, it is in the managements of roles by user (the interaction and relationships between their and their attributes), this involves a large and related Django model between its classes, it also involves a new type of user that inherits from DjangoUser and from which the other roles depend.

Another important aspect was the research in external sources different from the course notes, like the capture, storage, transmission and visualization of the images. The sending of POST request using FETCH function in JavaScript and solving the csrftoken trouble. Also, there is a treatment of the URL of the song, to allow the user to copy and paste the Youtube link from the navigation bar and a use of PopUp menus in order to provide a more agile interaction with the WebSite.

Finally I think that the site is aesthetically pleasing, and this was hard. Also, there is interesting uses of JavaScript like the dynamic sign up form and the progressive and random display of bands for Place Owners (this involves a communication between front-end and back-end to avoid sending bands that were already shown, but keeping the randomness of them).

Besides, I have to say that when I did the penultimate project, it was before July, so I did the Pizza project. It is not excuse to do a Social Network in itself, but I want to emphasize that the only similarity between these two projects is the posts and the reacts. However, I tried to innovate these conflicting aspects, with the use of images in posts and the distinction of reactions between likes and loves. So, the events creation, notifications, user attributes and the theme of the WebSite in general is completely original.

> I tried to use as many things from the course as I could...

In summary, the complexity of Rockermind is in the information of roles by user, the interaction between them (including images and dependencies between their actions), in addition to the aesthetic aspects which provide a pleasant interaction with the WebSite.

# About the files

There is a short description of all files I did in the project. 
| File | Description |
| ------ | ------ |
| band_logo | Place to save DjangoModel images. |
| band_members | Place to save DjangoModel images. |
| places | Place to save DjangoModel images. |
| posts | Place to save DjangoModel images. |
| static/rockermind | Here is the images and SCSS and JavaScript files. |
| fan.js | Interaction in the fan main site. Display post and controles the search band function. |
| owner.js | Interaction in the rocker main site. Display bands in a random order, controles the notification alert and search band function. |
| owner_events.js | Check the event form. |
| rocker.js | Interaction in the rocker main site. Display post and controles the notification alert. |
| rocker_events.js | Show the events and controles the accept event function. |
| welcome.js | Controles the dynamic sign up form and random band function. |
| layout.scss | Style guide for the site in general. |
| post.scss | Style guide for posts. |
| templates/rockermind | Here is the HTML files of the site. |
| band_page.html | Page to see the band profile, it adapts to the user who sees it. |
| fan.html | Page that inherits from fan_template.html and contains the main view of a fan after login. |
| fan_events.html | Page that inherits from fan_template.html and contains the events view for fans. |
| fan_profile.html | Page that inherits from fan_template.html and contains the profile view for fans. |
| fan_template.html | It is the template for a fan page and contains the correct functions in the top bar. |
| index.html | Page that inherits from welcome_template.html. It is the first page you see when you visit Rockermind. |
| index_template.html | It is the template for any other page in the site. |
| motivation.html | Page that inherits from index_template.html. It is the personal motivation for the site and it's a HTML file as well (it does not have anything of Django). |
| owner.html | Page that inherits from owner_template.html and contains the main view of an owner after login. |
| owner_events.html | Page that inherits from owner_template.html and contains the events view for owner. |
| owner_profile.html | Page that inherits from owner_template.html and contains the owner view for fans. |
| owner_template.html | It is the template for an owner page and contains the correct functions in the top bar. |
| rocker.html | Page that inherits from rocker_template.html and contains the main view of a rocker after login. |
| rocker_events.html | Page that inherits from rocker_template.html and contains the events view for rocker. |
| rocker_profile.html | Page that inherits from rocker_template.html and contains the profile view for rocker. |
| rocker_template.html | It is the template for a rocker page and contains the correct functions in the top bar. |
| sign_up.html | It is the view what you see when you try to register yourself on the site. |
| welcome_template.html | It is the template for a page in the welcome view and contains the correct functions in the top bar. |
