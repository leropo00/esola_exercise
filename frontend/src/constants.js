const HTTP_CODE_SUCCESS = 200
const HTTP_CODE_CREATED = 201
const HTTP_CODE_NO_CONTENT = 204
const HTTP_CODE_CLIENT_ERROR = 400
const HTTP_CODE_UNAUTHORIZED = 401
const HTTP_CODE_NOT_FOUND = 404
const HTTP_CODE_INVALID_DATA = 422
const HTTP_SERVER_ERROR = 500

const ITEM_STATUS_UNCHECKED = 'unchecked'
const ITEM_STATUS_IN_SHOPPING = 'in_shopping'
const ITEM_STATUS_CHECKED = 'checked'

const URL_CSRF_COOKIE = '/sanctum/csrf-cookie'

const URL_REGISTER = '/auth/register'
const URL_LOGIN = '/auth/login'
const URL_LOGOUT = '/auth/logout'

const URL_GET_USER = '/api/user'

const URL_GET_PURCHASE_ITEMS = '/api/purchase_items'
const URL_DELETE_ALL_PURCHASE_ITEMS = URL_GET_PURCHASE_ITEMS
const URL_DELETE_PURCHASE_ITEM = URL_DELETE_ALL_PURCHASE_ITEMS + '/'

const URL_CREATE_PURCHASE_ITEM = URL_GET_PURCHASE_ITEMS
const URL_UPDATE_PURCHASE_ITEM = URL_GET_PURCHASE_ITEMS + '/'

const URL_EXPORT_JSON = '/api/purchase_list_data'
const URL_IMPORT_JSON = URL_EXPORT_JSON

const URL_START_SHOPPING = '/api/shopping_list'
const URL_CHECK_QUANTITY_SHOPPING = '/api/shopping_list/'
const URL_FINISH_SHOPPING = '/api/shopping_list/finish'

const PURCHASE_LIST_EVENT_ADD        = 'add';
const PURCHASE_LIST_EVENT_IMPORT     = 'import';
const PURCHASE_LIST_EVENT_UPDATE     = 'update';
const PURCHASE_LIST_EVENT_SHOPPING   = 'shopping';
const PURCHASE_LIST_EVENT_DELETE 	   = 'delete';
const PURCHASE_LIST_EVENT_DELETE_ALL = 'delete_all';

const EVENTS_TRIGGERING_REQUEST = [
  PURCHASE_LIST_EVENT_ADD, 
  PURCHASE_LIST_EVENT_IMPORT,
  PURCHASE_LIST_EVENT_UPDATE,
  PURCHASE_LIST_EVENT_SHOPPING,
];

export {
  EVENTS_TRIGGERING_REQUEST,
  PURCHASE_LIST_EVENT_DELETE,
  PURCHASE_LIST_EVENT_DELETE_ALL,
  HTTP_CODE_SUCCESS,
  HTTP_CODE_CREATED,
  HTTP_CODE_NO_CONTENT,
  HTTP_CODE_CLIENT_ERROR,
  HTTP_CODE_UNAUTHORIZED,
  HTTP_CODE_NOT_FOUND,
  HTTP_CODE_INVALID_DATA,
  HTTP_SERVER_ERROR,
  ITEM_STATUS_UNCHECKED,
  ITEM_STATUS_IN_SHOPPING,
  ITEM_STATUS_CHECKED,
  URL_CSRF_COOKIE,
  URL_REGISTER,
  URL_LOGIN,
  URL_LOGOUT,
  URL_GET_USER,
  URL_GET_PURCHASE_ITEMS,
  URL_DELETE_ALL_PURCHASE_ITEMS,
  URL_CREATE_PURCHASE_ITEM,
  URL_DELETE_PURCHASE_ITEM,
  URL_UPDATE_PURCHASE_ITEM,
  URL_EXPORT_JSON,
  URL_IMPORT_JSON,
  URL_START_SHOPPING,
  URL_CHECK_QUANTITY_SHOPPING,
  URL_FINISH_SHOPPING,
}
