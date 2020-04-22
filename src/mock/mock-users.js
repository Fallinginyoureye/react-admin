import {getUsersByPageSize} from './mockdata/user';
import Mock from "mockjs";

export default {
    'post /mock/login': (config) => {
        const {
            userName,
            password,
        } = JSON.parse(config.data);
        return new Promise((resolve, reject) => {
            if (userName !== 'admin' || password !== '111') {
                setTimeout(() => {
                    reject({
                        code: 1001,
                        message: '用户名或密码错误',
                    });
                }, 1000);
            } else {
                setTimeout(() => {
                    resolve([200, {
                        id: '1234567890abcde',
                        name: 'MOCK 用户',
                        loginName: 'MOCK 登录名',
                    }]);
                }, 1000);
            }
        });
    },
    'post /mock/logout': {},

    'get /mock/users': (config) => {
        const {
            pageSize,
            pageNum,
        } = config.params;


        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, {
                    pageNum,
                    pageSize,
                    total: 888,
                    list: getUsersByPageSize(pageSize),
                }]);
            }, 1000);
        });
    },
    'get re:/mock/users/.+': {id: 1, name: '熊大', age: 22, job: '1', position: '1'},
    'post /mock/users': true,
    'put /mock/users': true,
    'delete /mock/users': true,
    'delete re:/mock/users/.+': true,

    'get /test-ajax': (config) => {
        const {
            name,
            age,
            job,
            position,
            mobile,
            email,
        } = config.params;


        function getDatasByParams(name, age, job, position, mobile, email) {
            const list = [];
            for (var i=0; i<=9; i++) {
                list.push(Mock.mock({'id':i, 'name':name+i, 'age':i+age, 'job':job, 'position':position, 'mobile':mobile, 'email':email}));
            }
            return list;
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, {
                    name,
                    age,
                    job,
                    position,
                    mobile,
                    email,
                    total: 888,
                    list: getDatasByParams(name, age, job, position, mobile, email),
                }]);
            }, 1000);
        });
    },
}
