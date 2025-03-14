export const currentDate = (date: Date): string => {
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDate = {
  // Форматирование ISO-строки в читаемую дату
  toReadable(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  },

  // Преобразование читаемой даты обратно в ISO-формат
  toISO(readableDate: string): string | null {
    const parts = readableDate.match(/(\d+)\s(\w+)\s(\d+)/);
    if (!parts) return null;

    const [_, day, month, year] = parts;

    // Соответствие русских названий месяцев их индексам
    const monthMap: Record<string, number> = {
      январь: 0,
      февраль: 1,
      март: 2,
      апрель: 3,
      май: 4,
      июнь: 5,
      июль: 6,
      август: 7,
      сентябрь: 8,
      октябрь: 9,
      ноябрь: 10,
      декабрь: 11,
    };

    const monthIndex = monthMap[month.toLowerCase()];
    if (monthIndex === undefined) return null;

    // Создаем дату в ISO-формате
    const date = new Date(Number(year), monthIndex, Number(day));
    return date.toISOString();
  },
};
