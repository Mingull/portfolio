/**
 * Transforms an array of items into an array of options with value and label properties.
 * @param items The array of items to transform into options.
 * @param config The configuration object that specifies how to extract the value and label from each item.
 * @returns An array of options with value and label properties.
 */
export function toOptions<T>(
	items: T[],
	config: {
		value: (item: T) => string;
		label: (item: T) => string;
	},
) {
	return items.map((item) => ({
		value: config.value(item),
		label: config.label(item),
	}));
}
