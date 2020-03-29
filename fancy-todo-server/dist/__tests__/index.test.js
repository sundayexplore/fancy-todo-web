"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = require("mongoose");
var app_1 = __importDefault(require("../app"));
var request = supertest_1.default(app_1.default);
var token;
var userId;
var todoId;
describe('User Model Tests', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.connect('mongodb://localhost:27017/fancy-todo-api-test', {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Sign Up - Success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var signUpData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signUpData = {
                        firstName: 'John',
                        lastName: 'Doe',
                        username: 'johndoe',
                        email: 'john@doe.com',
                        password: 'johndoe'
                    };
                    return [4 /*yield*/, request.post('/users/signup').send(signUpData)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('message');
                    expect(response.body.message).toBe('Successfully signed up!');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Sign In - Success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var signInData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signInData = {
                        userIdentifier: 'johndoe',
                        password: 'johndoe'
                    };
                    return [4 /*yield*/, request.post('/users/signin').send(signInData)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('user');
                    expect(response.body).toHaveProperty('message');
                    expect(response.body).toHaveProperty('token');
                    token = response.body.token;
                    userId = response.body.user._id;
                    return [2 /*return*/];
            }
        });
    }); });
    test('Update Profile - Success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateProfileData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateProfileData = {
                        firstName: 'Jackie',
                        lastName: 'Chen',
                        username: 'jackiechen',
                        email: 'jackiechen'
                    };
                    return [4 /*yield*/, request
                            .put("/users/" + userId)
                            .send(updateProfileData)
                            .set('token', token)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('user');
                    expect(response.body).toHaveProperty('message');
                    expect(response.body.message).toBe('Successfully updated user!');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Update Password - Success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatePasswordData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatePasswordData = {
                        password: 'jackiechen'
                    };
                    return [4 /*yield*/, request
                            .patch("/users/" + userId)
                            .send(updatePasswordData)
                            .set('token', token)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('user');
                    expect(response.body).toHaveProperty('message');
                    expect(response.body.message).toBe('Successfully updated user password!');
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.disconnect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Todo Model Test', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.connect("mongodb://localhost:27017/fancy-todo-api-test", {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Create Todo - Success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createTodoData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createTodoData = {
                        name: 'Create Client using Vue.js',
                        dueDate: new Date()
                    };
                    return [4 /*yield*/, request
                            .post("/todos/" + userId)
                            .send(createTodoData)
                            .set('token', token)];
                case 1:
                    response = _a.sent();
                    todoId = response.body.todo._id;
                    expect(response.body).toHaveProperty('todo');
                    expect(response.body).toHaveProperty('message');
                    expect(response.body.todo.name).toBe(createTodoData.name);
                    expect(response.body.message).toBe('Successfully created todo!');
                    return [2 /*return*/];
            }
        });
    }); });
    test('Update Todo - Success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateTodoData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateTodoData = {
                        name: 'Install MySQL',
                        dueDate: new Date()
                    };
                    return [4 /*yield*/, request
                            .put("/todos/" + userId + "/" + todoId)
                            .send(updateTodoData)
                            .set('token', token)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('todo');
                    expect(response.body).toHaveProperty('message');
                    expect(response.body.todo.name).toBe(updateTodoData.name);
                    expect(response.body.message).toBe('Successfully updated todo!');
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.connection.collection('users').drop()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, mongoose_1.connection.collection('todos').drop()];
                case 2:
                    _a.sent();
                    mongoose_1.disconnect();
                    return [2 /*return*/];
            }
        });
    }); });
});
