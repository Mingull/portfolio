/**
 * A factory function that creates a service instance.
 *
 * Factories receive a dependency object (resolved lazily) and return the created service.
 * @typeParam TDeps - The dependency object the factory can read from.
 * @typeParam TResult - The created service type.
 */
export type Factory<TDeps, TResult> = (deps: TDeps) => TResult;

/**
 * Convenience alias for "some object with string keys".
 *
 * We use `unknown` (not `any`) so we never accidentally treat stored values as a specific type
 * without an explicit cast at the boundary.
 */
type AnyRecord = Record<string, unknown>;

/**
 * A typed dependency injector.
 *
 * - Services can be accessed either by property (`injector.logger`) or by name (`injector.get("logger")`).
 * - Services are singletons (created once per root injector, then cached).
 * - `scope()` creates a child injector that overlays explicit overrides on top of the root injector.
 *   Any service not present in the scope's overrides is resolved lazily from the root injector.
 *
 * @typeParam TServices - The service registry type (string keys -> service values).
 */
export type Injector<TServices extends AnyRecord> = {
	/**
	 * Get a service by its registered name (type-safe via the `TServices` registry).
	 *
	 * @throws Error if the service is not registered.
	 */
	get<K extends Extract<keyof TServices, string>>(name: K): TServices[K];

	/**
	 * Create a child injector with additional "scoped" dependencies.
	 *
	 * Values provided here override existing services with the same key for this scoped injector only.
	 * Key presence wins: an override of `undefined` is still considered present and will NOT fall back
	 * to root resolution.
	 * Scopes can be chained/merged: `injector.scope(a).scope(b)`.
	 *
	 * Any service not overridden in the scope is resolved lazily from the root injector (factory +
	 * singleton caching still apply).
	 */
	scope<TScope extends AnyRecord>(scopeDeps: TScope): Injector<TServices & TScope>;
} & {
	/**
	 * Property access style: `injector.db`, `injector.config`, etc.
	 *
	 * Property reads resolve through `get()` and therefore remain lazy.
	 */
	[K in keyof TServices]: TServices[K];
};

/**
 * A fluent, Koin-like API:
 *
 * - `register()` defines a singleton factory
 * - `get()` / property access lazily resolves and caches singletons
 * - no "finalize/build/done" step required
 */
export type FluentInjector<TServices extends AnyRecord> = Injector<TServices> & {
	/**
	 * Register a singleton service factory.
	 *
	 * Important: registration does NOT instantiate the service.
	 * The service is instantiated on first access via `get()` or property access.
	 *
	 * @param name - Service name (becomes a typed key on the injector).
	 * @param factory - Function that creates the service.
	 */
	register<K extends string, TResult>(name: K, factory: Factory<TServices, TResult>): FluentInjector<TServices & Record<K, TResult>>;
	/**
	 * Register a singleton service factory.
	 *
	 * Important: registration does NOT instantiate the service.
	 * The service is instantiated on first access via `get()` or property access.
	 *
	 * @param name - Service name (becomes a typed key on the injector).
	 * @param factory - Function that creates the service.
	 */
	singleton<K extends string, TResult>(name: K, factory: Factory<TServices, TResult>): FluentInjector<TServices & Record<K, TResult>>;
};

/**
 * String property keys that must never be resolved as service names in Proxy `get` traps.
 *
 * - `"then"` prevents accidental thenable-assimilation in Promise chains.
 * - `"toString"`, `"valueOf"`, `"inspect"`, `"constructor"`, `"__proto__"` prevent surprising
 *   resolution attempts for common meta/introspection properties.
 */
const RESERVED_PROPS = new Set(["then", "toString", "valueOf", "inspect", "constructor", "__proto__"]);

/**
 * Create a fluent injector/container.
 *
 * Typical usage (Koin-like):
 * ```ts
 * const di = createInjector()
 *   .register("config", () => ({ url: "..." }))
 *   .register("db", ({ config }) => makeDb(config.url));
 *
 * const db = di.db; // lazy
 * ```
 *
 * Design notes:
 * - Uses `Proxy` so you can access services as properties (`di.db`).
 * - Internally stores factories/instances in Maps keyed by string.
 * - Maps store `unknown`; types are enforced at the API boundary.
 */
