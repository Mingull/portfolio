/* eslint-disable @next/next/no-img-element */
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import React, { JSX } from "react";
import rehypeSlug from "rehype-slug";
import { highlight } from "sugar-high";
import { remarkCodeMetadata } from "@/lib/remark-code-metadata";
import { CodeBlock } from "./code-block";
import { cn } from "@mingull/ui/lib/utils";

const Code = ({ children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
	const sourceCode = String(children).replace(/\r?\n$/, "");
	const codeHTML = highlight(sourceCode);
	return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} className={cn("bg-muted/70 rounded px-1.5 py-0.5 font-mono text-[0.9em]", props.className)} />;
};

const Pre = ({ children, "data-filename": filename }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> & { "data-filename"?: string }) => {
	const codeElement = React.Children.toArray(children).find((child) => React.isValidElement(child));
	const codeFilename = React.isValidElement(codeElement) ? (codeElement.props as { "data-filename"?: string })["data-filename"] : undefined;

	return <CodeBlock filename={filename ?? codeFilename}>{children}</CodeBlock>;
};

const CustomHeader = (as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
	const headerClassBySize: Record<typeof as, string> = {
		h1: "mt-10 mb-5 text-4xl font-semibold tracking-tight",
		h2: "mt-9 mb-4 text-3xl font-semibold tracking-tight",
		h3: "mt-8 mb-3 text-2xl font-semibold tracking-tight",
		h4: "mt-6 mb-3 text-xl font-semibold tracking-tight",
		h5: "mt-5 mb-2 text-lg font-semibold tracking-tight",
		h6: "mt-4 mb-2 text-base font-semibold tracking-tight",
	};

	return function header({ id, ...rest }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
		const Comp = as;
		const className = cn("group relative scroll-mt-20", headerClassBySize[as], rest.className);

		if (id) {
			return (
				<Comp {...rest} id={id} className={className}>
					<Link href={`#${id}`} className="group inline-flex items-center gap-2 no-underline">
						<span>{rest.children}</span>
						<span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">#</span>
					</Link>
				</Comp>
			);
		}

		return <Comp {...rest} className={className} />;
	};
};

const components = {
	hr: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>) => <hr {...props} className={cn("border-border my-10", props.className)} />,
	p: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
		<p {...props} className={cn("text-foreground/90 my-5 leading-8", props.className)} />
	),
	strong: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
		<strong {...props} className={cn("text-foreground font-semibold", props.className)} />
	),
	em: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => <em {...props} className={cn("italic", props.className)} />,
	a: (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
		const href = props.href ?? "";
		const isInternal = href.startsWith("/") || href.startsWith("#");

		if (isInternal) {
			return (
				<Link
					{...props}
					href={href}
					className={cn("text-primary decoration-primary/40 hover:decoration-primary font-medium underline underline-offset-4", props.className)}
				/>
			);
		}

		return (
			<a
				{...props}
				target="_blank"
				rel="noreferrer"
				className={cn("text-primary decoration-primary/40 hover:decoration-primary font-medium underline underline-offset-4", props.className)}
			/>
		);
	},
	blockquote: (props: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) => (
		<blockquote {...props} className={cn("border-border text-foreground/80 my-6 border-l-4 pl-5 italic", props.className)} />
	),
	ul: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => <ul {...props} className={cn("my-5 list-disc pl-6", props.className)} />,
	ol: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLOListElement>, HTMLOListElement>) => <ol {...props} className={cn("my-5 list-decimal pl-6", props.className)} />,
	li: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>) => <li {...props} className={cn("my-1.5 pl-1", props.className)} />,
	table: (props: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>) => (
		<div className="my-6 overflow-x-auto">
			<table {...props} className={cn("w-full border-collapse text-sm", props.className)} />
		</div>
	),
	thead: (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>) => (
		<thead {...props} className={cn("bg-muted/40", props.className)} />
	),
	th: (props: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) => (
		<th {...props} className={cn("border-border border px-3 py-2 text-left font-semibold", props.className)} />
	),
	td: (props: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) => (
		<td {...props} className={cn("border-border border px-3 py-2 align-top", props.className)} />
	),
	img: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
		<img {...props} className={cn("border-border my-6 rounded-lg border", props.className)} alt={props.alt ?? ""} />
	),
	code: Code,
	pre: Pre,
	h1: CustomHeader("h1"),
	h2: CustomHeader("h2"),
	h3: CustomHeader("h3"),
	h4: CustomHeader("h4"),
	h5: CustomHeader("h5"),
	h6: CustomHeader("h6"),
};

export default function MDXContent(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
			options={{
				mdxOptions: {
					remarkPlugins: [remarkCodeMetadata],
					rehypePlugins: [{ plugins: [rehypeSlug] }],
				},
			}}
		/>
	);
}
