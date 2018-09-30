# Advanced JS

### 1. Way to Create Object Instance

* #### Using `new`

  let obj = new Object();

  let arr = new Array();

  let str = new String();

* #### 字面量的方式

  ```javascript
  let obj2 = {
  	name:"Pintaigao",
    	age:1
    	eat:() => {
    		console.log("eat")
    	}
    }
  ```

* #### Factory Way

  ```javascript
  let obj = new Object();
  obj.name = "Pintaigao";
  obj.eat = () => {
      console.log("eat")
  }
  ```

  on factory way, it only can create one object in one time, but how about creating multiply object ? 

  	-- Packaging the function 

  ```javascript
  function createObj(name,age){
      let obj = new Object();
      obj.name = name;
      obj.age = age;
      return obj;
  }
  
  let obj1 = createObj("Pintaigao",1)
  let obj2 = createObj("Pintaigao2",2)
  let obj3 = createObj("Pintaigao3",3)
  let obj4 = createObj("Pintaigao4",4)
  ```

* #### Customize constructor function

  ```javascript
  function Person(name,age){
      this.name = name;
      this.age = age;
      this.say = function(){
          console.log("Hello")
      }
  }
  // initiate instance
  let person = Person("Pintaigao",1)
  ```

  Aboved, doing four things:

  - Initiating memory space and storing the new instance

  - Referencing `this` to the current instance

  - Assigning value to property or setting the method

  - return the instance

### 2. Prototype

* Example

  ```javascript
     function Person(name,age){
         this.name = name;
         this.age = age;
         this.sayName = () => {
             console.log(this.name)
         }
     }
     
     // Initiate Instance
     let p1 = new Person("Pintaigao",1)
     let p2 = new Person("Gaotaiping",2);
     p1.sayName();
     p2.sayName(); // will output the same value
     
     /* but sayName funciton are not the same one in Person, beacuse each instance has its own sayName(), it is not sharable */
     console.log(p1.sayName === p2.sayName); // false
     
     /* So now we have a problem, how to shared the funciton between the instance which type is same --- Prototype*/
     Person.prototype.sayName = function(){
         console.log("Hello")
     }
     p1.sayName() === p2.sayName() // true,becaue now the sayName function is sharable 
     p1._proto_.sayName() === p2._proto_.sayName() // same with aboved
     p1._proto_ = Person.prototype // true, pointing to the same object
  ```

     So the purpose of prototype:

     1. **Solving property sharing between relative instance and saving memory**
        * Inside the instace a property call `_proto_`, it is also a instance, used by browsers

        * In instance `p1`, it can directly access `sayName()` funtion, via `_proto_`, and `p1`'s  constructor function ( which is `Person`) have that function inside its `prototype`, both `p1` instance's `_proto_` and `Person` 's `prototype` referencing to the same object, then `p1` instance can directly access to the method which inside that same referencing `prototype`

     2. **Constructor**

        * `Person.prototype.constructor === Person` return true

        * Prototype 中的 Constructor 指的就是原型对象所在的构造函数

     3. **Prototype Channing**
        * A relationship between instance and its belonging prototype
        * Instance's `_proto_` refering to its belonging constructor function's `prototype`
        * Also inside the `Prototype` ,there is a `_proto_`, and it point to `Object`'s Prototype, e.g: `Person.prototype._proto_ === Object.prototype` will return true
        * 当然`Object.prototype._proto_ === null` because `_proto_` doesn't existing in Object.prototype 

     4. **Object call as Function**

        * When initaiting `Person` like these: `function Person()`, initiating it as a Function, and we can see that inside `Person()`, exisiting a 	`prototype` and` _proto_`, which means this Function Expression eventually will become an Object( because `_proto_` inside Instance )

        * for calling Person as a Function, so `_proto` will point to `Function.prototype`

        * As Function is also an Object, so `Function.prototype._proto_ === Object.prototype` will return true

        * **Summary**:

        * ```javascript
          Person()
          Person._proto_ === Function.prototype 
          Function._proto_ === Function.prototype 
          Function.prototype._proto_ === Object.prototype
          Object._proto_ === Function.prototype // because inside _proto_ indicate it is a function
          ```

          <img alt= 'relationship_map' src ="https://github.com/hptg1994/OpenCourse_Docuement/blob/master/06-Advanced_JS/resource/relationship.png">

### 3. Inherit

