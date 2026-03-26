import { getIcon, Icon } from "@mingull/icons";
import { useEffect, useState } from "react";

export function useAsyncIcon(iconName?: string) {
	const [IconComponent, setIconComponent] = useState<Icon | null>(null);
	const [loading, setLoading] = useState(!!iconName);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!iconName) {
			setIconComponent(null);
			setLoading(false);
			return;
		}

		setLoading(true);
		(async () => {
			try {
				const Icon = await getIcon(iconName);
				setIconComponent(() => Icon);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Failed to load icon"));
				setIconComponent(null);
			} finally {
				setLoading(false);
			}
		})();
	}, [iconName]);

	return { IconComponent, loading, error };
}
