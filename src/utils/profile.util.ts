// src/utils/profile.utils.ts
export function calculateHoroscope(birthday: Date): string {
  // Logic to determine horoscope based on birthdate
  const month = birthday.getUTCMonth() + 1;
  const day = birthday.getUTCDate();
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  // Add other horoscope ranges...
  return 'Unknown';
}

export function calculateZodiac(birthday: Date): string {
  const year = birthday.getUTCFullYear();
  const zodiacs = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  return zodiacs[(year - 4) % 12];
}
