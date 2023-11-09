const {
    create,
    deleteConsumoData,
    findAll,
    updateConsumoData,
  } = require("../controllers/ConsumosCrontroller");
  const {
    CreateConsumo,
    deleteConsumo,
    FindAllConsumo,
    updateConsumo,
  } = require("../repository/ConsumosRepository");
  
  jest.mock("../repository/ConsumosRepository");
  
  describe("Create function", () => {
    let mockReq;
    let mockRes;
  
    beforeEach(() => {
      mockReq = {
        body: {
          fecha: "2023-11-08",
          consumo_energetico: "123",
          numero_de_piso: "5",
        },
      };
  
      mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });
  
    it("should create a new consumo", async () => {
      const mockResponse = { status: 200, message: "Created successfully" };
      CreateConsumo.mockResolvedValue(mockResponse);
  
      await create(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  
    it("should return an error if fields are missing or not numbers", async () => {
      const invalidReq = {
        body: {
          fecha: "2023-11-08",
          consumo_energetico: "abc",
          numero_de_piso: "5",
        },
      };
  
      await create(invalidReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: "Los campos solo pueden contener números",
      });
    });
  
    it("should return an error if required fields are missing", async () => {
      const invalidReq = {
        body: {
          consumo_energetico: "123",
        },
      };
  
      await create(invalidReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        message: "Todos los campos son requeridos",
      });
    });
  });
  
  describe("DeleteConsumoData function", () => {
    let mockReq;
    let mockRes;
  
    beforeEach(() => {
      mockReq = {
        params: {
          id: "123", // Assuming an existing ID
        },
      };
  
      mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });
  
    it("should delete a consumo", async () => {
      const mockResponse = { status: 200, message: "Deleted successfully" };
      deleteConsumo.mockResolvedValue(mockResponse);
  
      await deleteConsumoData(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  
    it("should return an error if the ID is not valid", async () => {
      const mockResponse = { status: 400, message: "ID inválido" };
      deleteConsumo.mockResolvedValue(mockResponse);
  
      await deleteConsumoData(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  
    it("should return an error if the consumo does not exist", async () => {
      const nonExistingIdReq = {
        params: {
          id: "456", // Assuming a non-existing ID
        },
      };
  
      const mockResponse = { status: 404, message: "Consumo not found" };
      deleteConsumo.mockResolvedValue(mockResponse);
  
      await deleteConsumoData(nonExistingIdReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  });
  
  describe("UpdateConsumoData function", () => {
    let mockReq;
    let mockRes;
  
    beforeEach(() => {
      mockReq = {
        params: {
          id: "123", // Assuming an existing ID
        },
        body: {
          consumo_energetico: "456",
          numero_de_piso: "7",
        },
      };
  
      mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });
  
    it("should update a consumo", async () => {
      const mockResponse = { status: 200, message: "Updated successfully" };
      updateConsumo.mockResolvedValue(mockResponse);
  
      await updateConsumoData(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  
    it("should return an error if the consumo does not exist for update", async () => {
      const nonExistingIdReq = {
        params: {
          id: "456", // Assuming a non-existing ID
        },
        body: {
          consumo_energetico: "456",
          numero_de_piso: "7",
        },
      };
  
      const mockResponse = {
        status: 404,
        message: "Consumo not found for update",
      };
      updateConsumo.mockResolvedValue(mockResponse);
  
      await updateConsumoData(nonExistingIdReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  });
  
  describe("FindAll function", () => {
    let mockReq;
    let mockRes;
  
    beforeEach(() => {
      mockReq = {};
      mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });
  
    it("should find all consumos", async () => {
      const mockResponse = {
        status: 200,
        data: [
          {
            id: 1,
            consumo_energetico: 100,
            numero_de_piso: 5,
            fecha: "2023-11-08",
          },
          {
            id: 2,
            consumo_energetico: 200,
            numero_de_piso: 6,
            fecha: "2023-11-09",
          },
          // Agrega más objetos de consumo si es necesario
        ],
      };
  
      FindAllConsumo.mockResolvedValue(mockResponse);
  
      await findAll(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  
    it("should return an error if there is an issue with finding all consumos", async () => {
      const mockResponse = { status: 500, message: "Internal server error" };
      FindAllConsumo.mockResolvedValue(mockResponse);
  
      await findAll(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(mockResponse);
    });
  });