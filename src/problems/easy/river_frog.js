const r = (d) => d > 1 ? r(d - 1) + r(d - 2) : 1;
export const river_frog = (logger, payload) => r(payload.distance || 11);
