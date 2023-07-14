// const memory1 = new ArrayBuffer(13);
// 13 bytes long continuous memory or 13 * 8 bits

const memory1 = new ArrayBuffer(13);
console.log(memory1);
// Uint8Array uses 1 byte for storing an single array item
// thus, array length = 13;
const array1 = new Uint8Array(memory1);
console.log("array1 length is ", array1.length);
// 1. if number not in u8 range => number%256 is used
// 2. if index > length => ignored
array1[11] = -2057;
array1[12] = 258;
array1[112] = 2034;
array1[10] = 20;
console.log(memory1, array1);
console.log(array1[11], array1[12], array1[112], array1[10]);

// bytes length of Unit16Array should be multiple of 2, else error
const memory2 = new ArrayBuffer(22);
// Uint16Array uses 2 bytes for storing an single array item
// Thus, array length = 11
const array2 = new Uint16Array(memory2);
console.log("array2 length is ", array2.length);

// byte length of Uint32Array should be a multiple of 4, else error
const memory3 = new ArrayBuffer(16);
// Uint32Array uses 4 bytes for storing an single array item
// Thus, array length = 4
const array3 = new Uint32Array(memory3);
console.log("array3 length is ", array3.length);

/*
Using above, we can start creating staticArrays for storing u8, u16,u32 numbers
in javascript
*/

const buf = Buffer.alloc(8); // 8 byte memory reserved
buf.write("a", "utf-8"); // a written in first index, a = 97
console.log(buf); // <Buf 61 00 00 00 00 00 00 00>, 61 is hexadecimal for 97
console.log(buf.toJSON()); // { type: 'Buffer', data: [97, 0, 0, 0, 0, 0, 0, 0] } // decimal values
console.log(buf[1]); // 0
console.log(buf[0]); // 97
