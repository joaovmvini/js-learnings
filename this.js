{
  /* Example 1: This utility */

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
