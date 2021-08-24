//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = tasks.length + 1;
    req.body.state = 'pending';
    tasks.push(req.body);
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.get('/tasks/:taskId',  (req, res, next) => {    
    var idd = tasks.findIndex( x => x.id === parseInt(req.params.taskId) );
    res.send(tasks[idd]);
});

app.put('/tasks/:taskId', jsonParser, (req, res)=> {
    const status= req.query.state;
    
    if(status!= null){
        var idd = req.params.taskId;
        tasks.find( (task) =>{
            if(task.id == idd){
                task.state=status;
                res.send("Estado Actualizado");
            }
        });
    }
    if(status==null){
        var idd = req.params.taskId;
        tasks.find( (task) =>{
            if(task.id == idd){
                task.title=req.body.title;
                task.detail=req.body.detail;
                res.send("Tarea Actualizada");
            }
        });
    }
    
});

app.delete('/tasks/:taskId', jsonParser, (req, res, next) => {
    res.send("Se elimino la tarea con el id: " + req.params.taskId);
    var idd = tasks.findIndex( x => x.id === parseInt(req.params.taskId) );

    tasks.splice( idd, 1 );
});

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});
