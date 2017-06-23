const express = require ('express');
const expressLayouts = require ('express-ejs-layouts');

const Chuck = require ('chucknorris-io');

const client = new Chuck();

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// app.set('views');


app.use(expressLayouts);

// app.set('layout');

app.get('/',(req, res, next)=>{
  res.render('index.ejs');
});


app.get ('/random',(req,res,next)=>{

  client.getRandomJoke().then((jokeInfo)=>{
    console.log(jokeInfo.value);
    console.log(jokeInfo);
    const randomJoke = jokeInfo.value;

    res.render('random.ejs',{
      showRandomJoke : randomJoke

    });
  });
});

app.get('/categories',(req, res, next)=>{
  client.getJokeCategories().then((jokeInfo)=>{
    const category = jokeInfo;
    // const cow = req.query.cat;
    console.log(jokeInfo);
    res.render('category.ejs',{
      showCategory : category
    });
  });
});

app.get('/jokeCategoryPage', (req, res, next)=>{
  const theClick = req.query.cat;
  client.getRandomJoke(theClick).then((getInfo)=>{
    let cow1 = getInfo.value;
    res.render('joke-by-category.ejs',{
      theJoke : cow1 ,
      clickedLinked : theClick,
    });
  });
});

app.listen(3000);
