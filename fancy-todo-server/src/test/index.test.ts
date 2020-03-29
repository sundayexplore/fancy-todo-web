import supertest from 'supertest';
import { connect, disconnect, connection } from 'mongoose';

import app from '../app';

export const request = supertest(app);

describe('User Model Tests', () => {
  beforeAll(async () => {
    await connect('mongodb://localhost:27017/fancy-todo-api-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  test('Sign Up - Success', async () => {
    const signUpData = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@doe.com',
      password: 'johndoe'
    };
    const response = await request.post('/users/signup').send(signUpData);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Successfully signed up!');
  });

  test('Sign In - Success', async () => {
    const signInData = {
      userIdentifier: 'johndoe',
      password: 'johndoe'
    };
    const response = await request.post('/users/signin').send(signInData);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('token');
    process.env.TOKEN = response.body.token;
    process.env.USER_ID = response.body.user._id;
  });

  test('Update Profile - Success', async () => {
    const updateProfileData = {
      firstName: 'Jackie',
      lastName: 'Chen',
      username: 'jackiechen',
      email: 'jackiechen'
    };
    const token: any = process.env.TOKEN;
    const response = await request.put(`/users/${process.env.USER_ID}`).send(updateProfileData).set('token', token);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Successfully updated user!');
  });

  test('Update Password - Success', async () => {
    const updatePasswordData = {
      password: 'jackiechen'
    };
    const token: any = process.env.TOKEN;
    const response = await request.patch(`/users/${process.env.USER_ID}`).send(updatePasswordData).set('token', token);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Successfully updated user password!');
  });

  afterAll(async () => {
    await disconnect();
  });
});

describe('Todo Model Test', () => {
  beforeAll(async () => {
    await connect(`mongodb://localhost:27017/fancy-todo-api-test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  })

  test('Create Todo - Success', async () => {
    const createTodoData = {
      name: 'Create Client using Vue.js',
      dueDate: new Date()
    };
    const token: any = process.env.TOKEN;
    const response = await request.post(`/todos/${process.env.USER_ID}`).send(createTodoData).set('token', token);
    expect(response).toHaveProperty('todo');
  });

  afterAll(async () => {
    await connection.collection('users').drop();
    await connection.collection('todos').drop();
    disconnect();
  });
});
