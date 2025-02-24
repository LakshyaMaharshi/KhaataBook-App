const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    fs.readdir('./files', {withFileTypes:true},(err, files)=>{
        if(err) return err;
        console.log(files);
        res.render('index.ejs',{files});  
    })
});

app.get('/create',(req,res)=>{
    res.render('create.ejs');
});

app.get('/edit/:fileName',(req,res)=>{
    var filename = req.params.fileName;
    fs.readFile(`./files/${filename}`,(err,data)=>{
        if (err) return err;
        res.render('edit.ejs',{filename, data});
    });
})

app.get('/hisaab/:filename',(req,res)=>{
    var filename = req.params.filename;
    var filepath = path.join(__dirname, 'files', filename);
    fs.readFile(filepath, (err,data)=>{
        if(err) return err;
        res.render('hisaab.ejs',{filename,data});
    })
})

app.post('/create', (req,res)=>{
    let {title,description} = req.body;
    fs.writeFile(path.join(__dirname,'files',`${title.replace(/\s+/g, '_')}.txt`),`${description}`, (err)=>{
        if(err) throw err;
        console.log("file created!");
    })
    res.redirect('/');
})

app.post('/edit/:fileName',(req,res)=>{
    let fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'files', fileName);
    fs.writeFile(filePath,`${req.body.Updated_disc}`, (err)=>{
        if(err) throw err;
        console.log("file Edited!");
        res.redirect('/')
    })
})

app.post('/delete/:fileName',(req,res)=>{
    let fileName = req.params.fileName;
    fs.unlink(`./files/${fileName}`,(err)=>{
        if (err) return err;
        console.log('file delete!');
        res.redirect('/');
    })
})

app.listen(3000);