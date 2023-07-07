import { logger } from "../lib/logger.js";
import { unionFindString } from "../ds/UnionFind/index.js";

const NODES = {
	A: 0,
	B: 1,
	C: 2,
	D: 3,
	E: 4,
	F: 5,
	G: 6,
	H: 7,
	I: 8,
	J: 9,
	K: 10,
	L: 11,
};

const NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export const UNION_FIND = {
	UNION_FIND1: () => {
		try {
			const uf = unionFindString(NAMES);
			uf.union(NODES.C, NODES.D);
			uf.union(NODES.B, NODES.C);
			uf.union(NODES.A, NODES.B);

			// STORED
			uf.union(NODES.C, NODES.K);
			uf.union(NODES.F, NODES.E);
			uf.union(NODES.A, NODES.J);
			uf.union(NODES.A, NODES.B);
			uf.union(NODES.C, NODES.D);
			uf.union(NODES.D, NODES.I);
			uf.union(NODES.L, NODES.F);
			uf.union(NODES.C, NODES.A);
			uf.union(NODES.A, NODES.B);
			uf.union(NODES.H, NODES.G);
			uf.union(NODES.H, NODES.F);
			uf.union(NODES.H, NODES.B);
			// STORED
			// uf.print();
			uf.find(NODES.A);
			uf.find(NODES.B);
			uf.find(NODES.C);
			uf.find(NODES.D);
			uf.find(NODES.E);
			uf.find(NODES.F);
			uf.find(NODES.G);
			uf.find(NODES.H);
			uf.find(NODES.I);
			uf.find(NODES.J);
			uf.find(NODES.K);
			uf.find(NODES.L);
			uf.print("groups");
			uf.print("immediate");
			// logger.debug("::", uf.nodes.map((i) => `${i.data} --> ${NAMES[i.parentIdx]}`).join(", "));
		} catch (error) {
			logger.error(error, "UNION_FIND");
		}
	},
	UNION_FIND: () => {
		try {
			const uf = unionFindString(NAMES);
			uf.union(NODES.C, NODES.D);
			uf.union(NODES.B, NODES.C);
			uf.union(NODES.A, NODES.B);

			// // STORED
			uf.union(NODES.C, NODES.K);
			uf.union(NODES.F, NODES.E);
			uf.union(NODES.A, NODES.J);
			uf.union(NODES.A, NODES.B);
			uf.union(NODES.C, NODES.D);
			// uf.union(NODES.D, NODES.I);
			// uf.union(NODES.L, NODES.F);
			// uf.union(NODES.C, NODES.A);
			// uf.union(NODES.A, NODES.B);
			// uf.union(NODES.H, NODES.G);
			// uf.union(NODES.H, NODES.F);
			// uf.union(NODES.H, NODES.B);
			// STORED
			uf.printGraph("immediate");
		} catch (error) {
			logger.error(error, "UNION_FIND");
		}
	},
};
