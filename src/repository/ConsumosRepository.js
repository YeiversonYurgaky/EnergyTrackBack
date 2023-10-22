const {Response} = require("../utils/Response")
const ConsumoModel = require("../models/ListaConsumosModels")


module.exports.CreateConsumo = async (consumo) => {
    return new Promise((resolve, reject) => {
      consumo
        .save()
        .then((resp) => {
          Response.status = 201;
          Response.message = "Se ha creado el Consumo Correctamente";
          Response.result = resp;
          resolve(Response);
        })
        .catch((err) => {
          console.log("error:", err);
          Response.status = 500;
          Response.message = "Ocurrio un error en el servidor";
          Response.result = err;
          reject(Response);
        });
    });
  };

module.exports.deleteConsumo = async (id) =>{
  return new Promise((resolve, reject) => {
      ConsumoModel
      .findByIdAndDelete(id)
      .then((resp)=>{
          Response.status = 200;
          Response.message = "Registro Eliminado correctamente";
          Response.result = resp;
          resolve(Response);
      })
      .catch((err) =>{
          console.log("error:", err)
          Response.status = 500;
          Response.message = "Ocurrio un error en el servidor";
          Response.result = err;
          reject(Response);
      })
  });
}

module.exports.updateConsumo = async (id, consumo) =>{
  return new Promise((resolve, reject) => {
      ConsumoModel
      .findOneAndUpdate({_id : id}, {consumo_energetico: consumo.consumo_energetico,numero_de_piso: consumo.numero_de_piso})
      .then((resp)=>{
          Response.status = 200;
          Response.message = "Registro Actualizado correctamente";
          Response.result = resp;
          resolve(Response);
      })
      .catch((err) =>{
          console.log("error:", err)
          Response.status = 500;
          Response.message = "Ocurrio un error en el servidor";
          Response.result = err;
          reject(Response);
      })
  });
}