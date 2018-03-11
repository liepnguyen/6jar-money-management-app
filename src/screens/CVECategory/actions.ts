import { createAction, createAsyncAction } from '../../utils/redux';

const NAMESPACE = 'CVE_CATEGORY';

export const changeFormValue = createAction(NAMESPACE, 'CHANGE_FORM_VALUE');
export const saveCategoryAsync = createAsyncAction(NAMESPACE, 'SAVE_CATEGORY');
export const deleteCategoryAsync = createAsyncAction(NAMESPACE, 'DELETE_CATEGORY');
export const setupNewCategory = createAction(NAMESPACE, 'SETUP_NEW_CATEGORY');
export const loadCategory = createAction(NAMESPACE, 'LOAD_CATEGORY_BY_ID');