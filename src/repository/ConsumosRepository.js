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