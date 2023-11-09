const {
    CreateConsumo,
    deleteConsumo,
    updateConsumo,
    FindAllConsumo,
  } = require("../repository/ConsumosRepository");
  
  const ConsumoModel = require("../models/ListaConsumosModels");
  
  describe("Test Consumption Repository", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("Shoul Save Consuption response ok", async () => {
      const consumo = new ConsumoModel();
      consumo.consumo_energetico = "test consumo";
      consumo.numero_de_piso = "test piso";
      consumo.fecha = "test fecha";
  
      jest
        .spyOn(consumo, "save")
        .mockImplementationOnce((consumo) => Promise.resolve(consumo));
  
      const result = await CreateConsumo(consumo);
      console.log(result);
      expect(result.status).toBe(201);
      expect(result.message).toBe("Se ha creado el Consumo Correctamente");
    });
    it("Shoul Save consumption response fail", async () => {
      const expectedErrorData = { errorMessage: "test error scenario" };
      const consumo = new ConsumoModel();
      consumo.consumo_energetico = "test consumo";
      consumo.numero_de_piso = "test piso";
      consumo.fecha = "test fecha";
  
      jest
        .spyOn(consumo, "save")
        .mockImplementationOnce((consumo) =>
          Promise.reject(new Error(expectedErrorData))
        );
  
      try {
        await CreateConsumo(consumo);
      } catch (error) {
        expect(error.status).toBe(500);
        expect(error.message).toBe("Ocurrio un error en el servidor");
      }
    });
  
    it("Shoul Delete consumption response ok", async () => {
      const consumoId = "123";
      const consumo = {
        _id: consumoId,
        consumo_energetico: "test consumo",
        numero_de_piso: "test piso",
        fecha: "test fecha",
      };
  
      jest
        .spyOn(ConsumoModel, "findByIdAndDelete")
        .mockImplementationOnce((consumoId) => Promise.resolve(consumo));
  
      const result = await deleteConsumo(consumoId);
  
      expect(result.status).toBe(200);
      expect(result.message).toBe("Registro Eliminado correctamente");
      expect(result.result).toEqual(consumo);
    });
    it("Shoul Delete consumption response fail", async () => {
      const consumoId = "123";
      const expectedErrorData = { errorMessage: "test error scenario" };
  
      jest
        .spyOn(ConsumoModel, "findByIdAndDelete")
        .mockImplementationOnce((consumoId) =>
          Promise.reject(new Error(expectedErrorData))
        );
  
      try {
        await deleteConsumo(consumoId);
      } catch (error) {
        expect(error.status).toBe(500);
      }
    });
  
    it("Shoul update consumption response ok", async () => {
      const consumoId = "654afad180c86c12c0c29d14";
  
      const consumo = new ConsumoModel();
      consumo.consumo_energetico = "test consumo";
      consumo.numero_de_piso = "test piso";
      consumo.fecha = "test fecha";
  
      jest
        .spyOn(ConsumoModel, "findOneAndUpdate")
        .mockImplementationOnce((consumoId, consumo) => Promise.resolve(consumo));
  
      const result = await updateConsumo(consumoId, consumo);
  
      expect(result.status).toBe(200);
      expect(result.message).toBe("Registro Actualizado correctamente");
    });
    it("Shoul update consumption response fail", async () => {
      const consumoId = "654afad180c86c12c0c29d14";
      const expectedErrorData = { errorMessage: "test error scenario" };
      const consumo = new ConsumoModel();
      consumo.consumo_energetico = "test consumo";
      consumo.numero_de_piso = "test piso";
      consumo.fecha = "test fecha";
  
      jest
        .spyOn(ConsumoModel, "findOneAndUpdate")
        .mockImplementationOnce((consumoId, consumo) =>
          Promise.reject(new Error(expectedErrorData))
        );
      try {
        await updateConsumo(consumoId, consumo);
      } catch (error) {
        expect(error.status).toBe(500);
      }
    });
  
    it("Should findAll Response ok", async () => {
      jest
        .spyOn(ConsumoModel, "find")
        .mockReturnValue(Promise.resolve([{ consumo: 123 }]));
  
      const expected = await FindAllConsumo();
      expect(expected.status).toBe(200);
    });
  
    it("Should FindAll response Fail", async () => {
      const expectedErrorData = { errorMessage: "test error scenario" };
      jest
        .spyOn(ConsumoModel, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error(expectedErrorData))
        );
  
      try {
        await FindAllConsumo();
      } catch (error) {
        expect(error.status).toEqual(500);
      }
    });
  });