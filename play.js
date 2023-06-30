const hashString = (string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

const run = (key, capacity) => {
	const hash = hashString(key);
	const idx = (hash & 0x7fffffff) % capacity;
	console.log({ key, hash, idx });
};

const runMany = (keys, capacity) => {
	keys.forEach((key) => run(key, capacity));
};

const keys = ["jar", "bar", "car", "tar", "ear", "far"];
// runMany(keys, 8)
// runMany(keys, 16)

/*
This is seperate chaining
0 - 
1 - 
2 - 
3 - jar -> bar
4 - car
5 - tar
6 - ear
7 - far, TomCruise
*/

/*
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
*/

/*
const table = [];

const probing = (hash, _a) => 17 * hash

const main = (key, capacity) => {
	let a = 1;
	const hash = hashString(key);
	let idx = (hash & 0x7fffffff) % capacity;

	while (table[idx] != null) {
		idx = (hash + probing(hash, a)) % capacity;
		a += 1;
	}
	table[idx] = "--some-value--"
	console.log({ key, idx }, "D")
}

for (const i of keys) main(i, 16)
*/

const base = (cons, capacity, nIdx) => (i) => {
	return (nIdx + cons * i) % capacity;
};

const linear = (constant, capacity = 128) => {
	const ll = base(constant, capacity, 213);
	console.log("---constant = ", constant, "--------");
	const all = {};
	for (let i = 0; i < capacity; i++) all[i] = true;
	for (let i = 0; i < capacity; i++) {
		const newIdx = ll(i);
		delete all[newIdx];
	}
	console.log(Object.keys(all).length, "REMAINING");
};
linear(17);
linear(4);
linear(16);
linear(9);
linear(7);
