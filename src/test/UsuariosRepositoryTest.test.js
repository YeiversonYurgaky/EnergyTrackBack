const UserModel = require("../models/UsuariosModels");
const { CreateUser, FindOneUsername } = require("../repository/UserRepository");

describe("Test Usuarios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Shoul Save User response ok", async () => {
    const user = new UserModel();
    user.nombres = "test nombres";
    user.apellidos = "test apellidos";
    user.email = "test email";
    user.usuario = "userTest";

    jest
      .spyOn(user, "save")
      .mockImplementationOnce((user) => Promise.resolve(user));

    const result = await CreateUser(user);
    expect(result.status).toBe(201);
    expect(result.message).toBe("Se ha creado el Usuario Correctamente");
  });

  it("Shoul Save User response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    const user = new UserModel();
    user.nombres = "test nombres";
    user.apellidos = "test apellidos";
    user.email = "test email";
    user.usuario = "userTest";

    jest
      .spyOn(user, "save")
      .mockImplementationOnce((user) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await CreateUser(user);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe("Ocurrio un error en el servidor");
    }
  });

  it("Shoul FindOne Username response ok", async () => {
    const usuariomock = "user1";
    const user = { name: "User1", usuario: usuariomock };

    jest
      .spyOn(UserModel, "findOne")
      .mockImplementationOnce((usuariomock) => Promise.resolve(user));

    const result = await FindOneUsername(usuariomock);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registros Encontrados");
    expect(result.result).toEqual(user);
  });

  it("Shoul FindOne User response Fail", async () => {
    const usuariomock = "user1";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(UserModel, "findOne")
      .mockImplementationOnce((usuariomock) =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindOneUsername(usuariomock);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });
});
