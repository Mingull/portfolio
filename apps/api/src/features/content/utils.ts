export type CursorKey = {
	publishedAt: Date;
	id: string;
};

export const encodeCursor = (cursorKey: { publishedAt: Date; id: string }) =>
	Buffer.from(JSON.stringify({ publishedAt: cursorKey.publishedAt.toISOString(), id: cursorKey.id })).toString("base64url");

export const decodeCursor = (cursor?: string): CursorKey | undefined => {
	if (!cursor) {
		return undefined;
	}

	try {
		const parsed = JSON.parse(Buffer.from(cursor, "base64url").toString("utf-8")) as { publishedAt?: string; id?: string };
		if (!parsed.publishedAt || !parsed.id) {
			return undefined;
		}

		const publishedAt = new Date(parsed.publishedAt);
		if (Number.isNaN(publishedAt.getTime())) {
			return undefined;
		}

		return {
			publishedAt,
			id: parsed.id,
		};
	} catch {
		return undefined;
	}
};