- It is a feature of Prototype ( to change to reference of subclass to father's class )

  People —— Name, Gender, Age, Role

  ```javascript
  function Person(name, age, sex){
      this.name = name;
      this.age = age;
      this.sex = sex;
  }
  Person.prototype.eat = function(){
  	// do something
  }
  
  // create a student function
  function Student(sex){
      this.sex = sex
  }
  /* we want student also have a eat activity, so we can use prototype to implement*/
  Student.prototype = new Person("Pintaigao",1)
  let stu = new Student("Male")
  stu.name === "Pintaigao" // Inherit from Person
  stu.age === 1 // Inherit from Peron
  stu.sex === "Male" // Student's own property
  stu.eat(); // also able to use
  
  ```

* Copy  inherit

  **Shallow copy:** Object 1 and Object 2 point to the same memory address, so when changing a property' value from Object 1, will also change the Object 2's 

  ```javascript
  var obj1 = {
      age:20,
      cat:["大黄"，“加菲猫”]
  }
  
  let obj2 = obj1;
  ```



  **Deep copy:** copy one object's all property or attribut or method to another object ( property will be copy one by one, will using recursion to do it ),so now you will get two independent object

  ```javascript
  let obj1 = {
      age:10,
      sex:"男"，
      car:["奔驰"，"宝马"，"特斯拉"，"奥拓"]，
      dog:{
      	name:"大黄"，
  	    age: 5,
      	color:"黄色"
  	}
  }
  
  // Empty Object
  let obj2 = {}
  
  /* a -> current obejct, b -> target object, copy all te property from a to b */
  function extend(a,b){
     // iterate
      for(let key in a){
          let item = a[key]
      	// check if item is array or object
          if(item instanceof Array){
          	// add a array to b     
              b[key] = [];
              // recursion
              extend(item,b[key])
          }else if(item instanceof Object){
              // add a object to b
              b[key] = {};
              extend(item,b[key])
          }else{
              b[key] = item; // directly assign to b
          } 
      }
  }
  // call it
  extend(obj1,obj2);
  
  ```

* 对象冒充：看起来是继承了，实际上没有

  ```javascript
  // consturctor
  function Animal(name,color){
      this.name = name;
      this.color = color;
  }
  
  // add method through prototype
  Animal.prototype.eat = function(){
      // do somethings
  }
  
  // 构造函数
  function Dog(name,color,age){
      this.age = age;
      this.Animal = Animal;
      this.Animal(name,color);
      delete this.Animal;
  }
  let dog = new Dog("大黄"，"黄色"，20);
  // 此时 dog.name == ‘大黄’ 是成立的，同样dog.color = "黄色" 也是成立的
  // 但是，
  dog.eat() // 是会报错的 ！！！，因为name和color，Dog中只是借用了Animal中的name  和color，并没有继承Animal ！！！
  ```

* 改变原型的指向，一定要注意的事情，when you change One obj's prototype , oen things that you must take a tension

```javascript
Person.prototype = {
    name:'Pintaigao He',
    age:1,
    sex:"male"
    ....blablab,
    !!!!!! -> constructor:Person // consturctor need to point back to Person !!!! because for now you direct assign one object to Person,it will lose the constructor property !!!
}
```

* **Dynamic Prototype:** it will make the syntax more like doing oop stuff

  ```javascript
  function Person(name,age){
      this.name = name;
      this.age = age;
  // 每次把原型的方法写在构造函数外部很麻烦，所以，可以这么写
  // 在构造函数初始化的时候直接添加原型方法（如果构造函数没有初始化，那么原型方法也不会添加，只要实例化对象那么就会有原型方法）
  	if(typeof Person.init == "undefined"){
      	// Prototype
  	    Person.prototype.sayHi = function(){
      	    // do somethings
  	    };
      	Person.init = true
  	}
  }
  
  let p = new Person("Pintaogao",1);
  p.sayHi(); // 成立的
  ```

* Sandbox

  ```javascript
  (function(){
      // 通过原型的方式为系统的对象添加原型方法
      // 字符串有没有可以干掉字符串中所有空格的方法呢？没有～
      String.prototype.myTrim = function(){
          return this.replace(/\s*/ig,"")
      }
  })();
  
  let str = ",ksm do kc oam.  "
  str.myTrim() ====> "will trim all the space";
  
  // so it won't contaminate the global environment 
  ```

**判断Object中的某个属性是本身就有还是继承来的三种方法：**

* 1.分辨property 在哪个obj中 **hasOwnProperty**，但是，这个方法没有被保护，所以可以被随便更改，

  ```javascript
  let myObj = {
      age:1,
      // 给人的感觉是调用了系统的方法
      hasOwnProperty:function(){
          return false;
      }
  }
  console.log(myObj.hasOwnProperty()) ===> "false" ===> "not safe"
  // so safer hasOwnProperty
  **console.log(object.property.hasOwnProperty.call(myObj,"age"));**
  ```

* 2.判断对象p是不是另一个实例对象的原型(**isPrototypeOf()**)

  ```javascript
  function Teacher(){   
  }
  
  let p = new Person("Pintaigao"，1); // p is Person's instance
  Teacher.protoptype = p; // Teacher's inherit Person
  let t = new Teacher(); // t is Teacher's instance
  console.log(p.isPrototypeOf(t)) // true !!!
  ```

* 3.Iterate the Property in Obj:

  ```javascript
  function Person(name,sex){
      this.name = name;
      this.sex = sex;
  }
  
  Person.prototype.height = "170";
  Person.prototype.eat = function(){
  	// do something
  }
  
  let p = new Person(.....);
  
  for(let key in p){
      console.log(key) ======> "all the property will be iterated"
  }
  // 判断这个属性是不是当前对象可以枚举的属性
  console.log(p1.propertyIsEnumerable("sex"));
  /* 返回true的条件
  	1.这个属性必须是属于实例对象的，并且不属于原型中
  	2.这个属性必须是可枚举的，也就是自定义属性
  	3.如果对象没有指定的属性，该方法返回的是false
  */
  ```


### 4. 闭包：

​	闭包:一个函数A中包含了另一个函数B,函数B中可以访问函数A中的变量,嵌套关系

​	闭包模式:函数式闭包,对象式闭包

​	闭包的优点及缺点:延长作用域链,缓存数据(缓存数据的,这个也是缺点)



* 函数式闭包：函数中有函数

  ```javascript
  function a(age) {
    return function () {
      return age+10;
    }
  }
  console.log(a(20)());
  ```
* 对象式闭包：函数中有对象

  ```javascript
  function f1(age) {
    return {
      age:age+20
    }
  }
  console.log(f1(20).age);
  ```

* 通过闭包缓存数据

  ```javascript
  function f1() {
    var num=parseInt(Math.random()*10+1);
    return num;
  }
  console.log(f1());
  console.log(f1());
  console.log(f1());
  //通过闭包实现,把每次产生的随机数都是一样的来进行缓存
  function f2() {
    var num=parseInt(Math.random()*10+1);
    return function () {
      return num;
    }
  }
  var ff=f2();
  console.log(ff());
  console.log(ff());
  console.log(ff());
  console.log(ff());
  ```

### Apply and Call

* ```javascript
  // 假设
  function f1(x,y){
      console.log("it is being called");
      console.log(this);
      console.log(x+y);
  }
  
  let obj = {
      age:20
  }
  // obj 对象没有可以输出内容的方法，但有一个函数f1可以输出内容并计算两个数字的额，此时可以借用
  // 本身函数中的this是window对象,但是如果有人(对象)借用了这个函数,那么里面的this就是当前的对象了,如果在借用的时候传入的是null,默认就是window对象
  f1.apply(obj,[10,20]);
  f1.call(obj,50,40);
  // apply
  f1.apply(null,[10,20]) ====> "this will be equal to 'window'"
  // call
  f1.call(null,10,20)
  
  /* f1是函数,也是对象,但是f1本身没有添加过apply和call方法,为什么可以直接调用呢? */
  ```

* apply 和 call 方法使用及区别和作用

  首先任何的一个函数都是Funtion的实例对象，就可以使用Function原型中的方法，apply和call实际上都是属于Function的，作用是可以改变this的指向，借用方法，

  - apply的语法：
    - 对象.apply(对象，【参数1，参数2，……..】)

  * call 的语法：

    * 对象.call（对象，参数1，参数2，参数3，……...）

  ```javascript
  //如果想要获取对象的类型是什么样子的?
  console.log(Object.prototype.toString());//[object Object]
  //Array对象的类型是什么样子的
  console.log(Array.prototype.toString());
  console.dir(Array);//此时Array中实际上是有toString方法,但是得不到我们想要的结果
  console.log(Object.prototype.toString.call([]));//[object Array]
  var dt=new Date();
  console.log(dt);
  console.log(Object.prototype.toString.call(new Date()));//[object Date]
  ```

  数组本身遍历的方法：

  ```javascript
  var arr=[10,20,30,40,50];
  arr.forEach(function (ele) {
      console.log(ele);
  });
  //forEach方法本身是属于数组的,字符串是无法使用,我们可以借用
  var str="hello what are you no sha lei";
  [].forEach.apply(str,[function (ele) {
  	console.log(ele);
  }]);
  ```


