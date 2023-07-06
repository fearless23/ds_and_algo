# Suffix Array

### What is a suffix? 
A nonempty substring at the end of a string is known as a suffix of a string. i.e suffix is a sub-string but it ends at end of string.

Consider the string `banana` and all of its sub-strings

## substrings of length `l`
- l=1,c=6: b, a, n, a, n, a(suffix)
- l=2,c=5: ba, an, na, an, na(suffix)
- l=3,c=4: ban, ana, nan, ana(suffix)
- l=4,c=3: bana, ananm, nana(suffix)
- l=5,c=2: banan, anana(suffix)
- l=6,c=1: banana(suffix)
Total Substrings = N(N+1)/2 (i.e sum from `1` to `N`)

## suffixes of `banana`
- l=1:      a
- l=2:     na
- l=3:    ana
- l=4:   nana
- l=5:  anana
- l=6: banana
Total Suffixes = `N`

> Note: Any suffix can be represented by starting idx since every suffix will end at end of string.
> so, idx=2 means a suffix starting at index=2 and ends at end i.e `nana`

## suffixes of `banana` represented as starting index
- l=1:      a -> 5
- l=2:     na -> 4
- l=3:    ana -> 3
- l=4:   nana -> 2
- l=5:  anana -> 1
- l=6: banana -> 0

## Now, arrange the suffixes lexico-graphically
-      a -> 5
-    ana -> 3
-  anana -> 1
- banana -> 0
-     na -> 4
-   nana -> 2

## Suffix Array
Now, put the sorted suffixes indices into an array as follows  
```
S = [5,3,1,0,4,2]  
```
S is known as `Suffix Array`  
So, a suffix array is the indices of sorted suffixes of a string

## LCP Array
- LCP: Longest Common Prefix
- LCP Value: It is the number of common continious characters b/w current suffix and previous one (starting at front).

LCP value for `ana` will be number of common continious characters b/w `ana` and `a` which is 1.

LCP value for `a` will be number of common continious characters b/w `a` and nothing(previous) which is 0.

LCP value for `na` will be number of common continious characters b/w `na` and `banana` which is 0.

| Sorted Index | LCP Value | Suffix   |
| -----------  | --------- | -------- |
| 5            | 0         | `a`      |
| 3            | 1         | `ana`    |
| 1            | 3         | `anana`  |
| 0            | 0         | `banana` |
| 4            | 0         | `na`     |
| 2            | 2         | `nana`   |

So, LCP Array will be L = [0,1,3,0,0,2]
LCP Array is an array containing lcp value of two adjacent sorted suffixes.

> Note: We repeat same exercise for string `ABABBAB` and 
> produce the similar table.

### String = `ABABBAB`
| Sorted Index | LCP Value | Suffix    |
|--------------|-----------|-----------|
| 5            | 0         | `ab`      |
| 0            | 2         | `ababbab` |
| 2            | 2         | `abbab`   |
| 6            | 0         | `b`       |
| 4            | 1         | `bab`     |
| 1            | 3         | `babbab`  |
| 3            | 1         | `bbab`    |

## Important

| Sorted Index | LCP Value | Suffix   | SubStrings(index=sortedIndex)     | Duplicates |
|--------------|-----------|----------|----------------------------------:|------------|
| 5            | 0         | `a`      | `a`                               | -          |
| 3            | 1         | `ana`    | a, an, `ana`                      | a          |
| 1            | 3         | `anana`  | a, an, ana, anan, `anana`         | a, an, ana |
| 0            | 0         | `banana` | b, ba, ban, bana, banan, `banana` | -          |
| 4            | 0         | `na`     | n, `na`                           | -          | 
| 2            | 2         | `nana`   | n, na, nan, `nana`                | n, na      |

LCP value indicates the number of duplicates as well, so following insights are useful  
1. Sum of LCP array is the total number of duplicate substrings.  
2. number of unique sub-strings is (total substrings) - (duplicate substrings) 
    i.e Unique SubStrings = n(n+1)/2 - SumOfLCPArray


## Part 2 - Longest common substring
Given `n` number of strings, find a substring which appears in atleast `k` strings and also is the longest, where k is b/w `2` & `n`

Step 1: concatenate all `n` string into a single string with the some join char (called sentinel).


**Example 1**
string1: `apple`
string2: `rat`
string3: `cat`
After concatting, `T` = `apple#rat$cat%`
We choose `#`, `$` and `%` as sentinel, these sentinels can be any char as long they are distinct from each other and smaller (i.e smaller in ASCII char series) than any char in any of the strings.

Now, create the suffix array for `T`

## Suffixes of T
0 - apple#rat$cat%
1 - pple#rat$cat%
2 - ple#rat$cat%
3 - le#rat$cat%
4 - e#rat$cat%
5 - #rat$cat%
6 - rat$cat%
7 - at$cat%
8 - t$cat%
9 - $cat%
10 - cat%
11 - at%
12 - t%
13 - %

