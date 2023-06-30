```ts
const f = { a: 1 };
const g = { b: 1 };
const h = [12, 13];
const i = [12, 13, { a: 1 }];
const j = [12, 13, { b: 1 }];
export const ee = {
	"dfdf": 3,
	[f]: 4, // "[object Object]"
	[g]: 5, // "[object Object]"
	[h]: 6, // "12,13"
	[i]: 7, // "12,13,[object Object]"
	[j]: 8, // "12,13,[object Object]"
	"[object Object]": 9,
}

console.log(ee);
console.log(ee[f], "<-- F");
console.log(ee[g], "<-- G");
console.log(ee[h], "<-- H");
console.log(ee[i], "<-- I");
console.log(ee[j], "<-- J");

const t = new Map();
t.set(f, 4);
t.set(g, 5);
t.set(h, 6);
t.set(i, 7);
t.set(j, 8);
j.push(89); // j reference didn`t change
console.log(t.get(f), "<--F")
console.log(t.get(g), "<--G")
console.log(t.get(h), "<--H")
console.log(t.get(i), "<--I")
console.log(t.get(j), "<--J")
```