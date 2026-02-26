import { FormCheckbox } from "@mingull/ui/c/forms/checkbox";
import { FormInput } from "@mingull/ui/c/forms/input";
import { FormSelect } from "@mingull/ui/c/forms/select";
import { FormTextarea } from "@mingull/ui/c/forms/textarea";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldContext,
	fieldComponents: {
		Input: FormInput,
		Textarea: FormTextarea,
		Select: FormSelect,
		Checkbox: FormCheckbox,
	},
	formContext,
	formComponents: {},
});

export { useAppForm, useFieldContext, useFormContext };
