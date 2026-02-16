import {createComparison, defaultRules} from "../lib/compare.js";

// Настройка компаратора
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // Заполнение выпадающих списков опциями
    Object.keys(indexes)
        .forEach(elementName => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const optionElement = document.createElement('option');
                        optionElement.value = name;
                        optionElement.textContent = name;
                        return optionElement;
                    })
            )
        })
    
    return (data, state, action) => {
        // Обработка очистки поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input');
            input.value = '';
            state[field] = ''
        }
        
        // Возвращаем отфильтрованные данные, используя компаратор
        return data.filter(row => compare(row, state));
    }
}