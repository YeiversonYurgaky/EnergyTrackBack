const { CreateUser, FindOneUsername } = require("../repository/UserRepository");
const UserModel = require("../models/UsuariosModels");
const { create, login } = require("../controllers/UsuariosController");
const { mockRequest, mockResponse } = require("../test/mocks/mocks");
const bcrypt = require("bcrypt-nodejs");

jest.mock("../../node_modules/bcrypt-nodejs");
jest.mock("../repository/UserRepository");
jest.mock("../models/UsuariosModels", () => {
  return jest.fn().mockImplementation(() => {
    return {};
  });
});

describe("Test Users Controller", () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  it("should return 404 if required fields are missing", async () => {
    req.body = { nombres: "stiven" }; // Not all required fields are provided
    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Todos los campos son requeridos",
    });
  });

  it("should create user and return 200 status on success", async () => {
    // Mock bcrypt hash to resolve with a fake hash
    bcrypt.hash.mockImplementation(
      (password, saltOrRounds, options, callback) => {
        callback(null, "hashedpassword");
      }
    );

    req.body = {
      nombres: "stiven",
      apellidos: "barajas",
      usuario: "stiven",
      password: "123",
      email: "brayan@gmail.com",
    };

    // Mock CreateUser to simulate successful user creation
    CreateUser.mockResolvedValue({
      status: 200,
      message: "User created successfully",
    });

    await create(req, res);

    expect(UserModel).toHaveBeenCalledTimes(1); // UserModel constructor should be called
    expect(CreateUser).toHaveBeenCalledWith(expect.any(Object)); // CreateUser should be called with a user object
    expect(res.status).toHaveBeenCalledWith(200); // Expect a 200 status code
    expect(res.send).toHaveBeenCalledWith({
      status: 200,
      message: "User created successfully",
    });
  });
});

describe("Test Login Controller", () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  it("should return 404 if username or password is missing", async () => {
    req.body = { usuario: "stiven" }; // Password is missing
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Por favor, proporcione un usuario y una contraseña.",
    });
  });

  it("should return 200 if username and password are correct", async () => {
    req.body = {
      usuario: "stiven",
      password: "123",
    };

    // Mock FindOneUsername to simulate finding a user
    const mockUser = { result: { password: "hashedpassword" } };
    FindOneUsername.mockResolvedValue(mockUser);

    // Mock bcrypt compare to simulate a successful password match
    bcrypt.compare.mockImplementation((password, hash, callback) => {
      callback(null, true); // The 'true' signifies a successful match
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "el usuario se encuentra logueado",
    });
  });

  it("should return 404 if username is correct but password is incorrect", async () => {
    req.body = {
      usuario: "stiven",
      password: "incorrectpassword",
    };

    const mockUser = { result: { password: "hashedpassword" } };
    FindOneUsername.mockResolvedValue(mockUser);

    // Mock bcrypt compare to simulate an unsuccessful password match
    bcrypt.compare.mockImplementation((password, hash, callback) => {
      callback(null, false); // The 'false' signifies a failed match
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Usuario o contraseña Invalida 1",
    });
  });

  it("should return 404 if username does not exist", async () => {
    req.body = {
      usuario: "nonexistentuser",
      password: "123",
    };

    // Simulate user not found
    FindOneUsername.mockResolvedValue(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Usuario o contraseña Invalida",
    });
  });
});
