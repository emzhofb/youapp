// src/utils/profile.utils.ts
export const calculateHoroscope = (birthday: Date): string => {
  const month = birthday.getMonth() + 1;  // getMonth() returns 0 for January, 1 for February, etc.
  const day = birthday.getDate();

  // Horoscope signs based on the provided birthdate ranges
  const horoscopeSigns: { [key: string]: { start: Date, end: Date } } = {
    Aries: { start: new Date(birthday.getFullYear(), 2, 21), end: new Date(birthday.getFullYear(), 3, 19) },
    Taurus: { start: new Date(birthday.getFullYear(), 3, 20), end: new Date(birthday.getFullYear(), 4, 20) },
    Gemini: { start: new Date(birthday.getFullYear(), 4, 21), end: new Date(birthday.getFullYear(), 5, 21) },
    Cancer: { start: new Date(birthday.getFullYear(), 5, 22), end: new Date(birthday.getFullYear(), 6, 22) },
    Leo: { start: new Date(birthday.getFullYear(), 6, 23), end: new Date(birthday.getFullYear(), 7, 22) },
    Virgo: { start: new Date(birthday.getFullYear(), 7, 23), end: new Date(birthday.getFullYear(), 8, 22) },
    Libra: { start: new Date(birthday.getFullYear(), 8, 23), end: new Date(birthday.getFullYear(), 9, 23) },
    Scorpio: { start: new Date(birthday.getFullYear(), 9, 24), end: new Date(birthday.getFullYear(), 10, 21) },
    Sagittarius: { start: new Date(birthday.getFullYear(), 10, 22), end: new Date(birthday.getFullYear(), 11, 21) },
    Capricorn: { start: new Date(birthday.getFullYear(), 11, 22), end: new Date(birthday.getFullYear(), 0, 19) },
    Aquarius: { start: new Date(birthday.getFullYear(), 0, 20), end: new Date(birthday.getFullYear(), 1, 18) },
    Pisces: { start: new Date(birthday.getFullYear(), 1, 19), end: new Date(birthday.getFullYear(), 2, 20) }
  };

  for (const sign in horoscopeSigns) {
    const { start, end } = horoscopeSigns[sign];

    // Handle the zodiac sign with year change (Capricorn)
    if (
      (month === start.getMonth() + 1 && day >= start.getDate()) ||
      (month === end.getMonth() + 1 && day <= end.getDate()) ||
      (start.getMonth() > end.getMonth() &&
        ((month > start.getMonth() || month < end.getMonth()) &&
          (month !== start.getMonth() || day >= start.getDate()) &&
          (month !== end.getMonth() || day <= end.getDate())))
    ) {
      return sign;
    }
  }

  return ''; // Default to empty string if no match
};

