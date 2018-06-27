const express = require('express'),
    app = express();
var request = require('request');
var cheerio = require('cheerio');
var urlBase = 'http://books.toscrape.com/';
var models = require("./models");

// Create database [scrape] and sync db. (generate table book for db)
models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(() => {
    models.sequelize.sync({ force: false }).then(() => {
        console.log('sync db success');
    });
});

// set the view engine to ejs
app.set('view engine', 'ejs');
//   http://books.toscrape.com/catalogue/page-2.html => for this page is 2

//   API to store books which be get from page http://books.toscrape.com with paging is (id)
app.get('/crawbooks/:page', function (req, res) {
    let page = parseInt(req.params.page);
    // step 1. Use this website for scraping http://books.toscrape.com/ 
    // step 2. Choose a page number to crawl.
    let urlScrape = `${urlBase}catalogue/page-${page}.html`
    request(urlScrape, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var parsedResults = [];

            // step 3. You must crawl all item in the page include (from step 3)
            $('article.product_pod').each(function (i, element) {
                // Select the previous element
                let rating = $(this).children('p').attr('class');
                let title = $(this).children('h3').children().attr('title');
                let price = $(this).children('div.product_price').children('p.price_color').text();
                let availability = $(this).children('div.product_price').children('p.instock.availability').text().trim();
                let srcImage = urlBase + $(this).children('div.image_container').children().children('img').attr('src');
                let entity = { name: title, price: price, availability: availability, srcImage: srcImage, rating: rating, source: urlBase, page: page };
                parsedResults.push(entity);
            });
            models.book.bulkCreate(parsedResults).then(result => {
                res.json({ message: `You have just craw data on page - ${urlScrape}`, success: 1 })
            }).catch(ex => {
                console.log(ex.stack)
                res.json({ message: `Craw data fail on page - ${urlScrape}`, success: 0, error: ex.stack })
            });
        }
    });
})

// API for show books with page number.
// step 4. Display list data you crawled (like the original web page) - you must use MySQL for store data. 
// (Simple UI is enough, but Great UI is better ☺ )
app.get('/viewBooks/:page', function (req, res) {
    let page = req.params.page ? parseInt(req.params.page) : 1;
    // let urlScrape = `${urlBase}catalogue/page-${page}.html`
    models.book.findAll({ where: { page: page } }).then(books => {
        res.render('index', { books: books });
    }).catch(ex => {
        console.log(ex.stack)
        res.json({ message: `View data fail!`, success: 0, error: ex.stack })
    });
});
app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;