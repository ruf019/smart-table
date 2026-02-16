import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // Настройка компаратора
    const compare = createComparison(
        ['skipEmptyTargetValues'],
        [rules.searchMultipleFields(
            searchField,
            ['date', 'customer', 'seller'],
            false
        )]
    )

    return (data, state, action) => {
        // Применяем компаратор
        return data.filter((item) => compare(item, state));
    }
}