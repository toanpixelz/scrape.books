node-web-scraper
================
Simple web scraper to get a movie name, release year and community rating from http://books.toscrape.com/.
To run this example use the following commands:

please to do steps belows:
1. Go to mysql to create db

    => Create database scrape

    => update file config db with usser, account, password to connect db [scrape].

    file config.json in folder [configdb].
2. cd to folder of project 
    => npm install
    => npm start
3. go to browser of internet (use chrome, ie, firefox, etc ..) typing
   => http://localhost:3000/crawbooks/:page  to craw books of http://books.toscrape.com/ with page number is page.
   ex: http://localhost:3000/crawbooks/1
4. to view data which you've just craw on step 3, goto brower and typing
  => http://localhost:3000/viewBooks/:page to show these books with page number is page.
   ex: http://localhost:3000/viewBooks/1



Documents references
1. https://scotch.io/tutorials/scraping-the-web-with-node-js
2. https://medium.com/@designman/building-a-performant-web-scraper-in-node-js-5f4449674163
3. https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
4. https://scotch.io/tutorials/use-ejs-to-template-your-node-application
5. https://www.codementor.io/naeemshaikh27/node-with-express-and-ejs-du107lnk6
by toanpk