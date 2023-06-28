import { logger } from "./lib/logger.js";
import { DATA_STRUCTURES } from "./play/index.js";

type Event = {
	type: string;
	payload: unknown;
};

export const handler = async (event: Event) => {
	const { type, payload } = event;
	try {
		// @ts-ignore
		const func = DATA_STRUCTURES[type];
		if (!func) throw new Error("unknown event.category or event.type key");
		// @ts-ignore
		func(logger, payload);
	} catch (error) {
		logger.error(error, handler.name);
	}
};
