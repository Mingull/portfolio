import { getIcon, Icon } from "@mingull/icons";
import { useEffect, useState } from "react";

export function useAsyncIcon(iconName?: string) {
	const [IconComponent, setIconComponent] = useState<Icon | null>(null);
	const [loading, setLoading] = useState(!!iconName);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let canceled = false;

		if (!iconName) {
			setIconComponent(null);
			setLoading(false);
			return () => {
				canceled = true;
			};
		}

		setLoading(true);
		(async () => {
			try {
				const Icon = await getIcon(iconName);
				if (canceled) {
					return;
				}
				setIconComponent(() => Icon);
				setError(null);
			} catch (err) {
				if (canceled) {
					return;
				}
				setError(err instanceof Error ? err : new Error("Failed to load icon"));
				setIconComponent(null);
			} finally {
				if (!canceled) {
					setLoading(false);
				}
			}
		})();

		return () => {
			canceled = true;
		};
	}, [iconName]);

	return { IconComponent, loading, error };
}
