import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PixelButton from '@/components/PixelButton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { insertUserSchema, loginSchema, type InsertUser, type LoginUser } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  onBack: () => void;
}

export default function AuthScreen({ onAuthSuccess, onBack }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const { login, register } = useAuth();

  const loginForm = useForm<LoginUser>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  // Сброс форм при переключении вкладок
  const handleTabSwitch = (newIsLogin: boolean) => {
    setIsLogin(newIsLogin);
    if (newIsLogin) {
      registerForm.reset();
    } else {
      loginForm.reset();
    }
  };

  const onLoginSubmit = async (data: LoginUser) => {
    try {
      await login(data);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в КодКвест!",
      });
      onAuthSuccess(data);
    } catch (error: any) {
      toast({
        title: "Ошибка входа",
        description: error.message || "Неверный email или пароль",
        variant: "destructive",
      });
    }
  };

  const onRegisterSubmit = async (data: InsertUser) => {
    try {
      await register(data);
      toast({
        title: "Успешная регистрация",
        description: "Аккаунт создан! Добро пожаловать в КодКвест!",
      });
      onAuthSuccess(data);
    } catch (error: any) {
      toast({
        title: "Ошибка регистрации",
        description: error.message || "Пользователь с таким email уже существует",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-undertale-dark flex items-center justify-center p-4">
      <div className="pixel-border bg-undertale-panel p-8 max-w-md w-full">
        <h2 className="text-2xl text-undertale-yellow font-bold mb-6 text-center">
          {isLogin ? '* Вход в систему *' : '* Регистрация *'}
        </h2>

        {isLogin ? (
          <Form {...loginForm} key="login-form">
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        key="login-email"
                        type="email"
                        placeholder="example@mail.com"
                        className="bg-black border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Пароль</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        key="login-password"
                        type="password"
                        placeholder="••••••"
                        className="bg-black border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3 pt-4">
                <PixelButton
                  variant="success"
                  className="w-full"
                  disabled={loginMutation.isPending}
                  onClick={loginForm.handleSubmit(onLoginSubmit)}
                >
                  {loginMutation.isPending ? 'ВХОД...' : 'ВОЙТИ'}
                </PixelButton>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...registerForm} key="register-form">
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Имя пользователя</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        key="register-username"
                        placeholder="Введите имя"
                        className="bg-black border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        key="register-email"
                        type="email"
                        placeholder="example@mail.com"
                        className="bg-black border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Пароль</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        key="register-password"
                        type="password"
                        placeholder="Минимум 6 символов"
                        className="bg-black border-gray-600 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3 pt-4">
                <PixelButton
                  variant="success"
                  className="w-full"
                  disabled={registerMutation.isPending}
                  onClick={registerForm.handleSubmit(onRegisterSubmit)}
                >
                  {registerMutation.isPending ? 'РЕГИСТРАЦИЯ...' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                </PixelButton>
              </div>
            </form>
          </Form>
        )}

        <div className="mt-6 space-y-3">
          <div className="text-center">
            <button
              onClick={() => handleTabSwitch(!isLogin)}
              className="text-undertale-cyan hover:text-undertale-yellow transition-colors text-sm"
            >
              {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
            </button>
          </div>
          <PixelButton onClick={onBack} variant="secondary" className="w-full">
            НАЗАД
          </PixelButton>
        </div>

        <div className="mt-6 bg-black border-2 border-undertale-green p-3 text-xs text-white">
          <p className="text-undertale-yellow mb-2">ℹ️ Информация:</p>
          <p>• Первые 2 уровня доступны без регистрации</p>
          <p>• Регистрация открывает все уровни и блиц-тест</p>
          <p>• Ваш прогресс будет сохранен</p>
        </div>
      </div>
    </div>
  );
}