import { useFieldContext } from "@mingull/ui/hooks/forms";
import { Checkbox } from "@mingull/ui/c/checkbox";
import { FormBase, FormControlProps } from "@mingull/ui/c/forms/base";

export function FormCheckbox({ label, description, className }: FormControlProps) {
	const field = useFieldContext<boolean>();

	return (
		<FormBase label={label} description={description} controlFirst horizontal className={className}>
			{(isInvalid) => (
				<Checkbox
					id={field.name}
					name={field.name}
					checked={field.state.value}
					onBlur={field.handleBlur}
					onCheckedChange={(e) => field.handleChange(e === true)}
					aria-invalid={isInvalid}
				/>
			)}
		</FormBase>
	);
}
