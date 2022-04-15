const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('express/lib/response');

const blogRoutes = require('./routes/blogRoutes');
//express app
const app = express();


//connect to mongodb
const dbURI = 'mongodb+srv://netninja:JqMPygvRRdgLkSdd@cluster0.47ybp.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname+'/images'));


/* 
//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('6238a618807f16ec3c8f43ce')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})
 */




//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    res.render('about', {title: 'About'});
});

app.get('/search', (req, res) => {
    res.render('search', {title: 'Search'});
});
/* 
app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'Create a new blog'});
});
 */

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});

