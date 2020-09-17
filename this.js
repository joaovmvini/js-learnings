{
  /* Example 1: Binding explícito */

  function identify() {
    return this.name.toUpperCase();
  }

  function speak() {
    let greeting = "Hey! I'm " + identify.call(this);
    console.log(greeting);
  }

  let me = {
    name: "JPro",
  };

  let you = {
    name: "Reader",
  };

  console.log(identify.call(me));
  // retornará "JPro", pois com o método .call
  // estamos atribuindo o contexto do this do objeto "me"
  // para o contexto da função "identify"
}

/* Example 2: binding implícito */

/* this é um binding feito para cada invocação de função, baseado inteiramente no seu call-site (como a função é chamada).
 * call-site: o lugar no código onde a função é chamada (não onde ela é declarada).
 * o call-site tem um objeto como contexto, também chamado de objeto proprietário ou que contêm
 */

{
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2,
    foo: foo,
  };

  obj.foo(); // -> retornará 2, porque o objeto de contexto do call-site de foo é "obj"
}

/* Example 3: binding implícito */

// Apenas o topo/último nível de uma cadeia de propriedade de um objeto referênciado é o que importa para o call-site.
{
  function foo() {
    console.log(this.a);
  }
  let obj2 = {
    a: 42,
    foo: foo,
  };

  let obj1 = {
    a: 2,
    obj2: obj2,
  };

  obj1.obj2.foo(); // 42
}

/* Example 4: perda implícita */

{
  function foo() {
    console.log(this.a);
  }
  let obj = {
    a: 2,
    foo: foo,
  };
  let bar = obj.foo;
  let a = "global!";

  bar(); // global -> perda implícita
}

/* Example 4: mais binding explícito */

{
  function foo() {
    console.log(Object.keys(this));
  }

  foo.call({ a: 1, b: 2, c: 3 }); // ['a','b','c']
}

{
  function foo() {
    console.log(this.length);
  }

  foo.call("Hello World"); // 11
}

/* Example 5: Hard binding */

{
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2,
  };

  var bar = function () {
    foo.call(obj);
  };

  bar(); // 2
  setTimeout(bar, 100); //

  /* 
   * Chamamos de hard binding porque não importa o quão tarde
     chamemos a função bar(), o binding do this sempre estará
     apontando para o objeto "obj", já que forçamos o binding
     com a chamada .call(obj) em foo.
  */
}

/* Example 6: mais hard binding */

{
  function foo(something) {
    console.log(this.a, something);
    return this.a + something;
  }

  let obj = {
    a: 2,
  };

  let bar = foo.bind(obj);
  let b = bar(5);
  console.log(b); // retorna 7 (5 + 2)

  /* o que acontece acima é que a função nativa .bind() nos retorna
     uma nova função que chama a função original com o contexto
     do this definido como especificamos. Nesse caso usamos "obj".
  */
}