export const calculateChineseZodiac = (birthday: Date): string => {
  const year = birthday.getFullYear();

  // List of zodiac signs with their start and end dates
  const zodiacSigns = [
    { sign: "Rabbit", start: new Date(2023, 0, 22), end: new Date(2024, 1, 9) },
    { sign: "Tiger", start: new Date(2022, 1, 1), end: new Date(2023, 0, 21) },
    { sign: "Ox", start: new Date(2021, 1, 12), end: new Date(2022, 0, 31) },
    { sign: "Rat", start: new Date(2020, 0, 25), end: new Date(2021, 1, 11) },
    { sign: "Pig", start: new Date(2019, 1, 5), end: new Date(2020, 0, 24) },
    { sign: "Dog", start: new Date(2018, 1, 16), end: new Date(2019, 1, 4) },
    { sign: "Rooster", start: new Date(2017, 0, 28), end: new Date(2018, 1, 15) },
    { sign: "Monkey", start: new Date(2016, 1, 8), end: new Date(2017, 0, 27) },
    { sign: "Goat", start: new Date(2015, 1, 19), end: new Date(2016, 1, 7) },
    { sign: "Horse", start: new Date(2014, 0, 31), end: new Date(2015, 1, 18) },
    { sign: "Snake", start: new Date(2013, 1, 10), end: new Date(2014, 0, 30) },
    { sign: "Dragon", start: new Date(2012, 0, 23), end: new Date(2013, 1, 9) },
    { sign: "Rabbit", start: new Date(2011, 1, 3), end: new Date(2012, 0, 22) },
    { sign: "Tiger", start: new Date(2010, 1, 14), end: new Date(2011, 1, 2) },
    { sign: "Ox", start: new Date(2009, 0, 26), end: new Date(2010, 1, 13) },
    { sign: "Rat", start: new Date(2008, 1, 7), end: new Date(2009, 0, 25) },
    { sign: "Boar", start: new Date(2007, 1, 18), end: new Date(2008, 1, 6) },
    { sign: "Dog", start: new Date(2006, 0, 29), end: new Date(2007, 1, 17) },
    { sign: "Rooster", start: new Date(2005, 1, 9), end: new Date(2006, 0, 28) },
    { sign: "Monkey", start: new Date(2004, 0, 22), end: new Date(2005, 1, 8) },
    { sign: "Goat", start: new Date(2003, 1, 1), end: new Date(2004, 0, 21) },
    { sign: "Horse", start: new Date(2002, 1, 12), end: new Date(2003, 0, 31) },
    { sign: "Snake", start: new Date(2001, 0, 24), end: new Date(2002, 1, 11) },
    { sign: "Dragon", start: new Date(2000, 1, 5), end: new Date(2001, 0, 23) },
    { sign: "Rabbit", start: new Date(1999, 1, 16), end: new Date(2000, 1, 4) },
    { sign: "Tiger", start: new Date(1998, 0, 28), end: new Date(1999, 1, 15) },
    { sign: "Ox", start: new Date(1997, 1, 7), end: new Date(1998, 0, 27) },
    { sign: "Rat", start: new Date(1996, 1, 19), end: new Date(1997, 1, 6) },
    { sign: "Boar", start: new Date(1995, 0, 31), end: new Date(1996, 1, 18) },
    { sign: "Dog", start: new Date(1994, 1, 12), end: new Date(1995, 0, 30) },
    { sign: "Rooster", start: new Date(1993, 0, 23), end: new Date(1994, 1, 9) },
    { sign: "Monkey", start: new Date(1992, 1, 4), end: new Date(1993, 0, 22) },
    { sign: "Goat", start: new Date(1991, 1, 15), end: new Date(1992, 1, 3) },
    { sign: "Horse", start: new Date(1990, 0, 27), end: new Date(1991, 1, 13) },
    { sign: "Snake", start: new Date(1989, 1, 6), end: new Date(1990, 0, 25) },
    { sign: "Dragon", start: new Date(1988, 1, 17), end: new Date(1989, 1, 4) },
    { sign: "Rabbit", start: new Date(1987, 0, 29), end: new Date(1988, 1, 16) },
    { sign: "Tiger", start: new Date(1986, 1, 9), end: new Date(1987, 0, 28) },
    { sign: "Ox", start: new Date(1985, 1, 20), end: new Date(1986, 1, 7) },
    { sign: "Rat", start: new Date(1984, 1, 2), end: new Date(1985, 1, 19) },
    { sign: "Boar", start: new Date(1983, 1, 13), end: new Date(1984, 1, 1) },
    { sign: "Dog", start: new Date(1982, 0, 25), end: new Date(1983, 1, 11) },
    { sign: "Rooster", start: new Date(1981, 1, 5), end: new Date(1982, 0, 24) },
    { sign: "Monkey", start: new Date(1980, 1, 16), end: new Date(1981, 1, 4) },
    { sign: "Goat", start: new Date(1979, 0, 28), end: new Date(1980, 1, 15) },
    { sign: "Horse", start: new Date(1978, 1, 7), end: new Date(1979, 1, 26) },
    { sign: "Snake", start: new Date(1977, 1, 18), end: new Date(1978, 1, 6) },
    { sign: "Dragon", start: new Date(1976, 0, 31), end: new Date(1977, 1, 17) },
    { sign: "Rabbit", start: new Date(1975, 1, 11), end: new Date(1976, 0, 30) },
    { sign: "Tiger", start: new Date(1974, 0, 23), end: new Date(1975, 1, 10) },
    { sign: "Ox", start: new Date(1973, 1, 3), end: new Date(1974, 0, 22) },
    { sign: "Rat", start: new Date(1972, 0, 16), end: new Date(1973, 1, 2) },
    { sign: "Boar", start: new Date(1971, 0, 27), end: new Date(1972, 0, 15) },
    { sign: "Dog", start: new Date(1970, 1, 6), end: new Date(1971, 0, 25) },
    { sign: "Rooster", start: new Date(1969, 1, 17), end: new Date(1970, 0, 5) },
    { sign: "Monkey", start: new Date(1968, 0, 30), end: new Date(1969, 1, 16) }
  ];  

  // Check which zodiac the birthday falls into
  for (const zodiac of zodiacSigns) {
    if (birthday >= zodiac.start && birthday <= zodiac.end) {
      return zodiac.sign;
    }
  }

  return ''; // Default if no match found
};