export function createInjector(): FluentInjector<AnyRecord> {
	/**
	 * Runtime factory registry.
	 *
	 * Each service factory has its own return type, but a Map keyed by string can't express that,
	 * so we store factories as unknown-typed and cast back at lookup.
	 */
	const factories = new Map<string, Factory<unknown, unknown>>();

	/**
	 * Runtime singleton instance cache for the *root* injector.
	 *
	 * Once a service is created, it is cached here and reused.
	 */
	const instances = new Map<string, unknown>();

	/**
	 * Shared circular-dependency tracking for ALL fluent views produced by this root injector.
	 *
	 * Hoisted outside `makeFluent()` so that every view's `get()` operates on the same state,
	 * preventing cycles from slipping through when multiple fluent views exist.
	 */
	const resolving = new Set<string>();
	const resolvingStack: string[] = [];

	/**
	 * Create a fluent injector "view" with a particular compile-time registry type.
	 *
	 * Implementation detail: at runtime, all fluent views share the same underlying `factories`,
	 * `instances`, `resolving`, and `resolvingStack`. Each `register()` call returns a new view
	 * with a widened type.
	 */
	function makeFluent<TServices extends AnyRecord>(): FluentInjector<TServices> {
		/**
		 * Resolve a root singleton.
		 *
		 * - If already created: return from cache.
		 * - Else: find factory, create instance, cache, return.
		 */
		function get<K extends Extract<keyof TServices, string>>(name: K): TServices[K] {
			// Detect circular dependencies between services, e.g. A -> B -> A.
			if (resolving.has(name)) {
				const idx = resolvingStack.indexOf(name);
				const cyclePath = idx >= 0 ? resolvingStack.slice(idx).concat(name) : resolvingStack.concat(name);
				throw new Error(`Circular dependency detected: ${cyclePath.join(" -> ")}`);
			}

			resolving.add(name);
			resolvingStack.push(name);

			try {
				// Map.get() returns undefined for missing keys, but service values might also be undefined,
				// so we must also check `.has()`.
				const cached = instances.get(name);
				if (cached !== undefined || instances.has(name)) return cached as TServices[K];

				const factory = factories.get(name) as Factory<TServices, TServices[K]> | undefined;
				if (!factory) throw new Error(`Service "${name}" not registered`);

				/**
				 * Dependency proxy passed into factories.
				 *
				 * This allows factories to do `deps.logger` / `deps.db` property access without eagerly
				 * creating everything.
				 *
				 * Any property read triggers `get()` which lazily builds dependencies.
				 */
				const depsProxy = new Proxy<object>(
					{},
					{
						get(_t, prop: PropertyKey) {
							if (typeof prop !== "string") return undefined;
							return get(prop as Extract<keyof TServices, string>);
						},
					},
				) as TServices;

				const instance = factory(depsProxy);
				instances.set(name, instance as unknown);
				return instance;
			} finally {
				resolving.delete(name);
				resolvingStack.pop();
			}
		}

		/**
		 * Build a scoped injector that overlays explicit `overrides` on top of root resolution.
		 *
		 * Resolution order for any key `k`:
		 *   1. If `k` is present in `overrides` (even as `undefined`) → return that value directly.
		 *   2. Otherwise → delegate to the root `get(k)` (lazy factory + singleton caching).
		 *
		 * Chained scopes (`injector.scope(a).scope(b)`) are supported: each `.scope()` call merges
		 * new overrides on top of the accumulated override map from the parent scope.
		 */
		function makeScopedInjector<TAll extends AnyRecord>(overrides: Map<string, unknown>): Injector<TAll> {
			function scopedGet<K extends Extract<keyof TAll, string>>(name: K): TAll[K] {
				// Key-presence wins: an override of `undefined` is still considered present.
				if (overrides.has(name)) return overrides.get(name) as TAll[K];
				// Fall back to root lazy resolution for services not overridden in this scope.
				return get(name as Extract<keyof TServices, string>) as unknown as TAll[K];
			}

			function scopedScope<TScope extends AnyRecord>(scopeDeps: TScope): Injector<TAll & TScope> {
				// Merge new overrides on top of the current scope's overrides (chained scopes).
				const next = new Map<string, unknown>(overrides);
				for (const [k, v] of Object.entries(scopeDeps)) next.set(k, v);
				return makeScopedInjector<TAll & TScope>(next);
			}

			return new Proxy<object>(
				{},
				{
					get(_t, prop: PropertyKey) {
						if (prop === "get") return scopedGet;
						if (prop === "scope") return scopedScope;
						if (typeof prop !== "string" || RESERVED_PROPS.has(prop)) return undefined;
						return scopedGet(prop as Extract<keyof TAll, string>);
					},
				},
			) as Injector<TAll>;
		}

		/**
		 * Create a scoped child injector by recording `scopeDeps` as overrides.
		 *
		 * The scoped injector resolves overridden keys directly from `scopeDeps` and falls back
		 * to root lazy resolution for everything else. Scopes do NOT snapshot root instances.
		 */
		function scope<TScope extends AnyRecord>(scopeDeps: TScope): Injector<TServices & TScope> {
			const overrides = new Map<string, unknown>(Object.entries(scopeDeps));
			return makeScopedInjector<TServices & TScope>(overrides);
		}

		/**
		 * Register a singleton factory and return a new fluent view whose type includes the new service.
		 *
		 * Note: the returned object is still lazy; nothing is instantiated here.
		 */
		function register<K extends string, TResult>(name: K, factory: Factory<TServices, TResult>): FluentInjector<TServices & Record<K, TResult>> {
			factories.set(name, factory as Factory<unknown, unknown>);

			// Return a new view with widened types; runtime storage is shared.
			return makeFluent() as FluentInjector<TServices & Record<K, TResult>>;
		}

		/**
		 * Proxy provides:
		 * - `injector.get`
		 * - `injector.scope`
		 * - `injector.register`
		 * - property access (e.g. `injector.db`) -> routes to `get("db")`
		 */
		return new Proxy<object>(
			{},
			{
				get(_t, prop: PropertyKey) {
					if (prop === "get") return get;
					if (prop === "scope") return scope;
					if (prop === "register" || prop === "singleton") return register;

					if (typeof prop !== "string" || RESERVED_PROPS.has(prop)) return undefined;
					return get(prop as Extract<keyof TServices, string>);
				},
			},
		) as FluentInjector<TServices>;
	}

	return makeFluent();
}
