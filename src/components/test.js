let arr = ['A','B','C'];

arr.forEach((name, index) => {
console.log(`${index+1}.${name}`)
});

let arr_n = [1,2,3,4,5];

const result = arr_n.find((item)=> {
    return item % 2  === 0;
});

console.log(result)

let userList = [
    { name: 'Mike', age: 25 },
    { name: 'Jane', age: 15 },
];
                
const result2 = userList.find((user)=> {
    if(user.age < 19) {
        return true;
    }
    return false;   
 });
 console.log(result2);

 //map: 함수를 받아 특정 기능을 시행하고 새로운 배열을 반환하는 메서드

 let newUserList = userList.map((user, index) => {
     return Object.assign({}, user, {
        isAdult: user.age > 19
     });
 });
console.log(newUserList);