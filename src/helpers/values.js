export const arrayValues = [
    { 
      text: "Увеличить",
      fn: (setCounter) => setCounter(prev => prev+1)
    }, 
    { 
      text: "Сбросить",
      fn: (setCounter) => setCounter(0)
    }, 
    { 
      text: "Случайное значение",
      fn: (setCounter) => {
        const rand = Math.floor(Math.random() * 11);
        setCounter(rand)
      }
    }, 
    { 
      text: "Уменьшить",
      fn: (setCounter) => setCounter(prev => prev-1)
    }
];