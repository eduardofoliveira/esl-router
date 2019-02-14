async function getSomeValue() {
  if (true) {
    throw new Error('uh oh');
  } else {
    return 'Yay!';
  }
}

async function funcao() {
  try {
    // "await" will wait for the promise to resolve or reject
    // if it rejects, an error will be thrown, which you can
    // catch with a regular try/catch block
    const someValue = await getSomeValue();
    doSomethingWith(someValue);
  } catch (error) {
    console.error(error);
  }
}

funcao()