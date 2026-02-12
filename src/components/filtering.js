import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes) // Получаем ключи из объекта
    .forEach((elementName) => {
      // Перебираем по именам
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            // используйте name как значение и текстовое содержимое
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            return option;
          }),
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    document.addEventListener("click", (e) => {
      const btn = e.target;

      // Проверяем, что это кнопка очистки
      if (btn.tagName === "BUTTON" && btn.name === "clear") {
        const fieldName = btn.dataset.field; // атрибут data-field на кнопке
        const parent = btn.parentElement;

        // Находим все поля input/select внутри родителя кнопки
        const field = parent.querySelector("input, select");

        if (field) {
          // Сбрасываем UI
          if (field.tagName === "SELECT") {
            field.selectedIndex = 0;
          } else {
            field.value = "";
          }

          // Сбрасываем состояние в state
          if (state && fieldName in state) {
            state[fieldName] = "";
          }
        }
      }
    });

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
