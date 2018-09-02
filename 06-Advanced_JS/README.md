# Advanced JS

### 1. Creating Object Instance

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

### Prototype

1. ```javascript
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



Go back to top testing 

* [top](advanced-js)

