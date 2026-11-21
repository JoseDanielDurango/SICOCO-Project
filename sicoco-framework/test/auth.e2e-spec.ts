import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let studentToken = '';
  let teacherToken = '';
  const studentEmail = `student_${Date.now()}@unicordoba.edu.co`;
  const teacherEmail = `teacher_${Date.now()}@unicordoba.edu.co`;
  const password = 'TestSecurePassword123!';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/auth/register (POST) - Register Student', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Student E2E Test',
        email: studentEmail,
        password: password,
        role: 'student',
        enrollmentNumber: '202610999',
      })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe(studentEmail);
    expect(res.body.user.role).toBe('student');
    studentToken = res.body.accessToken;
  });

  it('/auth/login (POST) - Login Student', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: studentEmail,
        password: password,
      })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe(studentEmail);
  });

  it('/auth/login (POST) - Reject invalid password with 401', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: studentEmail,
        password: 'WrongPassword123!',
      })
      .expect(401);
  });

  it('/auth/profile (GET) - Access profile with valid Bearer token', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(res.body.email).toBe(studentEmail);
    expect(res.body.role).toBe('student');
  });

  it('/auth/profile (GET) - Reject request without token with 401', async () => {
    await request(app.getHttpServer())
      .get('/auth/profile')
      .expect(401);
  });

  it('/auth/teacher-only (GET) - Reject student with 403 Forbidden', async () => {
    await request(app.getHttpServer())
      .get('/auth/teacher-only')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(403);
  });

  it('/auth/student-only (GET) - Allow student with 200 OK', async () => {
    await request(app.getHttpServer())
      .get('/auth/student-only')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);
  });

  it('/auth/register (POST) - Register Teacher', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Teacher E2E Test',
        email: teacherEmail,
        password: password,
        role: 'teacher',
        enrollmentNumber: 'EMP202601',
      })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.role).toBe('teacher');
    teacherToken = res.body.accessToken;
  });

  it('/auth/teacher-only (GET) - Allow teacher with 200 OK', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/teacher-only')
      .set('Authorization', `Bearer ${teacherToken}`)
      .expect(200);

    expect(res.body.message).toContain('Access granted');
  });

  afterAll(async () => {
    await app.close();
  });
});
