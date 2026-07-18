import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from '../controllers/authController.js';
import { celebrate } from 'celebrate';
import { loginValidation, registerValidation } from '../validations/auth.js';

// TASK 3

// Створіть роут POST /auth/login для аутентифікації користувача. Тіло запиту має містити наступні властивості:

// email - обовʼязково
// password - обовʼязково
// Обробка цього роута має включати:

// Реєстрацію роута в файлі src/routers/authRoutes.js
// Валідацію отриманих даних за допомогою бібліотеки celebrate
// Опис контролера для цього роута в файлі src/controllers/authController.js
// Переконайтеся, що користувач із такою поштою та паролем існує в системі, поверніть за допомогою бібліотеки createHttpError 401 помилку в іншому випадку.
// Якщо користувача за переданими даними було знайдено, то створіть для нього нову сесію, в яку запишіть згенеровані access та refresh токени. Стара сесія, за її наявності, має бути видалена. Вкажіть час життя 15 хв для access токену та 30 днів для refresh токену.
// Запишіть рефреш, access токени та sessionId в cookies відповіді.
// Відповідь сервера, в разі успішного логіну, має бути зі статусом 200 і містити об’єкт з даними аутентифікованого користувача.

const router = Router();

router.post('/register', celebrate(registerValidation), registerUser);
router.post('/login', celebrate(loginValidation), loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshUser);

export default router;
