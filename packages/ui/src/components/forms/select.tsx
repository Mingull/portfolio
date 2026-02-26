import { useFieldContext } from "@mingull/ui/hooks/forms";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@mingull/ui/c/select";
import { FormBase, FormControlProps } from "@mingull/ui/c/forms/base";

export function FormSelect({ children, ...props }: FormControlProps & { children: React.ReactNode }) {
	const field = useFieldContext<string>();

	return (
		<FormBase {...props}>
			{(isInvalid) => (
				<Select onValueChange={(e) => field.handleChange(e)} value={field.state.value}>
					<SelectTrigger aria-invalid={isInvalid} id={field.name} onBlur={field.handleBlur}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>{children}</SelectContent>
				</Select>
			)}
		</FormBase>
	);
}
