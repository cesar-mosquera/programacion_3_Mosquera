// Valores FALSY — los únicos 6 que existen en JavaScript
false
0
""          // string vacío
null
undefined
NaN

// Todo lo demás es TRUTHY — incluyendo estos casos que sorprenden:
"false"     // truthy — string no vacío (aunque diga "false")
"0"         // truthy — string no vacío
[]          // truthy — array vacío
{}          // truthy — objeto vacío
-1          // truthy — número distinto de 0

// Verificar con Boolean()
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean("false"));  // true  ← ojo, string no vacío
console.log(Boolean([]));       // true  ← array vacío es truthy

