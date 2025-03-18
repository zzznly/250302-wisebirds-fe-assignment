import UserService from '@/service/user/UserService';

const checkUserEmailExist = async (email: string) => {
  try {
    const response = await UserService.checkUserEmail(email);
    const isEmailExist = response.data.result;
    return isEmailExist;
  } catch (error) {
    console.error('check email exist error: ', error);
  }
};

export const validateEmail = async (email: string): Promise<string> => {
  if (!email) return '아이디(이메일)을 입력하세요.';
  if (email.length < 9 || email.length > 50) return '올바른 이메일 주소를 입력하세요.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return '올바른 이메일 주소를 입력하세요.';

  const isEmailExist = await checkUserEmailExist(email);
  if (isEmailExist) return '이미 사용 중인 이메일입니다. 다른 이메일로 변경하세요.';

  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return '비밀번호를 입력하세요.';
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,15}$/;
  if (!passwordRegex.test(password)) return '8~15자 영문, 숫자, 특수문자를 사용하세요.';
  return '';
};

export const validateRepeatPassword = (password: string, repeatPassword: string): string => {
  if (!repeatPassword) return '비밀번호를 입력하세요.';
  if (repeatPassword !== password) return '비밀번호가 일치하지 않습니다.';
  return '';
};

export const validateName = (name: string): string => {
  if (!name) return '이름을 입력하세요.';
  const nameRegex = /^[A-Za-z가-힣]{1,16}$/;
  if (!nameRegex.test(name)) return '이름을 올바르게 입력하세요.(숫자, 특수문자, 공백 입력 불가)';
  return '';
};
