const express = require ('express');
const expressLayouts = require ('express-ejs-layouts');

const Chuck = require ('chucknorris-io');

const client = new Chuck();

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// app.set('views');

//bodyParser stuff
const bodyParser=require('body-parser');
app.use (bodyParser.urlencoded({extended:true}));

app.use(expressLayouts);

// app.set('layout');

app.get('/',(req, res, next)=>{
  res.render('index.ejs');
});


app.get ('/random',(req,res,next)=>{

  client.getRandomJoke().then((jokeInfo)=>{
    console.log("jokeInfo.value:", jokeInfo.value);
    console.log("JokeInfo;", jokeInfo);
    const randomJoke = jokeInfo.value;

    res.render('random.ejs',{
      randomJoke : randomJoke

    });
  });
});

app.get('/categories',(req, res, next)=>{
  client.getJokeCategories().then((response)=>{
    const category = response;
    // const cow = req.query.cat;
    console.log("JOKEINFO:",response);
    res.render('category.ejs',{
      showCategory : category
    });
  });
});

app.get('/jokeCategoryPage', (req, res, next)=>{
  const theClick = req.query.cat;
  client.getRandomJoke(theClick).then((getInfo)=>{
    let cow1 = getInfo.value;
    console.log("GETINFO:", getInfo);

    res.render('joke-by-category.ejs',{
      theJoke : cow1 ,
      clickedLinked : theClick,
    });
});
});
//displays search-form.ejs when go to /search page in browser
    app.get('/search', (req, res, next)=>{

        res.render('search-form.ejs');
});
//Used info from search-form.ejs method=post and action=/search so used that in route below since must match!
app.get('/search-result', (req, res, next)=>{
  //name= searchTerm on search-form.ejs so used below.
const keyWord = req.query.searchTerm;

client.search(keyWord).then((jokeObject)=>{
//jokeObject.items returns all of the 14 joke objects in the array.
const jokeArray = jokeObject.items;
console.log('RESPONSE:', jokeObject);

    res.render('search.ejs',{
jokeArray: jokeArray,
keyWord: keyWord
    });
});
});

app.listen(3000);
