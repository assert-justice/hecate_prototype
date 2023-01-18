# Hecate
A friendly functional language

## Introduction
Hecate is a functional scripting language designed to be easy to use and friendly to newcomers without sacrificing speed or expressiveness.

While Hecate is a general use language I designed it for easy embedding in C and C++ applications. I've reviewed many languages for this purpose (Lua, Wren, Python, JavaScript, TypeScript, C#, Haxe) and found them all lacking for one or more reasons. These are the features I considered while reviewing my options:

- Static typing with quality compiler errors. Statically typed languages catch so many classes of error before any code is run. Indispensable. 
- High quality embedding api. The language should have a pleasant to use ergonomic api with bindings for C and C++.
- Easily sandboxed. When embedding the outer application should be able to control a script's access to the operating system easily.
- Portable, cross platform, easy to get running on any system that supports C.
- High quality runtime errors. Runtime errors should be easy to track down. Rules out transpiling without a source map.
- Can be AoT compiled to a dll or static lib for C/C++.
- A 'pit of success' where application specific rules can be enforced at compile time. In particular support an external garbage collector.
- Easy onboarding process for programmers with a background in popular languages.

Some of those priorities are more important than others but the bottom line was that I was unsatisfied with the options available to me. So in a fit of hubris I made my own.

> Why a Functional Language? For the last 10+ years more mainstream languages have been pilfering ideas from functional languages. Functional languages have lots of nice properties for writing secure predictable code. So why haven't they taken off? I think a big part of it is the intimidating syntax that they typically have, more like mathematical notation then C. This notation is elegant and expressive but foreign and intimidating to folks coming from an imperative or OOP background. Perhaps there is room for a functional language that looks more like TypeScript than Haskell.

## Quick Examples

### Hello World

```
let system = import('system');
let message = 'Hello Hecate!';
system.print(message);
```

Looks pretty straightforward so far! A couple things to note:

Variables in Hecate are constant and immutable. They cannot be modified or reassigned. The following code produces an error:

### Prime Test

```
math = import('math');

isPrime :: integer => bool;
isPrime = (x) => {
    root = x.math.sqrt().integer();
    anon: integer => bool;
    anon = (n) => {
        if n > root {false} 
        elif x % n == 0 {false} 
        else {anon(n + 2)}
    };
    if x == 1 {false}
    else {anon(2)}
};
```

## Data Types
Hecate is a statically typed language. Like most modern statically typed languages it features type inference but type hints are often needed.

### Numeric Types
Hecate supports `int8`, `uint8`, `int16`, `uint16`, `int32`, `uint32`, `int64`, `uint64`, `int` (an alias for `int64`), and `size` (an alias for `uint64`) as well as an arbitrarily large `integer` type.
It also supports `f32`, `f64`, and `float` (an alias for `f64`).

Hecate will silently convert a smaller datatype into a larger one if they are compatible. E.g. if an `int32` is stored in a variable with the type `int64` the `int32` will be converted to the larger type automatically. The reverse is *not* true, Hecate requires you to explicitly convert a larger type to a smaller one with the understanding it could result in a loss of data. Signed and unsigned numbers must always be explicitly converted as well as floats to integers or integers to floats.

Underflows and overflows are *not* runtime errors in Hecate.

### Lists

## Functions

### Uniform Function Call