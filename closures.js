/* example 1 */

{
  function foo() {
    var a = 1;
    function bar() {
      console.log(a);
    }
    return bar;
  }

  var baz = foo();
  //bar possui uma referência para o escopo de foo, e essa referência
  //é chamada de closure.
  baz(); // -> 1
}

/* example 2 */
{
  function foo() {
    var a = 2;
    function baz() {
      console.log(a);
    }
    bar(baz);
  }
  function bar(fn) {
    fn();
    /* closure: bar está fora do escopo léxico de foo
     * porém sua função é passada como baz, que por sua vez,
     * possui uma referência direta ao escopo léxico de foo,
     * podendo acessar o valor de a; isso é closure. */
  }

  foo();
}

/* example 3: indirect communication */
{
  var fn;
  function foo() {
    var a = 3;
    function baz() {
      console.log(a);
    }
    fn = baz;
  }
  function bar() {
    fn(); // < closure
  }

  foo();
  bar(); // -> 3

  /* Resumo:
   *  Independente da maneira que a gente usar para transportar
   *  uma função para fora do seu escopo léxico ela manterá uma
   *  referência de escopo de onde foi declarada originalmente,
   *  e em sua execução, essa closure vai ocorrer.
   */
}

/* Example 6: Closures + Loops */

{
  for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  }
  /* Bug: será impresso o número 6 em todas as iterações, por quê?
   * isso acontece porquê a função callback timer está sendo chamada
   * apenas quando esse loop já terminou, ou seja, quando i é 6.
   */
}

// Solução: mais closures!

{
  for (var i = 1; i <= 5; i++) {
    (function (i) {
      setTimeout(function timer() {
        console.log(i);
      }, i * 1000);
    })(i);
  }

  /* Adicionando esse bloco IIFE nós temos uma função imediatamente
   * invocada, no escopo léxico do for. Portanto, o i passado como
   * argumento agora guarda uma referência direta para cada iteração
   * do for loop
   */
}

// outra solução

{
  for (var i = 1; i <= 5; i++) {
    let j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  }
}

// ou

{
  for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  }
}