## Sorted Suffixes of T
 5 - #rat$cat%
 9 - $cat%
13 - %
 0 - apple#rat$cat%
 7 - at$cat%
11 - at%
10 - cat%
 4 - e#rat$cat%
 3 - le#rat$cat%
 2 - ple#rat$cat%
 1 - pple#rat$cat%
 6 - rat$cat%
 8 - t$cat%
12 - t%

## Suffix and LCP array of T
| Sorted Index | LCP Value | Suffix | Started in word |
|  5 | 0 |  `#rat$cat%` | -
|  9 | 0 |  `$cat%` | -
| 13 | 0 |  `%` | -
|  0 | 0 |  `apple#rat$cat%` | apple
|  7 | 1 |  `at$cat%` | rat
| 11 | 2 |  `at%` | cat
| 10 | 0 |  `cat%` | cat
|  4 | 0 |  `e#rat$cat%` | apple
|  3 | 0 |  `le#rat$cat%` | apple
|  2 | 0 |  `ple#rat$cat%` | apple
|  1 | 1 |  `pple#rat$cat%` | apple
|  6 | 0 |  `rat$cat%` | rat
|  8 | 0 |  `t$cat%` | rat
| 12 | 1 |  `t%` | cat

**Example 2**
string1: `abca`
string2: `bcad`
string3: `daca`
After concatting, T = abca#bcad$daca%
We choose `#`, `$` and `%` as sentinel, these sentinels can be any char as long they are distinct from each other and smaller (i.e smaller in ASCII char series) than any char in any of the strings.

Now, create the suffix array for `T`

## Suffixes of T
 0 - abca#bcad$daca%
 1 - bca#bcad$daca%
 2 - ca#bcad$daca%
 3 - a#bcad$daca%
 4 - #bcad$daca%
 5 - bcad$daca%
 6 - cad$daca%
 7 - ad$daca%
 8 - d$daca%
 9 - $daca%
10 - daca%
11 - aca%
12 - ca%
13 - a%
14 - %

## Sorted Suffixes of T
 4 - #bcad$daca%
 9 - $daca%
14 - %
 3 - a#bcad$daca%
13 - a%
 0 - abca#bcad$daca%
11 - aca%
 7 - ad$daca%
 1 - bca#bcad$daca%
 5 - bcad$daca%
 2 - ca#bcad$daca%
12 - ca%
 6 - cad$daca%
 8 - d$daca%
10 - daca%

## Suffix and LCP Array
| Sorted Index | LCP Value | Suffix | Starts in word |
|---|---|---|--|
|  4 | 0 | `#bcad$daca%` | -
|  9 | 0 | `$daca%` | -
| 14 | 0 | `%` | -
|  3 | 0 | `a#bcad$daca%` | abca(1)
| 13 | 1 | `a%` | daca(3)
|  0 | 1 | `abca#bcad$daca%` | abca(1)
| 11 | 1 | `aca%` | daca(3)
|  7 | 1 | `ad$daca%` | bcad(2)
|  1 | 0 | `bca#bcad$daca%` | abca(1)
|  5 | 3 | `bcad$daca%` | bcad(2)
|  2 | 0 | `ca#bcad$daca%` | abca(1)
| 12 | 2 | `ca%` | daca(3)
|  6 | 2 | `cad$daca%` | bcad(2)
|  8 | 0 | `d$daca%` | bcad(2)
| 10 | 1 | `daca%` | daca(3)

To find a longest substring that appears in k words, we need a lookup window such that it contains atleast k words. if k=2, atleast 2 words must be included in our lookup window. Within a look up window we look for the longest prefix.
So, we will use a sliding window such that it contains `k` distinct words and choose the smallest LCP value in that window, which will give the longest substring in that window.
We move the sliding window down such that it always contains `k` distinct words and again choose the smallest LCP value in that window, which will give the longest substring in that window.
so, now the largest substring among any window will be the final result.
> Note: Ignore first value in a sliding window

## Part 3 - LRS: Longest repeating substring

Consider the string `abracadabra`, find a substring which is repeated and longest.
i.e substring which has duplicates as well as is the longest.
answer is `abra`

Here, the LCP array comes handy, find largest value of a LCP array then the corresponding prefix is LRS

| Sorted Index | LCP Value | Suffix   |
| -----------  | --------- | -------- |
| 10 | 0 | a |
 | 7 | 1 | abra |
 | 0 | 4| abracadabra |
 | 3 | 1 | acadabra |
 | 5 | 1 | adabra |
 | 8 | 0 | bra |
 | 1 | 3 | bracadabra |
 | 4 | 0 | cadabra |
 | 6 | 0 | dabra |
 | 9 | 0 | ra |
 | 2 | 2 | racadabra |

In above example, max lcp value is for suffix `abracadabra` and value is 4. So, LRS will be `abra`.