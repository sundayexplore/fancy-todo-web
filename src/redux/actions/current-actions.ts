import { IAction } from '@/typings';

export const setSelectedTodoCategory = (selectedTodoCategory: 'today'): IAction => ({
  type: 'SET_SELECTED_TODO_CATEGORY',
  payload: {
    selectedTodoCategory
  }
});
