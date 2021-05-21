const { Router } = require('express'); 
const url = require('url');
const router = Router();

_ = require('underscore');

const movies = require('../sample.json'); 

router.get('/', (req, res) => {
  res.json(movies);
});

router.post('/', (req, res) => {
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    const id = movies.length + 1;
    const newMovie = {...req.body, id};
    movies.push(newMovie);
    res.json(movies);
  } else {
    res.status(500).json({error: 'hubo un error'});
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, director, year, rating } = req.body;

  if (title && director && year && rating) {
    _.each(movies, (movie, i) => {
      if (movie.id == id) {
        movie.title = title;
        movie.director = director;
        movie.year = year;
        movie.rating = rating;
      }
    })
    res.json(movies);
  } else {
    res.status(500).json({error: 'hubo un error'});
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  _.each(movies, (movie, i) => {
    if (movie.id == id) {
      movies.splice(i, 1);
    }
  });
  // console.log(url.parse(req.url,true).query);
  res.send(movies);
});

module.exports = router;