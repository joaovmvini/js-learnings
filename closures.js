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
