let Aula = require("../model/Aula")
let Contenido = require('../model/Contenido')
let Coordinador = require('../model/Coordinador')
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
    getall,
    getone,
    create_aula,
    update_aula,
    delete_aula,
    create_contenido,
    getall_contenido
}


function getone(req, res){

  Aula.findById(req.params.id, function(err, redProduct)
  {  
      if(err){
      console.log(err);
      res.sendStatus(500);
      return
  }
  console.log(redProduct);
  return res.send(redProduct);

  })

}

function getall(req, res){
  Aula.find({}, function(err, redProducts)
  {  
      if(err){
      console.log(err);
      res.sendStatus(500);
      return
  }
  return res.send(redProducts);

  })
}

function create_aula(req, res){
  const errors = validationResult(req);

  console.log(req.body);     
    var hat = new Aula();
    hat.name = req.body.name
    hat.description = req.body.description;
    hat.reference = req.body.reference;
    hat.save(function(err, newhat) {
      if(err){
          if(err.code == 11000 )
          { 
            res.status(400);
            res.json({
              "type": 'error',
              "message" : "Used!"
            });
            console.log(err);
            return
          }else{
            res.status(400);s
            res.json({
              "type": 'error',
              "message" : "Database down!"
            });
          }
      }
      res.status(200).json( {
        "Aula" : newhat
      });
    });

};

function update_aula(req,res) {   
  console.log(req.body); 
    
        
        if(req.body.name == '')
        {
            res.status(400);
            res.json({
            "type": "error",
            "message" : "El nombre es necesario!"
            });
        return;
        }

        if(req.body.description == '')
        {
            res.status(400);
            res.json({
            "type": "error",
            "message" : "El Correo es necesario!"
            });
        return;
        }
        
        if(req.body.reference)
        {
            res.status(400);
            res.json({
            "type": "error",
            "message" : "El Rif es requerido!"
            });
        return;
        }
            

  
    var Aula = new Aula();


    Aula.findByIdAndUpdate(req.body.hatid, { $set:
         {name: req.body.name,
          description:  req.body.description,   
          reference: req.body.reference,
         }
        })
      .then(Aula => { 
        console.log("update")
        res.status(200).json( {
            'type' : 'success', 
            'message': 'Succ'
        } );
      })
      .catch(err => {
      
        res.status(400).send('Failed to create new record');
    });
    
  
};

function delete_aula(req, res) {
  Aula.findByIdAndRemove(req.params.hatid)
  .then(Aula => {
      res.status(200).json({
          'type': 'success',
          'message': 'Succ'
      });
  })
  .catch(err => {
      res.status(400).send('Error');
  });
  
}

// Contenido Controlador

async function create_contenido(req, res) {
 
    const errors = validationResult(req);
    let user = await Coordinador.findOne({
      userID:req.user.id
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { unidad } = req.body;
    try {
      let contenido = new Contenido()
      contenido.creado_para = user.universidadID
      contenido.unidad = unidad
      await contenido.save()
      console.log(contenido)

  
  
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
}

async function getall_contenido(req, res) {
  let contenido = await Contenido.find();
  if(contenido !=""){
    res.status(200).send(contenido)
  }else{
    res.status(402).send("not found")
  }
}