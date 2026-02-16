import { createComparison, defaultRules } from "../lib/compare.js";

// Настройка компаратора
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // Заполнение выпадающих списков опциями
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        const optionElement = document.createElement("option");
        optionElement.value = name;
        optionElement.textContent = name;
        return optionElement;
      })
    );
  });

  return (data, state, action) => {
    // Обработка очистки поля
    if (action?.name === "clear") {
      const field = action.dataset.field;
      const input = action.parentElement?.querySelector("input");
      if (input) input.value = "";
      if (field) state[field] = "";
    }

    // Собираем диапазон суммы в total: [from, to]
    const target = { ...state };

    const from = target.totalFrom;
    const to = target.totalTo;

    if (from !== "" || to !== "") {
      target.total = [
        from === "" ? undefined : Number(from),
        to === "" ? undefined : Number(to),
      ];
    }

    delete target.totalFrom;
    delete target.totalTo;

    // Возвращаем отфильтрованные данные, используя компаратор
    return data.filter((row) => compare(row, target));
  };
}
