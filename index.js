const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = require("./dbPool");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true})); 

// routes
app.get('/', (req, res) => {
  res.redirect('index');
});

app.get('/index', async function (req, res) {
  let sql = `SELECT * 
              FROM fe_comic_sites
              ORDER BY comicSiteName`;

  let rows = await executeSQL(sql);

  res.render('index', {"comicSites": rows});
});

app.get('/addComic', async function (req, res) {
  let sql = `SELECT comicSiteName, comicSiteId
              FROM fe_comic_sites
              ORDER BY comicSiteName`;
  let rows = await executeSQL(sql);
  
  res.render('addComic', {"websiteNames": rows});
})

// post form submissions
app.post('/addComic', async function (req, res) {
  let comicUrl = req.body.url;
  let comicTitle = req.body.title;
  let comicSiteId = req.body.comicSiteId;
  let comicPublishDate = req.body.publishDate;
  
  let sql = `INSERT INTO fe_comics
              (comicUrl, comicTitle, comicSiteId, comicDate)
              VALUES
              (?, ?, ?, ? )`;
  let params = [comicUrl, comicTitle, comicSiteId, comicPublishDate];
  let rows = await executeSQL(sql, params);
  res.redirect('addComic');
});

app.post('/displayComicsByBrand', async function (req, res) {
  let siteId = req.body.comicSiteId;

  let sql = `SELECT * 
              FROM fe_comics
              NATURAL JOIN fe_comic_sites
              WHERE comicSiteId = ?`;
  let params = [siteId];
  console.log(siteId);
  let rows = await executeSQL(sql, params);
  res.render('comicPage', {"comics":rows});
});

// local comic api
app.get("/api/comic/", async function (req, res) {
  let sql = `SELECT * 
              FROM fe_comics
              ORDER BY RAND() 
              LIMIT 1`;
  let rows = await executeSQL(sql);
  res.send(rows);
});

// functions
async function executeSQL(sql, params) {
  return new Promise (function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
        resolve(rows);
    });
  });
}// executeSQL

// start server
app.listen(3000, () => {
  console.log("Expresss server running...")
})