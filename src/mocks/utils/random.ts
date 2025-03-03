/**
 * min과 max 사이의 랜덤한 숫자를 반환합니다.
 * @returns {number} min과 max 사이의 랜덤한 숫자
 */
export function getRandomInt(min: number, max: number) {
  return Number.parseInt((Math.random() * (max - min) + min).toString());
}

/**
 * 입력받은 확률 (0 ~ 100) 에 따라 true를 반환합니다
 * [우선순위]
 * 입력받은 확률 > .env > 30 (기본값)
 * @returns {boolean}
 */
export function getRandomBoolean(rate?: number) {
  if (rate) return getRandomInt(0, 100) <= rate;

  return getRandomInt(0, 100) <= Number(import.meta.env.VITE_ERROR_RATE ?? 30);
}
