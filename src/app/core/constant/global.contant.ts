export const GLOBAL_CONSTANT = {
    API_METHODS:{
        GET_ALL_CLIENT: 'GetAllCustomers',
        SAVE_CLIENT: 'AddCustomer',
        UPDATE_CLIENT:'UpdateCustomer',
        GET_CLIENT_BY_ID:'GetCustomerById/',
        DELETE_CLEINT:'DeleteCustomer?id=',
        LOGIN: 'login',
        CREATE_WAREHOUS:'AddWarehouse',
        GET_ALL_WAREHOUSE:'GetAllWarehouses',
        GET_SINGLE_WAREHOUS:'GetWarehouseById?id=',
        GET_ALL_EMPLOYEE:'GetAllEmployees',
        SAVE_EMPLOYEE:'AddEmployee',
        UPDATE_EMPLOYEE:'updateEmployee/',
        GET_EMPLOYEE_BY_ID:"GetEmployeeById/",
        GET_SPACE_BY_WAREHOUSE_ID: 'GetAllSpaces?warehouseId=',
        ADD_SPACE: 'addspace'
    },
    ROLES: ['Admin','Manager','Employee','SuperAdmin'],
    LOCAL_LOGIN_KEY:'warehouseUser',
    LOCAL_TOKEN_KEY:'warehouseToken',
    REG_EX: {
        EMAIL:'',
        AADHAR_CARD:''
    },
    VALIDATION_TEXT:{
        REQUIRED: 'This is Mandatory',
        EMAIL:'Provide Proper Email',
        AADHAR_CARD:'Aadhar Card has to be 12 Digit Numnber only' 
    }
}